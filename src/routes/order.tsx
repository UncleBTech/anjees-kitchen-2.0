import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import biryani from "@/assets/recipe-biryani.jpg";
import nihari from "@/assets/recipe-nihari.jpg";
import karahi from "@/assets/recipe-karahi.jpg";
import malaiBoti from "@/assets/recipe-malai-boti.jpg";
import haleem from "@/assets/recipe-haleem.jpg";
import chapli from "@/assets/recipe-chapli.jpg";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order Home-Cooked Meals — Anjee's Kitchen" },
      { name: "description", content: "Order fresh, home-style Pakistani meals delivered in Karachi. Build your tiffin and check out via WhatsApp — no app needed." },
      { property: "og:title", content: "Order on WhatsApp — Anjee's Kitchen" },
      { property: "og:description", content: "Fresh home-cooked tiffins, ordered via WhatsApp." },
    ],
  }),
  component: OrderPage,
});

// !!! REPLACE with your real WhatsApp number (international format, no +)
const WHATSAPP_NUMBER = "923000000000";

type MenuItem = {
  id: string;
  name: string;
  desc: string;
  priceRs: number;
  image: string;
  tag: string;
};

const menu: MenuItem[] = [
  { id: "biryani", name: "Sindhi Chicken Biryani", desc: "Spicy, layered with potato & saffron rice.", priceRs: 650, image: biryani, tag: "Bestseller" },
  { id: "nihari", name: "Beef Nihari", desc: "Slow-cooked overnight, with naan & lemon.", priceRs: 850, image: nihari, tag: "Sunday special" },
  { id: "karahi", name: "Chicken Karahi (½ kg)", desc: "Tomato-forward, ginger-loaded, dhaba-style.", priceRs: 1100, image: karahi, tag: "Family size" },
  { id: "malai", name: "Chicken Malai Boti (6 sticks)", desc: "Creamy, mild, charcoal-grilled.", priceRs: 950, image: malaiBoti, tag: "BBQ" },
  { id: "haleem", name: "Beef Haleem (Bowl)", desc: "Lentils & shredded beef, with all the toppings.", priceRs: 550, image: haleem, tag: "Comfort" },
  { id: "chapli", name: "Chapli Kebab (4 pcs)", desc: "Peshawari beef patties with naan & chutney.", priceRs: 700, image: chapli, tag: "Snack" },
];

function OrderPage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const items = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ item: menu.find((m) => m.id === id)!, qty }))
        .filter((x) => x.item && x.qty > 0),
    [cart],
  );
  const total = items.reduce((s, x) => s + x.item.priceRs * x.qty, 0);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const sub = (id: string) =>
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) - 1) }));
  const remove = (id: string) =>
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });

  const sendWhatsApp = () => {
    if (items.length === 0) return;
    const lines = [
      "*New Order — Anjee's Kitchen*",
      "",
      ...items.map(({ item, qty }) => `• ${qty}× ${item.name} — Rs ${item.priceRs * qty}`),
      "",
      `*Total: Rs ${total}*`,
      "",
      name ? `Name: ${name}` : "",
      address ? `Address: ${address}` : "",
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <section className="bg-gradient-paper border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <span className="font-script text-3xl text-primary">This week's menu</span>
          <h1 className="font-display text-5xl md:text-6xl mt-2 text-balance">
            Home-cooked, hot, on your table.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Build your tiffin below and check out on WhatsApp — no signup, no app.
            Karachi delivery only · orders before 11 AM for same-day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="grid sm:grid-cols-2 gap-6">
          {menu.map((m) => {
            const qty = cart[m.id] ?? 0;
            return (
              <div
                key={m.id}
                className="rounded-2xl overflow-hidden bg-card shadow-card-warm border border-border/60 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
                  <span className="absolute top-3 left-3 rounded-full bg-accent text-accent-foreground text-xs font-medium px-3 py-1 shadow-soft">
                    {m.tag}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display text-xl">{m.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{m.desc}</p>
                  <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
                    <span className="font-display text-lg text-primary">Rs {m.priceRs}</span>
                    {qty === 0 ? (
                      <button
                        onClick={() => add(m.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-warm shadow-soft"
                      >
                        <Plus className="h-4 w-4" /> Add
                      </button>
                    ) : (
                      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background p-1">
                        <button onClick={() => sub(m.id)} className="h-7 w-7 rounded-full bg-secondary inline-flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-warm">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-medium text-sm w-5 text-center">{qty}</span>
                        <button onClick={() => add(m.id)} className="h-7 w-7 rounded-full bg-secondary inline-flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-warm">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CART */}
        <aside className="lg:sticky lg:top-24 h-fit rounded-2xl bg-card shadow-warm border border-border/60 p-6">
          <h2 className="font-display text-2xl">Your Tiffin</h2>
          {items.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Your basket is empty. Add a dish to get started.
            </p>
          ) : (
            <ul className="mt-4 space-y-3 divide-y divide-border/60">
              {items.map(({ item, qty }) => (
                <li key={item.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {qty} × Rs {item.priceRs} = Rs {qty * item.priceRs}
                    </div>
                  </div>
                  <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-destructive transition-warm">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 pt-5 border-t border-border/60 flex justify-between font-display text-lg">
            <span>Total</span>
            <span className="text-primary">Rs {total}</span>
          </div>

          <div className="mt-5 space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Delivery address"
              rows={2}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            onClick={sendWhatsApp}
            disabled={items.length === 0}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-spice-cardamom text-paper py-3 font-medium hover:opacity-90 transition-warm shadow-soft disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <MessageCircle className="h-4 w-4" /> Checkout on WhatsApp
          </button>
          <p className="mt-3 text-xs text-muted-foreground text-center">
            Opens WhatsApp with your order pre-filled. We'll confirm timing & payment there.
          </p>
        </aside>
      </section>
    </>
  );
}
