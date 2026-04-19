import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, Users, Flame, ArrowLeft } from "lucide-react";
import { getRecipe, recipes } from "@/lib/recipes";

export const Route = createFileRoute("/recipes/$slug")({
  loader: ({ params }) => {
    const recipe = getRecipe(params.slug);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.recipe.title} — Anjee's Kitchen` },
          { name: "description", content: loaderData.recipe.excerpt },
          { property: "og:title", content: `${loaderData.recipe.title} — Anjee's Kitchen` },
          { property: "og:description", content: loaderData.recipe.excerpt },
          { property: "og:image", content: loaderData.recipe.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="font-display text-5xl">Recipe not found</h1>
      <p className="mt-4 text-muted-foreground">We couldn't find that recipe.</p>
      <Link to="/recipes" className="mt-6 inline-block text-primary font-medium">← Back to recipes</Link>
    </div>
  ),
  component: RecipeDetail,
});

function RecipeDetail() {
  const { recipe } = Route.useLoaderData();
  const more = recipes.filter((r) => r.slug !== recipe.slug).slice(0, 3);

  return (
    <article>
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-spice-clove/95 via-spice-clove/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12 text-paper">
          <Link
            to="/recipes"
            className="inline-flex items-center gap-1 text-sm text-paper/80 hover:text-accent transition-warm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to recipes
          </Link>
          <span className="mt-3 inline-block font-script text-2xl text-accent">
            {recipe.category}
          </span>
          <h1 className="font-display text-5xl md:text-6xl mt-1 text-balance">
            {recipe.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="rounded-2xl bg-card shadow-warm border border-border/60 p-6 grid grid-cols-3 gap-4 text-center">
          <Stat icon={Clock} label="Total time" value={recipe.time} />
          <Stat icon={Users} label="Serves" value={recipe.serves} />
          <Stat icon={Flame} label="Spice" value={"★".repeat(recipe.spice)} />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 prose-content">
        <p className="font-display text-2xl text-foreground leading-snug">
          {recipe.excerpt}
        </p>

        <div className="ornament-divider my-10">
          <span className="font-script text-xl">۞</span>
        </div>

        <h2 className="font-display text-3xl mt-2 mb-4">Ingredients</h2>
        <ul className="space-y-2 text-foreground/85">
          {sampleIngredients.map((i) => (
            <li key={i} className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>{i}</span>
            </li>
          ))}
        </ul>

        <h2 className="font-display text-3xl mt-12 mb-4">Method</h2>
        <ol className="space-y-5">
          {sampleSteps.map((s, idx) => (
            <li key={idx} className="flex gap-4">
              <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-semibold">
                {idx + 1}
              </span>
              <p className="text-foreground/85 leading-relaxed pt-0.5">{s}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-2xl bg-secondary/60 p-6 border-l-4 border-accent">
          <span className="font-script text-xl text-primary">Anjee's tip</span>
          <p className="mt-1 text-foreground/85 leading-relaxed">
            Don't rush the bhuna. The colour change from raw to deep red-brown is
            the whole flavour of this dish — give it the time it asks for.
          </p>
        </div>
      </div>

      <section className="bg-secondary/40 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-display text-3xl mb-8 text-center">More from the kitchen</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((r) => (
              <Link
                key={r.slug}
                to="/recipes/$slug"
                params={{ slug: r.slug }}
                className="group block rounded-2xl overflow-hidden bg-card shadow-card-warm border border-border/60 recipe-card-hover"
              >
                <img src={r.image} alt={r.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="font-display text-xl group-hover:text-primary transition-warm">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.time} · Serves {r.serves}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div>
      <Icon className="h-5 w-5 text-primary mx-auto" />
      <div className="mt-2 font-display text-lg">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}

const sampleIngredients = [
  "500g chicken / beef / lentils (depending on dish)",
  "2 medium onions, finely sliced",
  "3 tomatoes, blended",
  "2 tbsp ginger-garlic paste",
  "1 tsp turmeric (haldi)",
  "1 tbsp red chilli powder",
  "1 tsp garam masala",
  "Salt, to taste",
  "3 tbsp oil or ghee",
  "Fresh coriander and green chillies, to garnish",
];

const sampleSteps = [
  "Heat oil in a heavy-bottomed pot over medium heat. Add the sliced onions and fry until deep golden brown — patience here pays off.",
  "Stir in the ginger-garlic paste and cook for 30 seconds, until fragrant.",
  "Add the tomatoes, turmeric, chilli powder and salt. Cover and let it bhuna for 8–10 minutes, stirring occasionally, until the oil separates.",
  "Add the protein and toss to coat in the masala. Cook on high for 3–4 minutes to seal.",
  "Pour in 1 cup of hot water, lower the heat, cover and simmer until the meat is tender (20 min for chicken, 1 hr for beef).",
  "Finish with garam masala, fresh coriander and slit green chillies. Rest for 5 minutes before serving with naan or rice.",
];
