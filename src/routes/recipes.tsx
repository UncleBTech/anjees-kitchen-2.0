import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { recipes } from "@/lib/recipes";
import { RecipeCard } from "@/components/RecipeCard";

export const Route = createFileRoute("/recipes")({
  head: () => ({
    meta: [
      { title: "Recipes — Anjee's Kitchen" },
      { name: "description", content: "Browse Pakistani recipes — biryani, curries, kebabs and slow-cooked classics. All tested in a home kitchen." },
      { property: "og:title", content: "Recipes — Anjee's Kitchen" },
      { property: "og:description", content: "Pakistani recipes from a home kitchen." },
    ],
  }),
  component: RecipesPage,
});

const categories = ["All", "Biryani & Rice", "Curry", "BBQ & Kebabs", "Slow-Cooked"] as const;

function RecipesPage() {
  const [active, setActive] = useState<typeof categories[number]>("All");
  const filtered = useMemo(
    () => (active === "All" ? recipes : recipes.filter((r) => r.category === active)),
    [active],
  );

  return (
    <>
      <section className="bg-gradient-paper border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <span className="font-script text-3xl text-primary">The recipe book</span>
          <h1 className="font-display text-5xl md:text-6xl mt-2 text-balance">
            Cook the food we grew up on.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every recipe is written for the way you actually cook — pantry spices,
            simple steps, and notes from a real Pakistani home kitchen.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-warm border ${
                active === c
                  ? "bg-primary text-primary-foreground border-primary shadow-soft"
                  : "bg-card text-foreground border-border hover:border-primary/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      </section>
    </>
  );
}
