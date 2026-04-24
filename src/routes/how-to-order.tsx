import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Truck, Package, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/how-to-order")({
  head: () => ({
    meta: [
      { title: "How to Order — Anjee's Kitchen" },
      { name: "description", content: "How to order from Anjee's Kitchen — collection from Bradford, Saturday delivery across Yorkshire, or posted UK-wide. Lead times and delivery info." },
      { property: "og:title", content: "How to Order — Anjee's Kitchen" },
      { property: "og:description", content: "Collection, Saturday delivery and UK-wide post." },
    ],
  }),
  component: HowToOrderPage,
});

const WHATSAPP_NUMBER = "447000000000";

const routes = [
  {
    icon: MapPin,
    title: "Collection",
    body: "Place your order via WhatsApp and we'll let you know when it's ready. Our address in Bradford is provided once your order is confirmed. Allow 2–3 days for most items, and at least 7 days for cakes.",
  },
  {
    icon: Truck,
    title: "Saturday Delivery",
    body: "We deliver every Saturday across the following areas: Bradford, Leeds, Halifax, Wakefield, Huddersfield, Oldham, Rochdale, Manchester and Wolverhampton. Orders must be placed by Thursday midnight. £3 delivery on orders under £50, free on orders over £50. Frozen items and cakes only — spices and chutneys can be posted.",
  },
  {
    icon: Package,
    title: "Post (UK-wide)",
    body: "Spice blends and chutneys can be posted anywhere in the UK via Royal Mail. Standard delivery 2–4 working days after dispatch. Postage included in the product price. Frozen items cannot be posted.",
  },
];

const leadTimes = [
  ["Frozen parathas", "2–3 days"],
  ["Frozen snacks (samosa, kebab, etc.)", "2–3 days"],
  ["Chutneys & spice blends", "2–3 days"],
  ["Cakes (all whole cakes)", "Minimum 7 days"],
  ["Brownies", "2–3 days"],
];

function HowToOrderPage() {
  const start = () => {
    const text = "Hi Anjee's Kitchen — I'd like to place an order. Could you help me?";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <section className="bg-gradient-paper border-b border-border/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <span className="font-script text-3xl text-primary">Simple and straightforward —</span>
          <h1 className="font-display text-5xl md:text-6xl mt-2 text-balance">How to Order</h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            All orders are placed via WhatsApp. We'll confirm your order, let you know when it's ready, and arrange collection or delivery. Here's everything you need to know.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {routes.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-2xl bg-card shadow-card-warm border border-border/60 p-7 flex flex-col">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-2xl">{title}</h2>
              <p className="mt-3 text-foreground/75 leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-8">
          <span className="font-script text-2xl text-primary">Plan ahead —</span>
          <h2 className="font-display text-3xl md:text-4xl mt-1">Lead times</h2>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-soft">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-secondary/60">
                <th className="px-5 py-3 text-sm font-display font-medium">Product</th>
                <th className="px-5 py-3 text-sm font-display font-medium">Lead time</th>
              </tr>
            </thead>
            <tbody>
              {leadTimes.map(([product, time]) => (
                <tr key={product} className="border-t border-border/60">
                  <td className="px-5 py-3 text-sm text-foreground/85">{product}</td>
                  <td className="px-5 py-3 text-sm text-foreground/85 font-medium">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-warm p-10 text-primary-foreground text-center shadow-warm">
          <button
            onClick={start}
            className="inline-flex items-center gap-2 rounded-full bg-paper text-spice-clove px-7 py-4 text-base font-medium shadow-soft hover:scale-[1.02] transition-warm"
          >
            <MessageCircle className="h-4 w-4" /> Start your order on WhatsApp
          </button>
          <p className="mt-4 text-sm text-paper/85 max-w-md mx-auto">
            Not sure what you need? Just send us a message and we'll help.
          </p>
        </div>
      </section>
    </>
  );
}
