import { useState } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../types/cartitem";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = async (
    product: Omit<CartItem, "quantity">,
    quantity: number = 1
  ) => {
    //Optimistic Update
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
      // Simulate server update with delay
      await new Promise((res) => setTimeout(res, 200));
    } catch (error) {
      console.error("Failed to update server, rolling back:", error);

      // Rollback on error
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (!existing) return prev;

        const newQuantity = existing.quantity - quantity;
        if (newQuantity <= 0) {
          return prev.filter((item) => item.id !== product.id);
        }
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      });
    }
  };

  const removeFromCart = async (id: number) => {
    const previousCart = [...cart];

    // Optimistic removal
    setCart((prev) => prev.filter((item) => item.id !== id));

    try {
      await new Promise((res) => setTimeout(res, 200));
    } catch (error) {
      console.error("Failed to remove item, rolling back:", error);
      setCart(previousCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}