import tank from '@/assets/p-tank.jpg';
import pull from '@/assets/p-pullover.jpg';
import ethnic from '@/assets/p-ethnic.jpg';

export type Product = { id: string; name: string; meta: string; price: number; mrp: number; img: string; category: string; collection: string };
export const products: Product[] = [
  { id: 'tank-black', name: 'Women Solids Tank top', meta: 'S · black', price: 349, mrp: 1199, img: tank, category: 'WESTERN', collection: 'College Ready' },
  { id: 'pull-maroon', name: 'Men Solids Pullover', meta: '2XL · maroon', price: 449, mrp: 1399, img: pull, category: 'MEN', collection: 'College Ready' },
  { id: 'tank-navy', name: 'Women Solids Tank top', meta: 'M · navy', price: 349, mrp: 1199, img: tank, category: 'WESTERN', collection: 'College Ready' },
  { id: 'sweat-green', name: 'Men Solids Sweatshirt', meta: 'M · Bottle Green', price: 599, mrp: 1999, img: pull, category: 'MEN', collection: 'College Ready' },
  { id: 'trousers-white', name: 'Women Solids Trousers', meta: 'XS · white', price: 499, mrp: 1499, img: tank, category: 'WESTERN', collection: 'College Ready' },
  ...['black', 'Maroon', 'Olive', 'brown'].map((color, i) => ({ id: `pullover-${color}`, name: 'Men Solids Pullover', meta: `${['M', 'XL', 'M', 'S'][i]} · ${color}`, price: 449, mrp: 1399, img: pull, category: 'MEN', collection: 'Pull over in Style' })),
  ...['blue', 'Mauve', 'black', 'Lavender'].map((color, i) => ({ id: `suit-${color}`, name: ['Women Embroidered Suit Set', 'Women Embroidered Suit Set', 'Women Embroidered Kurta pant Set', 'Women Floral Suit Set'][i], meta: `${['M', 'XS', 'L', '2XL'][i]} · ${color}`, price: [1899, 1999, 1999, 1289][i], mrp: [4499, 4699, 4599, 6699][i], img: ethnic, category: 'ETHNIC', collection: 'Lights, Looks, Diwali' })),
];
export const categories = [
  { name: 'Festive Fashion', category: 'ETHNIC', img: ethnic },
  { name: 'Everyday Fits', category: 'WESTERN', img: tank },
  { name: "Men’s Sweatshirts", category: 'MEN', img: pull },
  { name: 'Crop Tops', category: 'WESTERN', img: tank },
  { name: 'Ethnic Fusion', category: 'ETHNIC', img: ethnic },
];
export const collections = ['College Ready', 'Pull over in Style', 'Lights, Looks, Diwali'];
export const inr = (n: number) => '₹' + n.toLocaleString('en-IN');
export function filterProducts(query = '', category = 'ALL', collection = '') {
  const term = query.trim().toLowerCase();
  return products.filter(p => (category === 'ALL' || p.category === category) && (!collection || p.collection === collection) && `${p.name} ${p.meta} ${p.collection}`.toLowerCase().includes(term));
}
export type Cart = Record<string, number>;
export function updateQuantity(cart: Cart, id: string, quantity: number): Cart {
  if (!products.some(p => p.id === id)) return cart;
  const next = { ...cart };
  if (quantity <= 0) delete next[id]; else next[id] = quantity;
  return next;
}
export function cartTotal(cart: Cart) {
  return products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);
}
