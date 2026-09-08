import { useEffect, useMemo, useState } from "react";
import { CartContext } from "./cart-context";

const CART_STORAGE_KEY = "emulsion-cart";

function loadCart() {
  try {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      count: cart.reduce((sum, item) => sum + item.quantity, 0),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      add(product) {
        setCart((current) => {
          const existing = current.find((item) => item.id === product.id);
          return existing
            ? current.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              )
            : [...current, { ...product, quantity: 1 }];
        });
      },
      changeQuantity(id, amount) {
        setCart((current) =>
          current
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity + amount }
                : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },
      removeItem(id) {
        setCart((current) => current.filter((item) => item.id !== id));
      },
    }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
