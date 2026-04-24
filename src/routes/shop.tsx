import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "The Pantry — Anjee's Kitchen" },
      { name: "description", content: "Homemade chutneys and spice blends from Anjee's Kitchen. Mango & ginger, plum and imli chutneys, garam masala and chaat masala — posted UK-wide." },
      { property: "og:title", content: "The Pantry — Anjee's Kitchen" },
      { property: "og:description", content: "Homemade chutneys and spice blends, posted across the UK." },
    ],
  }),
  component: ShopPage,
});

const WHATSAPP_NUMBER = "447000000000";

type Product = {
  id: string;
  name: string;
  size: string;
  price: string;
  desc: string;
  badge?: string;
};

const chutneys: Product[] = [
  { id: "mango-ginger", name: "Mango & Ginger Chutney", size: "200g jar", price: "£5.50", desc: "Anjee's own recipe. Sweet, tangy and warming with fresh ginger." },
  { id: "plum", name: "Plum Chutney", size: "200g jar", price: "£5.50", desc: "Deep, rich and lightly spiced. Made with fresh plums." },
  { id: "imli", name: "Imli Chutney", size: "200g jar", price: "£5.00", desc: "Classic tamarind chutney — the one that goes with everything." },
  { id: "trio", name: "Chutney Trio Gift Set", size: "3 × 200g", price: "£14.00", desc: "One of each chutney. Perfect as a gift or to stock your pantry.", badge: "Best Value" },
];

const spices: Product[] = [
  { id: "garam-masala", name: "Anjee's Garam Masala", size: "80g pouch", price: "£4.50", desc: "Shahnaz Perveen's own blend, ground fresh. A family recipe from Punjab." },
  { id: "chaat-masala", name: "Chaat Masala", size: "80g pouch", price: "£4.50", desc: "Tangy, punchy and unmistakably desi. Shake it on everything." },
  { id: "spice-duo", name: "Spice Duo", size: "2 × 80g", price: "£8.00", desc: "Both blends together. Save £1.", badge: "Save £1" },
  { id: "kitchen-bundle", name: "Kitchen Starter Bundle", size: "2 spice blends + 1 chutney of choice", price: "£13.00", desc: "Everything you need to cook like Anjee.", badge: "Gift Ready" },
];

function ProductCard({ p }: { p: Product }) {
  return (
    <article className="rounded-2xl bg-card shadow-card-warm border border-border/60 p-6 flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl">{p.name}</h3>
        {p.badge && (
          <span className="rounded-full bg-accent/15 text-accent text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 whitespace-nowrap">
            {p.badge}
          </span>
        )}
      </div>
      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{p.size}</p>
      <p className="mt-3 text-sm text-foreground/75 leading-relaxed flex-1">{p.desc}</p>
      <div className="mt-5 pt-4 border-t border-border/60">
        <span className="font-display text-lg text-primary">{p.price}</span>
      </div>
    </article>
  );
}

function ShopPage() {
  const enquire = () => {
    const text = "Hi Anjee's Kitchen — I'd like to order from The Pantry. Could you confirm availability and postage?";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <section className="bg-gradient-paper border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <span className="font-script text-3xl text-primary">From Anjee's kitchen —</span>
          <h1 className="font-display text-5xl md:text-6xl mt-2 text-balance">The Pantry</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Homemade chutneys and spice blends made in small batches. Available for collection from Bradford, Saturday delivery, or posted anywhere in the UK. Made with fresh ingredients and no artificial preservatives.
          </p>

          <div className="mt-8 mx-auto max-w-3xl rounded-2xl bg-card border border-border/60 shadow-soft px-5 py-4 text-left flex items-start gap-3">
            <Mail className="h-5 w-5 mt-0.5 text-primary shrink-0" />
            <p className="text-sm text-foreground/80 leading-relaxed">
              <span className="font-medium text-foreground">Posted UK-wide.</span> Spices and chutneys can be posted anywhere in the UK via Royal Mail. Frozen items are collection or Saturday delivery only.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div>
          <div className="flex items-end justify-between flex-wrap gap-2 mb-8">
            <div>
              <span className="font-script text-2xl text-primary">Small batch —</span>
              <h2 className="font-display text-3xl md:text-4xl mt-1">Chutneys</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {chutneys.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between flex-wrap gap-2 mb-8">
            <div>
              <span className="font-script text-2xl text-primary">Ground fresh —</span>
              <h2 className="font-display text-3xl md:text-4xl mt-1">Spice Blends</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {spices.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-warm p-10 text-primary-foreground text-center shadow-warm">
          <button
            onClick={enquire}
            className="inline-flex items-center gap-2 rounded-full bg-paper text-spice-clove px-7 py-4 text-base font-medium shadow-soft hover:scale-[1.02] transition-warm"
          >
            <MessageCircle className="h-4 w-4" /> Order via WhatsApp
          </button>
          <p className="mt-4 text-sm text-paper/85 max-w-md mx-auto">
            Tell us what you'd like and we'll confirm availability, postage cost and payment.
          </p>
        </div>
      </section>
    </>
  );
}
