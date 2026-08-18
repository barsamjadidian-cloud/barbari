"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string; // productId + variantId
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  compareAt?: number;
  weight: number;
  grind: string;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  coupon: { code: string; discount: number; type: "percent" | "fixed" } | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: () => number;
  discount: () => number;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      coupon: null,
      addItem: (item) => {
        const existing = get().items.find(i => i.id === item.id);
        if (existing) {
          set({
            items: get().items.map(i => i.id === item.id ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.stock) } : i),
            isOpen: true,
          });
        } else {
          set({ items: [...get().items, item], isOpen: true });
        }
      },
      removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
      updateQty: (id, qty) => {
        if (qty <= 0) {
          get().removeItem(id);
          return;
        }
        set({ items: get().items.map(i => i.id === id ? { ...i, quantity: Math.min(qty, i.stock) } : i) });
      },
      clear: () => set({ items: [], coupon: null }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      applyCoupon: (code) => {
        // mock coupons
        const coupons: Record<string, { discount: number; type: "percent" | "fixed" }> = {
          WELCOME10: { discount: 10, type: "percent" },
          BARBARI20: { discount: 20, type: "percent" },
          SAVE5: { discount: 5, type: "fixed" },
        };
        const c = coupons[code.toUpperCase()];
        if (c) {
          set({ coupon: { code: code.toUpperCase(), ...c } });
          return true;
        }
        return false;
      },
      removeCoupon: () => set({ coupon: null }),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
      discount: () => {
        const sub = get().subtotal();
        const c = get().coupon;
        if (!c) return 0;
        if (c.type === "percent") return (sub * c.discount) / 100;
        return c.discount;
      },
      total: () => {
        const sub = get().subtotal();
        const disc = get().discount();
        const shipping = sub > 50 ? 0 : 6;
        return Math.max(0, sub - disc + shipping);
      },
      count: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: "barbari-cart" }
  )
);
