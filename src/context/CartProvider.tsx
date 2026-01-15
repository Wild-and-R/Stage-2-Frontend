import { useState } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../types/cartitem";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const addToCart = async (
    product: Omit<CartItem, "quantity">,
    quantity: number = 1
  ) => {
    // mark item as loading
    setLoadingIds((prev) => [...prev, product.id]);

    // Optimistic update
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        const newQuantity = existing.quantity + quantity;
        if (newQuantity <= 0) {
          return prev.filter((item) => item.id !== product.id);
        }
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }

      if (quantity <= 0) return prev;
      return [...prev, { ...product, quantity }];
    });

    try {
      // simulate server delay
      await new Promise((res) => setTimeout(res, 800));
    } catch (error) {
      console.error("Failed to update server, rolling back:", error);
    } finally {
      // remove loading state
      setLoadingIds((prev) => prev.filter((id) => id !== product.id));
    }
  };

  const removeFromCart = async (id: number) => {
    const previousCart = [...cart];
    setLoadingIds((prev) => [...prev, id]);

    // Optimistic removal
    setCart((prev) => prev.filter((item) => item.id !== id));

    try {
      await new Promise((res) => setTimeout(res, 800));
    } catch (error) {
      console.error("Failed to remove item, rolling back:", error);
      setCart(previousCart);
    } finally {
      setLoadingIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, loadingIds }}
    >
      {children}
    </CartContext.Provider>
  );
}
