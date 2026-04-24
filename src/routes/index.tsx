import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChefHat, Heart, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-feast.jpg";
import spicesBg from "@/assets/spices-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anjee's Kitchen — Pakistani home cooking, Bradford" },
      {
        name: "description",
        content:
          "Handmade Pakistani food from Bradford. Frozen parathas, kebabs, samosas, chutneys, spice blends and celebration cakes — collection or Saturday delivery across Yorkshire.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Pakistani feast on a wooden table"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-spice-clove/40 via-spice-clove/55 to-spice-clove/85" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 md:py-40 text-paper">
          <div className="max-w-2xl animate-float-up">
            <span className="font-script text-2xl text-accent">
              From Bradford, with love —
            </span>
            <h1 className="mt-3 font-display text-5xl md:text-7xl font-semibold leading-[1.05] text-balance">
              Pakistani home cooking,
              <span className="block italic text-accent">unhurried.</span>
            </h1>
            <p className="mt-6 text-lg text-paper/85 max-w-xl leading-relaxed">
              Slow-cooked curries, handmade parathas, homemade chutneys and celebration cakes — made fresh in Bradford with free-range eggs, fresh vegetables, and desi ghee. Order for collection or Saturday delivery across Yorkshire and beyond.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/order"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-warm hover:bg-primary/90 transition-warm"
              >
                See Our Kitchen <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/order"
                className="inline-flex items-center gap-2 rounded-full bg-paper/10 backdrop-blur border border-paper/30 px-6 py-3 text-sm font-medium text-paper hover:bg-paper/20 transition-warm"
              >
                Order via WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-8">
          {[
            { icon: ChefHat, title: "Made with proper ingredients", body: "Free-range eggs, fresh vegetables, desi ghee and butter. No frozen packs, no shortcuts. Every product made fresh to order." },
            { icon: Heart, title: "A family labour of love", body: "Three generations of cooking behind every dish. Recipes passed down from Anjee's kitchen in Punjab, made with the care you'd give your own family." },
            { icon: Sparkles, title: "Halal. Always.", body: "Every product is 100% halal. We use halal-certified meat and take allergen information seriously — just ask when you order." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-xl">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KHANA KHAZANA TEASER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl overflow-hidden bg-gradient-warm p-10 md:p-16 text-primary-foreground shadow-warm">
          <div className="max-w-3xl">
            <span className="font-script text-2xl text-paper/90">Something exciting is coming —</span>
            <h2 className="font-display text-4xl md:text-5xl mt-2">
              Khana Khazana
              <span className="block italic text-accent">Your free recipe vault.</span>
            </h2>
            <p className="mt-5 text-paper/85 leading-relaxed max-w-2xl">
              Tired of losing recipes in screenshots and browser tabs? Khana Khazana is a free tool — hosted by Anjee's Kitchen — where you can save, organise and plan recipes from anywhere on the web. Import from any website, build meal plans, create shopping lists. Free for everyone, forever.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center rounded-full bg-paper/15 backdrop-blur border border-paper/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-paper">
                Coming Soon
              </span>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-paper text-spice-clove px-6 py-3 text-sm font-medium hover:scale-[1.02] transition-warm shadow-soft"
              >
                Join the waitlist <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-5 text-sm text-paper/70">
              Already sharing their recipes: Anjee (Shahnaz Perveen), Saira Faryal & Aysha Shahab
            </p>
          </div>
        </div>
      </section>

      {/* SPICE BANNER QUOTE */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={spicesBg} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-spice-clove/85" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 text-center text-paper">
          <span className="font-script text-3xl text-accent">A note from Anjee</span>
          <blockquote className="mt-4 font-display text-2xl md:text-4xl leading-snug text-balance">
            "Pakistani food isn't complicated — it's patient. You give it time, the right spices, and it gives you back something you'll never forget."
          </blockquote>
        </div>
      </section>

      {/* ORDER CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl overflow-hidden bg-gradient-warm p-10 md:p-16 text-primary-foreground shadow-warm grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="font-script text-2xl text-paper/90">Fresh from our kitchen —</span>
            <h3 className="font-display text-4xl md:text-5xl mt-2">
              Home-cooked food,
              <br /> made to order.
            </h3>
            <p className="mt-4 text-paper/85 max-w-md leading-relaxed">
              Handmade frozen parathas, kebabs, samosas and more — made with desi ghee and fresh ingredients. Collect from Bradford or get Saturday delivery across Yorkshire and beyond.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link
              to="/order"
              className="inline-flex items-center gap-2 rounded-full bg-paper text-spice-clove px-7 py-4 text-base font-medium shadow-warm hover:scale-[1.02] transition-warm"
            >
              See Our Kitchen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
