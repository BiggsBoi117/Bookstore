import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((temp) => temp.bookId === item.bookId);
      const updatedCart = prevCart.map((temp) =>
        temp.bookId === item.bookId
          ? { ...temp, quantity: temp.quantity + 1 }
          : temp
      );
      return existingItem
        ? updatedCart
        : [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: number) => {
    const existingItem = cart.find((temp) => temp.bookId === bookId);
    if (existingItem && existingItem.quantity > 1) {
      setCart((prevCart) =>
        prevCart.map((temp) =>
          temp.bookId === bookId
            ? { ...temp, quantity: temp.quantity - 1 }
            : temp
        )
      );
      return;
    } else if (existingItem && existingItem.quantity === 1) {
      setCart((prevCart) => prevCart.filter((temp) => temp.bookId !== bookId));
      return;
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
