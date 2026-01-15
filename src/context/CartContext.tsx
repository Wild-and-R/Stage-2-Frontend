import { createContext, useContext } from "react";
import type { CartItem } from "../types/cartitem";

export type CartContextType = {
  cart: CartItem[];
  loadingIds: number[];
  addToCart: (
    product: Omit<CartItem, "quantity">,
    quantity?: number
  ) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

