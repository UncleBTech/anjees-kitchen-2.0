import { createFileRoute } from "@tanstack/react-router";
import aboutImg from "@/assets/about-anjee.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Anjee's Kitchen" },
      { name: "description", content: "Three women, one kitchen. Anjee's Kitchen is a family of Punjabi cooks based in Bradford, making halal Pakistani food fresh to order." },
      { property: "og:title", content: "About Anjee's Kitchen" },
      { property: "og:description", content: "Three generations of Punjabi cooking, made fresh in Bradford." },
      { property: "og:image", content: aboutImg },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const women = [
    {
      title: "Anjee — The Heart of the Kitchen",
      bio: "We call her Anjee — short for Amma Jaan, the name that says everything. Shahnaz Perveen has been cooking since 1978, and her recipes are the foundation of everything we make. The garam masala, the chutneys, the slow-cooked gravies — all hers. Growing up in Punjab, she learned from women who measured spices by instinct and cooked by smell. She brought all of that with her to Bradford, and it's never left the kitchen.",
    },
    {
      title: "Saira — The Baker & Chef",
      bio: "Saira is self-taught and has been cooking and baking since early childhood. She handles our frozen products — the handmade parathas, kebabs, samosas and snacks — as well as every cake that leaves our kitchen. The Matilda chocolate cake, the date pudding, the brownies — all hers. She uses free-range eggs, real butter, and fresh ingredients because she won't make anything she wouldn't be proud to serve at her own table.",
    },
    {
      title: "Aysha — The Professional Chef",
      bio: "Aysha holds a professional chef qualification and brings a different kind of precision to the family kitchen. A lifelong foodie with a love of fusion, she's the one who experiments — mixing Pakistani technique with flavours from cuisines around the world. Her recipes will be the first to appear on Khana Khazana, our free community recipe platform launching soon.",
    },
  ];

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <span className="font-script text-3xl text-primary">Three women. One kitchen.</span>
          <h1 className="font-display text-5xl md:text-6xl mt-2 text-balance">Anjee's Kitchen</h1>
          <p className="mt-6 text-lg text-foreground/80 leading-relaxed">
            We're a family of food lovers from Punjab, Pakistan — now based in Bradford. Anjee's Kitchen was born from a simple belief: that the best food comes from people who cook with love, use proper ingredients, and have nothing to hide.
          </p>
          <p className="mt-4 text-lg text-foreground/80 leading-relaxed">
            Every product we make is halal, made fresh to order, with free-range eggs, fresh vegetables, and desi ghee. No frozen packs. No shortcuts.
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
              <div className="font-display text-2xl">1978</div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE WOMEN */}
      <section className="bg-secondary/40 border-y border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <span className="font-script text-2xl text-primary">Meet the family —</span>
            <h2 className="font-display text-4xl mt-2">The three women behind every dish</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {women.map((w) => (
              <article key={w.title} className="rounded-3xl bg-card shadow-card-warm border border-border/60 p-8 flex flex-col">
                <h3 className="font-display text-2xl text-primary leading-snug">{w.title}</h3>
                <p className="mt-4 text-foreground/80 leading-relaxed">{w.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BELIEFS */}
      <section>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="font-display text-4xl text-center mb-12">What we believe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "Quality over everything", b: "Free-range eggs. Fresh vegetables. Desi ghee and real butter. Halal-certified meat. We source properly because it tastes better and because your family deserves it." },
              { t: "Made fresh, made to order", b: "Nothing sits in a cold store waiting. We make your order when you place it — which means it arrives at its best. That's why we ask for a little notice." },
              { t: "Food is how we show love", b: "This isn't just a business. It's what we cook for our own families, offered to yours. We want you to share it with the people you love — and we take that seriously." },
            ].map((p) => (
              <div key={p.t} className="text-center">
                <h3 className="font-display text-xl text-primary">{p.t}</h3>
                <p className="mt-2 text-foreground/75 leading-relaxed">{p.b}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center font-script text-3xl text-accent italic">
            Proudly Punjabi. Proudly Bradford.
          </p>
        </div>
      </section>
    </>
  );
}
