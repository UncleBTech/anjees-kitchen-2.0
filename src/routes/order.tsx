import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Minus, Trash2, MessageCircle, Truck } from "lucide-react";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Our Kitchen — Anjee's Kitchen, Bradford" },
      { name: "description", content: "Order handmade frozen parathas, kebabs, samosas and snacks from Anjee's Kitchen. Made fresh in Bradford with desi ghee and halal ingredients." },
      { property: "og:title", content: "Our Kitchen — Anjee's Kitchen" },
      { property: "og:description", content: "Handmade frozen Pakistani food, made fresh in Bradford." },
    ],
  }),
  component: OrderPage,
});

// Replace with real WhatsApp number (international format, no +)
const WHATSAPP_NUMBER = "447000000000";

type MenuItem = {
  id: string;
  name: string;
  desc: string;
  priceGBP: number;
  tag: string;
};

const menu: MenuItem[] = [
  // Parathas
  { id: "plain-paratha", name: "Plain Paratha", desc: "Handmade with desi ghee. Pack of 5.", priceGBP: 8.0, tag: "Parathas" },
  { id: "aloo-paratha", name: "Aloo Paratha", desc: "Spiced potato filling, handmade with desi ghee. Pack of 4.", priceGBP: 9.5, tag: "Parathas" },
  { id: "qeema-paratha", name: "Qeema Paratha", desc: "Spiced minced beef filling, handmade with desi ghee. Pack of 4.", priceGBP: 11.0, tag: "Parathas" },
  { id: "chicken-cheese-paratha", name: "Chicken & Cheese Paratha", desc: "Shredded chicken and cheese filling, handmade with desi ghee. Pack of 4.", priceGBP: 12.0, tag: "Parathas" },
  // Snacks
  { id: "chicken-shami", name: "Chicken Shami Kebab", desc: "Classic shami kebabs, handmade. Fry from frozen. Pack of 8.", priceGBP: 7.0, tag: "Snacks" },
  { id: "chicken-samosa", name: "Chicken Samosa", desc: "Crispy handmade samosas with spiced chicken filling. Pack of 6.", priceGBP: 6.0, tag: "Snacks" },
  { id: "chicken-puff", name: "Chicken Puff Pastry", desc: "Golden puff pastry with a spiced chicken filling. Pack of 4.", priceGBP: 5.5, tag: "Snacks" },
  { id: "chicken-bread", name: "Chicken Bread", desc: "Soft filled bread with a spiced chicken filling. Pack of 2.", priceGBP: 5.0, tag: "Snacks" },
];

const tagFilters = ["All", "Parathas", "Snacks"] as const;

const fmtGBP = (n: number) => `£${n.toFixed(2)}`;

function OrderPage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [activeTag, setActiveTag] = useState<typeof tagFilters[number]>("All");

  const visibleMenu = useMemo(
    () => (activeTag === "All" ? menu : menu.filter((m) => m.tag === activeTag)),
    [activeTag],
  );

  const items = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ item: menu.find((m) => m.id === id)!, qty }))
        .filter((x) => x.item && x.qty > 0),
    [cart],
  );
  const total = items.reduce((s, x) => s + x.item.priceGBP * x.qty, 0);

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
      ...items.map(({ item, qty }) => `• ${qty}× ${item.name} — ${fmtGBP(item.priceGBP * qty)}`),
      "",
      `*Total: ${fmtGBP(total)}*`,
      "",
      name ? `Name: ${name}` : "",
      address ? `Collection / Delivery: ${address}` : "",
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <section className="bg-gradient-paper border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <span className="font-script text-3xl text-primary">Fresh from Bradford —</span>
          <h1 className="font-display text-5xl md:text-6xl mt-2 text-balance">
            Our Kitchen
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything is made fresh to order using halal-certified meat, free-range eggs, desi ghee and fresh vegetables. Collection from Bradford or Saturday delivery across Yorkshire and beyond. Please allow 2–3 days for most orders.
          </p>

          <div className="mt-8 mx-auto max-w-3xl rounded-2xl bg-card border border-border/60 shadow-soft px-5 py-4 text-left flex items-start gap-3">
            <Truck className="h-5 w-5 mt-0.5 text-primary shrink-0" />
            <p className="text-sm text-foreground/80 leading-relaxed">
              <span className="font-medium text-foreground">Saturday delivery available</span> — Bradford, Leeds, Halifax, Wakefield, Huddersfield, Oldham, Rochdale, Manchester &amp; Wolverhampton. Orders must be placed by Thursday midnight. £3 delivery on orders under £50, free over £50.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-[1fr_380px] gap-10">
        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {tagFilters.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-warm border ${
                  activeTag === t
                    ? "bg-primary text-primary-foreground border-primary shadow-soft"
                    : "bg-card text-foreground/70 border-border hover:border-primary/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {visibleMenu.map((m) => {
              const qty = cart[m.id] ?? 0;
              return (
                <div
                  key={m.id}
                  className="rounded-2xl bg-card shadow-card-warm border border-border/60 p-6 flex flex-col"
                >
                  <span className="self-start rounded-full bg-accent/15 text-accent text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
                    {m.tag}
                  </span>
                  <h3 className="font-display text-xl mt-3">{m.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{m.desc}</p>
                  <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
                    <span className="font-display text-lg text-primary">{fmtGBP(m.priceGBP)}</span>
                    {qty === 0 ? (
                      <button
                        onClick={() => add(m.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-warm shadow-soft"
                      >
                        <Plus className="h-4 w-4" /> Add
                      </button>
                    ) : (
                      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background p-1">
                        <button onClick={() => sub(m.id)} aria-label="Decrease quantity" className="h-7 w-7 rounded-full bg-secondary inline-flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-warm">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-medium text-sm w-5 text-center">{qty}</span>
                        <button onClick={() => add(m.id)} aria-label="Increase quantity" className="h-7 w-7 rounded-full bg-secondary inline-flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-warm">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CART */}
        <aside className="lg:sticky lg:top-24 h-fit rounded-2xl bg-card shadow-warm border border-border/60 p-6">
          <h2 className="font-display text-2xl">Your Order</h2>
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
                      {qty} × {fmtGBP(item.priceGBP)} = {fmtGBP(qty * item.priceGBP)}
                    </div>
                  </div>
                  <button onClick={() => remove(item.id)} aria-label={`Remove ${item.name}`} className="text-muted-foreground hover:text-destructive transition-warm">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 pt-5 border-t border-border/60 flex justify-between font-display text-lg">
            <span>Total</span>
            <span className="text-primary">{fmtGBP(total)}</span>
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
              placeholder="Collection or delivery address"
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
            Opens WhatsApp with your order pre-filled. We'll confirm timing &amp; payment there.
          </p>
        </aside>
      </section>
    </>
  );
}
