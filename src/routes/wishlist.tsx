import { createFileRoute, Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, ProductGrid } from '@/components/shop/ui';
import { useShop } from '@/components/shop/store';
import { products } from '@/components/shop/catalog';
export const Route = createFileRoute('/wishlist')({ head: () => ({ meta: [{ title: 'Wishlist — Parqis' }, { name: 'description', content: 'Your saved Parqis fashion favourites.' }, { property: 'og:title', content: 'Wishlist — Parqis' }, { property: 'og:description', content: 'Revisit your favourite outfits.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }), component: Wishlist });
function Wishlist() { const { wishlist } = useShop(); return <><PageHeader title="Wishlist" /><main className="page-enter px-4 py-6">{wishlist.length ? <ProductGrid items={products.filter(p => wishlist.includes(p.id))} /> : <div className="py-16 text-center"><Heart className="mx-auto size-12 text-muted-foreground" /><h2 className="mt-4 text-xl font-medium">No favourites yet</h2><Button asChild className="mt-5"><Link to="/categories">Discover fashion</Link></Button></div>}</main></>; }
