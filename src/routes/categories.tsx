import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, ProductGrid } from '@/components/shop/ui';
import { categories, filterProducts } from '@/components/shop/catalog';
export const Route = createFileRoute('/categories')({
  validateSearch: (search: Record<string, unknown>): { category?: string } => ({ category: typeof search.category === 'string' ? search.category : undefined }),
  head: () => ({ meta: [{ title: 'Categories — Parqis' }, { name: 'description', content: 'Browse ethnic, western and men’s fashion at Parqis.' }, { property: 'og:title', content: 'Categories — Parqis' }, { property: 'og:description', content: 'Explore fashion by category.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: Categories,
});
function Categories() {
  const { category = 'ALL' } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState('');
  return <><PageHeader title="Categories" /><main className="page-enter px-4 py-6"><div className="mb-5 grid grid-cols-3 gap-3">{categories.slice(0, 3).map(c => <Button key={c.name} variant="ghost" aria-pressed={category === c.category} onClick={() => navigate({ search: { category: c.category } })} className={`h-auto flex-col whitespace-normal p-2 text-xs ${category === c.category ? 'bg-secondary text-primary' : ''}`}><img src={c.img} alt="" className="aspect-square w-full rounded-full object-cover" />{c.name}</Button>)}</div><div className="mb-4 grid grid-cols-4 gap-1">{['ALL', 'ETHNIC', 'WESTERN', 'MEN'].map(c => <Button key={c} variant={category === c ? 'default' : 'outline'} size="sm" onClick={() => navigate({ search: { category: c } })} className="px-1 text-[10px]">{c}</Button>)}</div><label className="mb-6 flex items-center gap-2 rounded-md border p-3"><Search className="size-4 text-muted-foreground" /><input aria-label="Search category products" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products" className="min-w-0 w-full bg-transparent text-sm outline-none" /></label><ProductGrid items={filterProducts(query, category)} /></main></>;
}
