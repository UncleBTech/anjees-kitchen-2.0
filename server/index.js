import express from "express";
import { z } from "zod";
import nodemailer from "nodemailer";

const PORT = parseInt(process.env.PORT || "8080", 10);
const SMTP_HOST = process.env.SMTP_HOST || "email-smtp.eu-west-2.amazonaws.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_SECURE = (process.env.SMTP_SECURE || "false").toLowerCase() === "true";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.SES_FROM_EMAIL || "noreply@armajoiners.com";
const TO_EMAIL = process.env.SES_TO_EMAIL || "armajoiners@gmail.com";

if (!SMTP_USER || !SMTP_PASS) {
  console.warn("[contact-server] SMTP credentials are not set. Email sends will fail.");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE, // true for 465, false for 587 (STARTTLS)
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
});

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
});

const app = express();
app.use(express.json({ limit: "32kb" }));

// Trust proxy so we can rate limit behind nginx
app.set("trust proxy", true);

// Very small in-memory rate limit: 5 requests / 10 min / IP
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_HITS;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

app.get("/healthz", (_req, res) => res.status(200).send("ok"));

app.post("/api/contact", async (req, res) => {
  const ip = req.ip || "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten().fieldErrors });
  }
  const { name, email, phone, message } = parsed.data;

  const subject = `New contact form submission — ${name}`;
  const text = `New contact form submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "(not provided)"}\n\nMessage:\n${message}\n`;
  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "(not provided)")}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text,
      html,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[contact-server] SMTP send failed:", err);
    return res.status(502).json({ error: "Failed to send message. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`[contact-server] listening on :${PORT}`);
});
