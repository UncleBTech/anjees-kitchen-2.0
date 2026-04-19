import { Link } from "@tanstack/react-router";
import { Clock, Users, Flame } from "lucide-react";
import type { Recipe } from "@/lib/recipes";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      to="/recipes/$slug"
      params={{ slug: recipe.slug }}
      className="group block overflow-hidden rounded-2xl bg-card recipe-card-hover shadow-card-warm border border-border/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-medium text-foreground shadow-soft">
          {recipe.category}
        </div>
        <div className="absolute top-3 right-3 inline-flex items-center gap-0.5 rounded-full bg-primary/95 px-2 py-1 text-xs text-primary-foreground shadow-soft">
          {Array.from({ length: recipe.spice }).map((_, i) => (
            <Flame key={i} className="h-3 w-3" />
          ))}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-warm">
          {recipe.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {recipe.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {recipe.time}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> Serves {recipe.serves}
          </span>
        </div>
        {recipe.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-foreground/70 border border-border/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
