import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Cart, updateQuantity } from './catalog';

type ShopState = { cart: Cart; wishlist: string[]; address: string; setAddress: (address: string) => void; add: (id: string) => void; quantity: (id: string, amount: number) => void; toggleWish: (id: string) => void; notice: string };
const ShopContext = createContext<ShopState | null>(null);
export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [notice, setNotice] = useState('');
  function announce(text: string) { setNotice(text); }
  return <ShopContext.Provider value={{ cart, wishlist, address, setAddress, notice,
    add: id => { setCart(c => updateQuantity(c, id, (c[id] || 0) + 1)); announce('Added to cart'); },
    quantity: (id, amount) => setCart(c => updateQuantity(c, id, amount)),
    toggleWish: id => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]),
  }}>{children}</ShopContext.Provider>;
}
export function useShop() { const state = useContext(ShopContext); if (!state) throw new Error('ShopProvider is required'); return state; }
