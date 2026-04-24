import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/khana-khazana")({
  head: () => ({
    meta: [
      { title: "Khana Khazana — Your free recipe vault" },
      { name: "description", content: "Khana Khazana is a free recipe management tool hosted by Anjee's Kitchen. Save, organise and plan recipes from anywhere on the web. Coming soon." },
      { property: "og:title", content: "Khana Khazana — Coming Soon" },
      { property: "og:description", content: "A free recipe vault, hosted by Anjee's Kitchen." },
    ],
  }),
  component: KhanaKhazanaPage,
});

const features = [
  { icon: "📥", label: "Import from any website" },
  { icon: "📅", label: "Weekly meal planner" },
  { icon: "🛒", label: "Smart shopping lists" },
  { icon: "👨‍👩‍👧", label: "Share with family" },
  { icon: "🔒", label: "Your recipes, private by default" },
  { icon: "✨", label: "Free, forever" },
];

function KhanaKhazanaPage() {
  return (
    <>
      <section className="bg-gradient-paper border-b border-border/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <span className="font-script text-3xl text-primary">Coming soon —</span>
          <h1 className="font-display text-5xl md:text-7xl mt-2 text-balance">Khana Khazana</h1>
          <p className="mt-4 font-display text-2xl md:text-3xl text-foreground/70 italic">
            Your free recipe vault, hosted by Anjee's Kitchen
          </p>
          <p className="mt-8 text-lg text-foreground/80 leading-relaxed">
            We all have recipes scattered across screenshots, bookmarks, WhatsApp messages and torn-out magazine pages. Khana Khazana is a free tool where you can save, organise and plan recipes from anywhere on the web. Import from any website in one click. Build weekly meal plans. Create shopping lists. Share recipes with family. It's free, it's yours, and it's coming very soon.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.label} className="rounded-2xl bg-card border border-border/60 shadow-soft p-6 text-center">
              <div className="text-3xl">{f.icon}</div>
              <p className="mt-3 font-medium text-foreground/85">{f.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 text-base font-medium shadow-warm hover:bg-primary/90 transition-warm"
        >
          Join the waitlist <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-5 text-sm text-muted-foreground">
          Already sharing their recipes when we launch: Anjee (Shahnaz Perveen), Saira Faryal &amp; Aysha Shahab
        </p>
      </section>

      <div className="pb-12 text-center">
        <span className="text-xs uppercase tracking-wider text-muted-foreground/70">
          Powered by Mealie
        </span>
      </div>
    </>
  );
}
