import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-spice-clove text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-warm text-primary-foreground font-display font-bold">
              A
            </span>
            <span className="font-display text-xl">Anjee's Kitchen</span>
          </div>
          <p className="text-paper/75 max-w-md leading-relaxed">
            Slow-cooked Pakistani recipes, written for the way you actually cook.
            From a home kitchen, to yours.
          </p>
          <div className="flex gap-3 pt-2">
            {[Facebook, Instagram, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-paper/10 hover:bg-accent hover:text-spice-clove transition-warm"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-base mb-3">Explore</h4>
          <ul className="space-y-2 text-paper/75 text-sm">
            <li><Link to="/recipes" className="hover:text-accent transition-warm">Recipes</Link></li>
            <li><Link to="/order" className="hover:text-accent transition-warm">Order Meals</Link></li>
            <li><Link to="/about" className="hover:text-accent transition-warm">About Anjee</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-warm">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base mb-3">Newsletter</h4>
          <p className="text-paper/75 text-sm mb-3">
            Get a new recipe in your inbox each week.
          </p>
          <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@example.com"
              className="rounded-full px-4 py-2 text-sm bg-paper/10 border border-paper/20 placeholder:text-paper/40 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="rounded-full bg-accent text-spice-clove px-4 py-2 text-sm font-medium hover:bg-accent/90 transition-warm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-paper/50 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Anjee's Kitchen. Made with cardamom & care.</span>
          <span>Pakistani home cooking</span>
        </div>
      </div>
    </footer>
  );
}
