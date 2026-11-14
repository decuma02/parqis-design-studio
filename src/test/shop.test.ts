import { describe, it, expect } from 'vitest';
import { filterProducts, cartTotal, updateQuantity } from '@/components/shop/catalog';
describe('Shopping interactions', () => {
  it('search finds pullovers without unrelated products', () => { const results = filterProducts('pullover'); expect(results.length).toBe(5); expect(results.every(p => p.name.includes('Pullover'))).toBe(true); });
  it('category filters isolate ethnic products', () => { expect(filterProducts('', 'ETHNIC').map(p => p.id)).toEqual(['suit-blue', 'suit-Mauve', 'suit-black', 'suit-Lavender']); });
  it('quantity changes update cart totals', () => { const cart = updateQuantity({}, 'tank-black', 2); expect(cartTotal(cart)).toBe(698); expect(updateQuantity(cart, 'tank-black', 0)).toEqual({}); });
});
