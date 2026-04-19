import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChefHat, Heart, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-feast.jpg";
import spicesBg from "@/assets/spices-bg.jpg";
import { recipes } from "@/lib/recipes";
import { RecipeCard } from "@/components/RecipeCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anjee's Kitchen — Pakistani home cooking" },
      {
        name: "description",
        content:
          "Authentic Pakistani recipes from a home kitchen. Cook biryani, nihari, karahi and kebabs — or order home-style meals via WhatsApp.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = recipes.slice(0, 3);

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
              From Karachi, with love —
            </span>
            <h1 className="mt-3 font-display text-5xl md:text-7xl font-semibold leading-[1.05] text-balance">
              Pakistani home cooking,
              <span className="block italic text-accent">unhurried.</span>
            </h1>
            <p className="mt-6 text-lg text-paper/85 max-w-xl leading-relaxed">
              Slow-simmered curries, smoky kebabs and Sunday biryanis — written
              the way they're cooked at home. Follow along, or let us cook for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/recipes"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-warm hover:bg-primary/90 transition-warm"
              >
                Browse Recipes <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/order"
                className="inline-flex items-center gap-2 rounded-full bg-paper/10 backdrop-blur border border-paper/30 px-6 py-3 text-sm font-medium text-paper hover:bg-paper/20 transition-warm"
              >
                Order on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-8">
          {[
            { icon: ChefHat, title: "Tested in a real kitchen", body: "Every recipe is cooked, eaten and rewritten until it works first try." },
            { icon: Heart, title: "Built for home cooks", body: "Pantry spices, simple steps, no fancy gear. Daawat-worthy results." },
            { icon: Sparkles, title: "Order ready-cooked", body: "Don't feel like cooking? Get a fresh tiffin delivered via WhatsApp." },
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

      {/* FEATURED RECIPES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="font-script text-2xl text-primary">This week</span>
            <h2 className="font-display text-4xl md:text-5xl mt-1">Featured Recipes</h2>
          </div>
          <Link
            to="/recipes"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
          >
            View all recipes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
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
            "Pakistani food isn't about following rules — it's about tasting as
            you go, listening to the pot, and trusting your nose."
          </blockquote>
        </div>
      </section>

      {/* ORDER CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl overflow-hidden bg-gradient-warm p-10 md:p-16 text-primary-foreground shadow-warm grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="font-script text-2xl text-paper/90">Don't feel like cooking?</span>
            <h3 className="font-display text-4xl md:text-5xl mt-2">
              Home-cooked meals,
              <br /> delivered fresh.
            </h3>
            <p className="mt-4 text-paper/85 max-w-md leading-relaxed">
              Pick from our weekly menu and order in two taps over WhatsApp. No app,
              no fuss — just a hot tiffin at your door.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link
              to="/order"
              className="inline-flex items-center gap-2 rounded-full bg-paper text-spice-clove px-7 py-4 text-base font-medium shadow-warm hover:scale-[1.02] transition-warm"
            >
              See this week's menu <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
