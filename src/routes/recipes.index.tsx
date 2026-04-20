import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { recipes, type RecipeTag } from "@/lib/recipes";
import { RecipeCard } from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/recipes/")({
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
const allTags: RecipeTag[] = [
  "Quick",
  "Vegetarian",
  "BBQ",
  "Dessert",
  "Spicy",
  "Mild",
  "Weekend",
  "One-Pot",
  "Crowd-Pleaser",
];

function RecipesPage() {
  const [active, setActive] = useState<typeof categories[number]>("All");
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<RecipeTag[]>([]);

  const toggleTag = (tag: RecipeTag) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  const clearAll = () => {
    setQuery("");
    setSelectedTags([]);
    setActive("All");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((r) => {
      if (active !== "All" && r.category !== active) return false;
      if (selectedTags.length && !selectedTags.every((t) => r.tags.includes(t))) return false;
      if (q) {
        const haystack = `${r.title} ${r.excerpt} ${r.category} ${r.tags.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [active, query, selectedTags]);

  const hasFilters = query || selectedTags.length > 0 || active !== "All";

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
        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search recipes, ingredients, vibes…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 h-12 text-base bg-card border-border/80 focus-visible:ring-primary/40"
            aria-label="Search recipes"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
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

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {allTags.map((tag) => {
            const isActive = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider transition-warm border ${
                  isActive
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-transparent text-muted-foreground border-border/70 hover:border-accent/60 hover:text-foreground"
                }`}
                aria-pressed={isActive}
              >
                #{tag}
              </button>
            );
          })}
        </div>

        {/* Results meta */}
        <div className="flex items-center justify-center gap-3 mb-10 text-sm text-muted-foreground">
          <span>
            {filtered.length} {filtered.length === 1 ? "recipe" : "recipes"}
          </span>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-primary hover:underline underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-lg">
            <p className="font-display text-2xl mb-2">No recipes found</p>
            <p className="text-muted-foreground">
              Try a different search or clear your filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
