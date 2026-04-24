import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/order", label: "Our Kitchen" },
  { to: "/shop", label: "The Pantry" },
  { to: "/cakes", label: "Cakes" },
  { to: "/khana-khazana", label: "Khana Khazana", badge: "Coming Soon" },
  { to: "/how-to-order", label: "How to Order" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-warm text-primary-foreground font-display font-bold text-lg shadow-soft">
            A
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display font-semibold text-lg text-foreground">
              Anjee's Kitchen
            </span>
            <span className="font-script text-accent text-sm -mt-0.5">
              home cooking, with love
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-foreground/75 hover:text-primary transition-warm inline-flex items-center gap-1.5"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
              {"badge" in item && item.badge && (
                <span className="rounded-full bg-accent/15 text-accent text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 leading-none">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
          <Link
            to="/order"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:shadow-warm transition-warm hover:bg-primary/90"
          >
            Order via WhatsApp
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 rounded-md text-foreground"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="px-4 py-4 flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium text-foreground/80 inline-flex items-center gap-2"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
                {"badge" in item && item.badge && (
                  <span className="rounded-full bg-accent/15 text-accent text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 leading-none">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            <Link
              to="/order"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Order via WhatsApp
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
