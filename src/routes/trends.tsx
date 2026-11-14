import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { PageHeader, ProductGrid } from '@/components/shop/ui';
import { collections, filterProducts } from '@/components/shop/catalog';
export const Route = createFileRoute('/trends')({
  validateSearch: (search: Record<string, unknown>): { collection?: string } => ({ collection: typeof search.collection === 'string' ? search.collection : undefined }),
  head: () => ({ meta: [{ title: 'Trending collections — Parqis' }, { name: 'description', content: 'Discover college-ready outfits, pullovers and festive looks.' }, { property: 'og:title', content: 'Trending collections — Parqis' }, { property: 'og:description', content: 'Shop the latest Parqis collections.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }), component: Trends,
});
function Trends() { const { collection } = Route.useSearch(); return <><PageHeader title="Trends" /><main className="page-enter px-4 py-6"><div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto"><Button asChild variant={!collection ? 'default' : 'outline'} size="sm"><Link to="/trends" search={{ collection: undefined }}>All looks</Link></Button>{collections.map(c => <Button key={c} asChild variant={collection === c ? 'default' : 'outline'} size="sm"><Link to="/trends" search={{ collection: c }}>{c}</Link></Button>)}</div><h2 className="mb-4 text-lg font-medium">{collection || 'Trending now'}</h2><ProductGrid items={filterProducts('', 'ALL', collection)} /></main></>; }
