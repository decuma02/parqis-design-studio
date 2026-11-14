import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, ChevronDown, Heart, User, Search, ChevronRight, ShoppingCart, Home, PlayCircle, LayoutGrid } from "lucide-react";
import banner from "@/assets/banner.jpg";
import tank from "@/assets/p-tank.jpg";
import pull from "@/assets/p-pullover.jpg";
import ethnic from "@/assets/p-ethnic.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Parqis — Trending fashion, delivered fast" },
      { name: "description", content: "Shop festive, ethnic and western fits at up to 70% off." },
      { property: "og:title", content: "Parqis — Trending fashion, delivered fast" },
      { property: "og:description", content: "Shop festive, ethnic and western fits at up to 70% off." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type P = { name: string; meta: string; price: number; mrp: number; img: string };
const p = (name: string, meta: string, price: number, mrp: number, img: string): P => ({ name, meta, price, mrp, img });

const rails: [{ title: string; items: P[] }, { title: string; items: P[] }, { title: string; items: P[] }] = [
  { title: "College Ready", items: [p("Women Solids Tank top", "S · black", 349, 1199, tank), p("Men Solids Pullover", "2XL · maroon", 449, 1399, pull), p("Women Solids Tank top", "M · navy", 349, 1199, tank), p("Men Solids Sweatshirt", "M · Bottle Green", 599, 1999, pull), p("Women Solids Trousers", "XS · white", 499, 1499, tank)] },
  { title: "Pull over in Style", items: [p("Men Solids Pullover", "M · black", 449, 1399, pull), p("Men Solids Pullover", "XL · Maroon", 449, 1399, pull), p("Men Solids Pullover", "M · Olive", 449, 1399, pull), p("Men Solids Pullover", "S · brown", 449, 1399, pull)] },
  { title: "Lights, Looks, Diwali", items: [p("Women Embroidered Suit Set", "M · blue", 1899, 4499, ethnic), p("Women Embroidered Suit Set", "XS · Mauve", 1999, 4699, ethnic), p("Women Embroidered Kurta pant Set", "L · black", 1999, 4599, ethnic), p("Women Floral Suit Set", "2XL · Lavender", 1289, 6699, ethnic)] },
];
const cats = [["Festive Fashion", ethnic], ["Everyday Fits", tank], ["Men's Sweatshirts", pull], ["Crop Tops", tank], ["Ethnic Fusion", ethnic]];
const tabs = ["ALL", "ETHNIC", "WESTERN", "MEN"];
const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

function Bulbs({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 flex justify-around ${className}`}>
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className="size-2 rounded-full bg-bulb animate-twinkle" style={{ animationDelay: `${i * 0.2}s`, transform: `translateY(${Math.sin(i) * 6}px)` }} />
      ))}
    </div>
  );
}

function Card({ item }: { item: P }) {
  const off = Math.round((1 - item.price / item.mrp) * 100);
  return (
    <div className="w-[110px] shrink-0 sm:w-[140px]">
      <div className="relative overflow-hidden rounded-sm bg-muted">
        <img src={item.img} alt={item.name} loading="lazy" width={768} height={896} className="aspect-[6/7] w-full object-cover" />
        <button aria-label="Add to cart" className="absolute bottom-1.5 right-1.5 grid size-7 place-items-center rounded-full bg-card/90 text-primary">
          <ShoppingCart className="size-3.5" />
        </button>
      </div>
      <p className="mt-2 line-clamp-2 text-[13px] leading-tight text-muted-foreground">{item.name}</p>
      <p className="text-[11px] text-muted-foreground">{item.meta}</p>
      <p className="mt-1 text-[13px]">
        <span className="font-semibold">{inr(item.price)}</span>{" "}
        <span className="text-muted-foreground line-through">{inr(item.mrp)}</span>{" "}
        <span className="text-success">{off}% OFF</span>
      </p>
    </div>
  );
}

function Index() {
  const [tab, setTab] = useState("ALL");
  const [nav, setNav] = useState("Home");
  return (
    <div className="min-h-screen bg-muted">
      <div className="relative mx-auto min-h-screen max-w-[430px] bg-background pb-28">
        <header className="relative overflow-hidden bg-festive px-4 pb-4 pt-4 text-festive-foreground">
          <Bulbs className="top-9" />
          <div className="relative flex items-center justify-between">
            <button className="flex items-center gap-1 text-sm font-medium"><MapPin className="size-4" />Select an address<ChevronDown className="size-4" /></button>
            <div className="flex gap-4"><Heart className="size-5" /><User className="size-5" /></div>
          </div>
          <label className="relative mt-6 flex items-center gap-2 rounded-md border border-festive-foreground/40 bg-festive-foreground/5 px-4 py-2.5 text-xs">
            <Search className="size-3.5" />
            <input placeholder="Search for products, creators..." className="w-full bg-transparent outline-none placeholder:text-festive-foreground/80" />
          </label>
          <div className="relative mt-4 flex justify-between">
            <Bulbs className="-top-1" />
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`relative rounded-full px-7 py-2 text-xs transition ${tab === t ? "border-2 border-festive-foreground/80 bg-festive-foreground/10" : "opacity-80"}`}>{t}</button>
            ))}
          </div>
          <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto">
            {cats.map(([n, img]) => (
              <button key={n} className="w-[66px] shrink-0 text-center text-[11px] leading-tight">
                <img src={img} alt={n} className="mx-auto mb-1 size-16 rounded-t-full rounded-b-2xl border border-bulb/60 object-cover" />
                {n}
              </button>
            ))}
          </div>
          <div className="relative mt-4 overflow-hidden rounded-md">
            <img src={banner} alt="Mazehunt event" width={1280} height={896} className="aspect-[10/7] w-full object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-between py-3 text-center">
              <span className="text-[9px] tracking-[0.3em]">PARQIS PRESENTS</span>
              <h2 className="text-4xl font-semibold leading-none tracking-wide drop-shadow-lg">COSMIC<br />UPRISING</h2>
              <span className="rounded-full border border-festive-foreground/50 bg-festive/70 px-4 py-1 text-[10px] font-medium">14TH & 15TH NOV | 9 AM ONWARDS | LA CYCLE STAND</span>
            </div>
          </div>
        </header>

        <main className="bg-fade px-4">
          {rails.slice(0, 2).map((r) => <Rail key={r.title} {...r} />)}
          <section className="mt-6 grid grid-cols-[1.25fr_1fr] gap-2">
            <Promo img={ethnic} big label="Bold & Beautiful Tops" />
            <div className="grid gap-2"><Promo img={tank} /><Promo img={ethnic} /></div>
          </section>
          <Rail {...rails[2]} />
        </main>

        <nav className="fixed inset-x-0 bottom-3 z-10 mx-auto flex w-[min(340px,90%)] justify-between rounded-full bg-card p-1.5 shadow-float">
          {[["Home", Home], ["Trends", PlayCircle], ["Categories", LayoutGrid], ["Cart", ShoppingCart]].map(([n, I]) => {
            const Icon = I as typeof Home;
            const on = nav === n;
            return (
              <button key={n as string} onClick={() => setNav(n as string)} className={`flex flex-1 flex-col items-center rounded-full py-1.5 text-[10px] ${on ? "bg-secondary text-primary shadow-float" : "text-foreground"}`}>
                <Icon className="size-4" />{n as string}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function Rail({ title, items }: { title: string; items: P[] }) {
  return (
    <section className="pt-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <a href="#" className="flex items-center text-sm text-primary">View more <ChevronRight className="size-4" /></a>
      </div>
      <div className="no-scrollbar -mr-4 flex gap-4 overflow-x-auto pr-4">{items.map((i, k) => <Card key={k} item={i} />)}</div>
    </section>
  );
}

function Promo({ img, big, label }: { img: string; big?: boolean; label?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-sm ${big ? "row-span-2 h-[340px]" : "h-[166px]"}`}>
      <img src={img} alt="" loading="lazy" className="size-full object-cover" />
      <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">Up to 50% OFF</span>
      {label && (
        <div className="absolute bottom-3 left-3 text-primary-foreground">
          <p className="text-xs">{label}</p>
          <button className="mt-2 flex items-center gap-1 rounded-sm bg-card px-3 py-1 text-xs text-foreground">Explore <ChevronRight className="size-3" /></button>
        </div>
      )}
    </div>
  );
}
