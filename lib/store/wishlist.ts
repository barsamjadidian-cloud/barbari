"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  ids: string[]; // product ids
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
  count: () => number;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const exists = get().ids.includes(id);
        if (exists) set({ ids: get().ids.filter(i => i !== id) });
        else set({ ids: [...get().ids, id] });
      },
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
      count: () => get().ids.length,
    }),
    { name: "barbari-wishlist" }
  )
);
