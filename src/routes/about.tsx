import { createFileRoute } from "@tanstack/react-router";
import aboutImg from "@/assets/about-anjee.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Anjee's Kitchen" },
      { name: "description", content: "Anjee's Kitchen is a Pakistani home cook sharing tested family recipes and home-style meals." },
      { property: "og:title", content: "About Anjee's Kitchen" },
      { property: "og:description", content: "A Pakistani home cook sharing tested family recipes." },
      { property: "og:image", content: aboutImg },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <span className="font-script text-3xl text-primary">Hello —</span>
          <h1 className="font-display text-5xl md:text-6xl mt-2 text-balance">I'm Anjee.</h1>
          <p className="mt-6 text-lg text-foreground/80 leading-relaxed">
            I grew up in a Karachi kitchen where the day was measured in cups of
            chai and the smell of onions browning in oil. My grandmother taught me
            that good Pakistani food is never rushed — it's coaxed.
          </p>
          <p className="mt-4 text-lg text-foreground/80 leading-relaxed">
            This site is my way of writing down the recipes I cook every week,
            exactly the way I cook them — measurements, shortcuts, and the little
            tricks that aren't in any cookbook.
          </p>
          <p className="mt-4 text-lg text-foreground/80 leading-relaxed">
            And when there isn't time to cook? I also send out fresh, home-cooked
            tiffins to a small list of neighbours. If that sounds like you, swing
            by the order page.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative">
            <img
              src={aboutImg}
              alt="Anjee in her kitchen"
              loading="lazy"
              className="rounded-3xl shadow-warm w-full object-cover aspect-[4/5]"
            />
            <div className="absolute -bottom-5 -left-5 bg-card rounded-2xl px-5 py-3 shadow-card-warm border border-border/60">
              <div className="font-script text-xl text-primary">cooking since</div>
              <div className="font-display text-2xl">1998</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 border-y border-border/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-display text-4xl text-center mb-12">What we believe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "Slow food, real flavour", b: "No shortcuts that flatten the dish. We bhuna properly, soak rice properly, and let the masala speak." },
              { t: "Home, not restaurant", b: "These recipes come from real Pakistani homes — heavy on aroma, light on cream and food colouring." },
              { t: "Anyone can cook this", b: "If you have a stovetop and a few spices, you can make every recipe on this site. We promise." },
            ].map((p) => (
              <div key={p.t} className="text-center">
                <h3 className="font-display text-xl text-primary">{p.t}</h3>
                <p className="mt-2 text-foreground/75 leading-relaxed">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
