import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Bulbs, HeaderActions, ProductCard, ProductGrid } from '@/components/shop/ui';
import { categories, collections, filterProducts, products } from '@/components/shop/catalog';
import banner from '@/assets/banner.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Parqis — Trending fashion, delivered fast' },
    { name: 'description', content: 'Shop festive, ethnic and western fits at up to 70% off.' },
    { property: 'og:title', content: 'Parqis — Trending fashion, delivered fast' },
    { property: 'og:description', content: 'Shop festive, ethnic and western fits at up to 70% off.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Index,
});
function Index() {
  const [tab, setTab] = useState('ALL');
  const [query, setQuery] = useState('');
  const filtered = tab !== 'ALL' || query.trim();
  return <>
    <header className="relative overflow-hidden bg-festive px-4 pb-4 pt-4 text-festive-foreground">
      <Bulbs className="top-9" /><HeaderActions />
      <label className="relative mt-5 flex items-center gap-2 rounded-md border border-festive-foreground/40 bg-festive-foreground/5 px-4 py-2.5 text-xs"><Search className="size-4" /><input aria-label="Search products" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for products..." className="min-w-0 w-full bg-transparent outline-none placeholder:text-festive-foreground/80" /></label>
      <div className="relative mt-4 grid grid-cols-4 gap-1"><Bulbs className="-top-1" />{['ALL', 'ETHNIC', 'WESTERN', 'MEN'].map(t => <Button key={t} variant="ghost" onClick={() => setTab(t)} aria-pressed={tab === t} className={`rounded-full px-1 text-xs text-festive-foreground hover:bg-festive-foreground/10 hover:text-festive-foreground ${tab === t ? 'border-2 border-festive-foreground/80 bg-festive-foreground/10' : 'opacity-80'}`}>{t}</Button>)}</div>
      <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto">{categories.map(c => <Button key={c.name} asChild variant="ghost" className="h-auto w-[66px] shrink-0 whitespace-normal p-0 text-festive-foreground hover:bg-festive-foreground/10 hover:text-festive-foreground"><Link to="/categories" search={{ category: c.category }}><span className="text-center text-[11px] leading-tight"><img src={c.img} alt="" className="mx-auto mb-1 size-16 rounded-t-full rounded-b-2xl border border-bulb/60 object-cover" />{c.name}</span></Link></Button>)}</div>
      <Link to="/trends" aria-label="Explore Cosmic Uprising" className="relative mt-4 block overflow-hidden rounded-md"><img src={banner} alt="Cosmic Uprising" width={1280} height={896} className="aspect-[10/7] w-full object-cover" /><div className="absolute inset-0 flex flex-col items-center justify-between py-3 text-center"><span className="text-[9px]">PARQIS PRESENTS</span><h1 className="text-4xl font-semibold leading-none drop-shadow-lg">COSMIC<br />UPRISING</h1><span className="rounded-full border border-festive-foreground/50 bg-festive/70 px-3 py-1 text-[9px] font-medium">14TH &amp; 15TH NOV | 9 AM ONWARDS | LA CYCLE STAND</span></div></Link>
    </header>
    <main className="page-enter bg-fade px-4 pb-6">{filtered ? <section className="pt-6"><h2 className="mb-4 text-lg font-medium">{query.trim() ? `Results for “${query}”` : `${tab.charAt(0)}${tab.slice(1).toLowerCase()} fashion`}</h2><ProductGrid items={filterProducts(query, tab)} /></section> : <>{collections.slice(0, 2).map(title => <Rail key={title} title={title} />)}<section className="mt-6 grid grid-cols-[1.25fr_1fr] gap-2"><Promo index={0} big label="Bold & Beautiful Tops" /><div className="grid gap-2"><Promo index={1} /><Promo index={4} /></div></section><Rail title={collections[2]} /></>}</main>
  </>;
}
function Rail({ title }: { title: string }) { return <section className="pt-6"><div className="mb-3 flex items-center justify-between gap-2"><h2 className="text-lg font-medium">{title}</h2><Button asChild variant="link" className="h-auto shrink-0 p-0 text-xs"><Link to="/trends" search={{ collection: title }}>View more <ChevronRight /></Link></Button></div><div className="no-scrollbar -mr-4 flex gap-4 overflow-x-auto pr-4">{products.filter(p => p.collection === title).map(p => <div key={p.id} className="w-[110px] shrink-0 sm:w-[140px]"><ProductCard item={p} /></div>)}</div></section>; }
function Promo({ index, big, label }: { index: number; big?: boolean; label?: string }) { const c = categories[index]; return <Link to="/categories" search={{ category: c.category }} className={`relative block overflow-hidden rounded-sm ${big ? 'h-[340px]' : 'h-[166px]'}`}><img src={c.img} alt={label || c.name} loading="lazy" className="size-full object-cover transition-transform duration-300 hover:scale-105" /><span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">Up to 50% OFF</span>{label && <div className="absolute bottom-3 left-3 bg-card/90 p-2 text-foreground"><p className="text-xs">{label}</p><span className="mt-2 flex items-center gap-1 text-xs text-primary">Explore <ChevronRight className="size-3" /></span></div>}</Link>; }
