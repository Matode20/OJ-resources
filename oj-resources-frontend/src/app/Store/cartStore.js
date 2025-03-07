import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        })),
      updateQuantity: (productId, newQuantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item._id === productId
              ? { ...item, quantity: Math.max(1, newQuantity) }
              : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
