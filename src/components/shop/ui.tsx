import { Link } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
import { Home, PlayCircle, LayoutGrid, ShoppingCart, Heart, User, MapPin, ChevronDown, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useShop } from './store';
import { type Product, inr } from './catalog';

export function Bulbs({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 flex justify-around ${className}`}>{Array.from({ length: 10 }, (_, i) => <span key={i} className="size-2 rounded-full bg-bulb animate-twinkle" style={{ animationDelay: `${i * .2}s`, transform: `translateY(${Math.sin(i) * 6}px)` }} />)}</div>;
}
export function ShopShell({ children }: { children: ReactNode }) {
  const { cart, notice } = useShop();
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const links = [{ name: 'Home', to: '/' as const, icon: Home }, { name: 'Trends', to: '/trends' as const, icon: PlayCircle }, { name: 'Categories', to: '/categories' as const, icon: LayoutGrid }, { name: 'Cart', to: '/cart' as const, icon: ShoppingCart }];
  return <div className="min-h-screen bg-muted"><div className="relative mx-auto min-h-screen max-w-[430px] bg-background pb-28">{children}
    <span role="status" className="sr-only">{notice}</span>
    <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-3 z-20 mx-auto flex w-[min(340px,90%)] justify-between rounded-full bg-card p-1.5 shadow-float">{links.map(({ name, to, icon: Icon }) => <Button key={name} asChild variant="ghost" className="h-auto flex-1 rounded-full px-1 py-2"><Link to={to} activeOptions={{ exact: true }} activeProps={{ className: 'bg-secondary text-primary shadow-float' }}><span className="relative flex flex-col items-center gap-1 text-[10px]"><Icon />{name}{name === 'Cart' && count > 0 && <span className="absolute -right-3 -top-1 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] text-primary-foreground">{count}</span>}</span></Link></Button>)}</nav>
  </div></div>;
}
export function HeaderActions() {
  const { address, setAddress, wishlist } = useShop();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  return <><div className="relative flex items-center justify-between gap-2"><Button variant="ghost" onClick={() => { setDraft(address); setOpen(true); }} className="h-auto min-w-0 justify-start px-0 text-festive-foreground hover:bg-festive-foreground/10 hover:text-festive-foreground"><MapPin /><span className="max-w-[220px] truncate">{address || 'Select an address'}</span><ChevronDown /></Button><div className="flex gap-1"><Button asChild variant="ghost" size="icon" className="text-festive-foreground hover:bg-festive-foreground/10 hover:text-festive-foreground"><Link to="/wishlist" aria-label={`Wishlist${wishlist.length ? `, ${wishlist.length} saved` : ''}`}><Heart /></Link></Button><Button asChild variant="ghost" size="icon" className="text-festive-foreground hover:bg-festive-foreground/10 hover:text-festive-foreground"><Link to="/account" aria-label="Account"><User /></Link></Button></div></div>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-sm"><DialogTitle>Delivery address</DialogTitle><DialogDescription>Enter your delivery address.</DialogDescription><form onSubmit={e => { e.preventDefault(); if (draft.trim()) { setAddress(draft.trim()); setOpen(false); } }} className="grid gap-4"><label className="grid gap-2 text-sm">Address<Input required value={draft} onChange={e => setDraft(e.target.value)} placeholder="House, street, city, postal code" /></label><Button type="submit">Save address</Button></form></DialogContent></Dialog>
  </>;
}
export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return <header className="relative overflow-hidden bg-festive px-4 py-4 text-festive-foreground"><Bulbs className="top-2" /><HeaderActions /><Link to="/" className="mt-4 block text-xs font-semibold">PARQIS</Link><h1 className="mt-1 text-2xl font-semibold">{title}</h1>{subtitle && <p className="mt-2 text-sm opacity-80">{subtitle}</p>}</header>;
}
export function ProductCard({ item }: { item: Product }) {
  const { cart, add, wishlist, toggleWish } = useShop();
  const [open, setOpen] = useState(false);
  const saved = wishlist.includes(item.id);
  return <article className="min-w-0"><div className="relative overflow-hidden rounded-sm bg-muted">
    <Button variant="ghost" aria-label={`View ${item.name}, ${item.meta}`} onClick={() => setOpen(true)} className="block h-auto w-full overflow-hidden rounded-none p-0"><img src={item.img} alt={item.name} loading="lazy" width={768} height={896} className="aspect-[6/7] w-full object-cover transition-transform duration-300 hover:scale-105" /></Button>
    <Button variant="secondary" size="icon" aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'} aria-pressed={saved} onClick={() => toggleWish(item.id)} className="absolute right-1.5 top-1.5 size-7 rounded-full bg-card/90 text-primary"><Heart className={saved ? 'fill-current' : ''} /></Button>
    <Button variant="secondary" size="icon" aria-label={`Add ${item.name}, ${item.meta} to cart`} onClick={() => add(item.id)} className="absolute bottom-1.5 right-1.5 size-8 rounded-full bg-card/90 text-primary">{cart[item.id] ? <Check /> : <ShoppingCart />}</Button></div>
    <p className="mt-2 line-clamp-2 text-[13px] leading-tight text-muted-foreground">{item.name}</p><p className="text-[11px] text-muted-foreground">{item.meta}</p><div className="mt-1 flex flex-wrap gap-x-1 text-[12px]"><span className="font-semibold">{inr(item.price)}</span><span className="text-muted-foreground line-through">{inr(item.mrp)}</span><span className="text-success">{Math.round((1 - item.price / item.mrp) * 100)}% OFF</span></div>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-h-[90dvh] max-w-[calc(100%-2rem)] overflow-y-auto sm:max-w-sm"><img src={item.img} alt={item.name} className="mx-auto aspect-[6/7] max-h-[38dvh] object-cover" /><DialogTitle>{item.name}</DialogTitle><DialogDescription>{item.meta}</DialogDescription><p className="text-xl font-semibold">{inr(item.price)}</p><Button onClick={() => add(item.id)}><Plus />{cart[item.id] ? `Add another (${cart[item.id]} in cart)` : 'Add to cart'}</Button><Button variant="outline" asChild><Link to="/cart" onClick={() => setOpen(false)}>View cart</Link></Button></DialogContent></Dialog>
  </article>;
}
export function ProductGrid({ items }: { items: Product[] }) { return items.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-6">{items.map(item => <ProductCard key={item.id} item={item} />)}</div> : <div className="py-14 text-center"><SearchEmpty /><p className="mt-3 font-medium">No products found</p><Button asChild variant="link"><Link to="/categories">Browse categories</Link></Button></div>; }
function SearchEmpty() { return <LayoutGrid className="mx-auto size-8 text-muted-foreground" />; }
