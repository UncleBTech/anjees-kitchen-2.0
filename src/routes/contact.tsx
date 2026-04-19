import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Anjee's Kitchen" },
      { name: "description", content: "Get in touch with Anjee's Kitchen for recipe questions, collaborations or meal orders." },
      { property: "og:title", content: "Contact — Anjee's Kitchen" },
      { property: "og:description", content: "Send us a note." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16">
      <div>
        <span className="font-script text-3xl text-primary">Say hi —</span>
        <h1 className="font-display text-5xl md:text-6xl mt-2 text-balance">Let's talk food.</h1>
        <p className="mt-6 text-lg text-foreground/80 leading-relaxed max-w-md">
          Recipe question? Collaboration? Want to be added to the weekly tiffin
          list? Drop a message — we read every one.
        </p>

        <div className="mt-10 space-y-5">
          <ContactItem icon={Mail} label="Email" value="hello@anjeeskitchen.com" />
          <ContactItem icon={MessageCircle} label="WhatsApp" value="+92 300 0000000" />
          <ContactItem icon={MapPin} label="Based in" value="Karachi, Pakistan" />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="rounded-3xl bg-card shadow-card-warm border border-border/60 p-8 space-y-5"
      >
        <Field label="Your name" id="name" type="text" placeholder="Ayesha Khan" />
        <Field label="Email" id="email" type="email" placeholder="you@example.com" />
        <div>
          <label htmlFor="msg" className="block text-sm font-medium mb-1.5">Message</label>
          <textarea
            id="msg"
            rows={5}
            placeholder="Tell us what's on your mind…"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-primary text-primary-foreground py-3 font-medium hover:bg-primary/90 transition-warm shadow-soft"
        >
          {sent ? "Message sent — thank you!" : "Send message"}
        </button>
      </form>
    </section>
  );
}

function Field({ label, id, type, placeholder }: { label: string; id: string; type: string; placeholder: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

function ContactItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-display text-lg">{value}</div>
      </div>
    </div>
  );
}
