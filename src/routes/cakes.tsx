import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/cakes")({
  head: () => ({
    meta: [
      { title: "Celebration Cakes & Bakes — Anjee's Kitchen" },
      { name: "description", content: "Made-to-order celebration cakes baked in Bradford by Saira Faryal. Matilda chocolate cake, date pudding, coffee cake, brownies and more." },
      { property: "og:title", content: "Cakes — Anjee's Kitchen" },
      { property: "og:description", content: "Made-to-order celebration cakes from Bradford." },
    ],
  }),
  component: CakesPage,
});

const WHATSAPP_NUMBER = "447000000000";

type Cake = {
  id: string;
  name: string;
  price: string;
  desc: string;
  serves?: string;
};

const wholeCakes: Cake[] = [
  { id: "matilda", name: "Matilda Chocolate Cake", price: "£45", serves: "8-inch · serves 10–12", desc: "Rich, indulgent chocolate cake inspired by the famous Roald Dahl classic. Dense, dark and deeply chocolatey." },
  { id: "date-pudding", name: "Date Pudding Cake", price: "£42", serves: "8-inch · serves 10–12", desc: "A twist on sticky toffee pudding. Warm, caramel-sweet and beautifully moist." },
  { id: "coffee", name: "Coffee Cake", price: "£38", serves: "8-inch · serves 10–12", desc: "Light sponge with coffee buttercream. A classic done properly." },
  { id: "vanilla", name: "Vanilla Cake", price: "£35", serves: "8-inch · serves 10–12", desc: "Simple, elegant and crowd-pleasing. Can be customised with a message." },
];

const bakes: Cake[] = [
  { id: "brownies", name: "Brownies", price: "£18", serves: "Tray of 12 · ready in 2–3 days", desc: "Fudgy, rich and made with real chocolate." },
];

function CakeCard({ c }: { c: Cake }) {
  return (
    <article className="rounded-2xl bg-card shadow-card-warm border border-border/60 p-6 flex flex-col">
      <h3 className="font-display text-xl">{c.name}</h3>
      {c.serves && <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{c.serves}</p>}
      <p className="mt-3 text-sm text-foreground/75 leading-relaxed flex-1">{c.desc}</p>
      <div className="mt-5 pt-4 border-t border-border/60">
        <span className="font-display text-lg text-primary">{c.price}</span>
      </div>
    </article>
  );
}

function CakesPage() {
  const order = () => {
    const text = "Hi Anjee's Kitchen — I'd like to order a cake. Could you let me know what's available?";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <section className="bg-gradient-paper border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <span className="font-script text-3xl text-primary">Made to order —</span>
          <h1 className="font-display text-5xl md:text-6xl mt-2 text-balance">Celebration Cakes &amp; Bakes</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every cake is baked by Saira Faryal using free-range eggs, real butter and quality ingredients. All cakes are made to order — please allow at least 7 days' notice. Available for collection from Bradford or Saturday delivery.
          </p>

          <div className="mt-8 mx-auto max-w-3xl rounded-2xl bg-accent/15 border border-accent/40 px-5 py-4 text-left flex items-start gap-3">
            <AlertCircle className="h-5 w-5 mt-0.5 text-accent shrink-0" />
            <p className="text-sm text-foreground/85 leading-relaxed">
              <span className="font-medium text-foreground">Minimum 7 days' notice required for all cake orders.</span> Please get in touch before placing your order to check availability.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div>
          <div className="mb-8">
            <span className="font-script text-2xl text-primary">Whole cakes —</span>
            <h2 className="font-display text-3xl md:text-4xl mt-1">8-inch, serves 10–12</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wholeCakes.map((c) => <CakeCard key={c.id} c={c} />)}
          </div>
        </div>

        <div>
          <div className="mb-8">
            <span className="font-script text-2xl text-primary">Bakes —</span>
            <h2 className="font-display text-3xl md:text-4xl mt-1">No minimum notice</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bakes.map((c) => <CakeCard key={c.id} c={c} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-warm p-10 text-primary-foreground text-center shadow-warm">
          <button
            onClick={order}
            className="inline-flex items-center gap-2 rounded-full bg-paper text-spice-clove px-7 py-4 text-base font-medium shadow-soft hover:scale-[1.02] transition-warm"
          >
            <MessageCircle className="h-4 w-4" /> Order via WhatsApp
          </button>
          <p className="mt-4 text-sm text-paper/85 max-w-md mx-auto">
            Tell us which cake you'd like, your preferred collection or delivery date, and any personalisation. We'll get back to you to confirm.
          </p>
        </div>
      </section>
    </>
  );
}
