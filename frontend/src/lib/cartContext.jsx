import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export function CartProvider({ children }) {
  const [items, setItems] = useState(() =>
    JSON.parse(localStorage.getItem("mrs_cart") || "[]"),
  );
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("mrs_wishlist") || "[]"),
  );
  useEffect(
    () => localStorage.setItem("mrs_cart", JSON.stringify(items)),
    [items],
  );
  useEffect(
    () => localStorage.setItem("mrs_wishlist", JSON.stringify(wishlist)),
    [wishlist],
  );
  const add = (product, qty = 1, variant = {}) =>
    setItems((x) => {
      const key =
        product.id + "-" + (variant.size || "") + "-" + (variant.color || "");
      const old = x.find((i) => i.key === key);
      return old
        ? x.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
        : [...x, { key, product, qty, ...variant }];
    });
  const remove = (key) => setItems((x) => x.filter((i) => i.key !== key));
  const update = (key, qty) =>
    setItems((x) =>
      x.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)),
    );
  const clear = () => setItems([]);
  const toggleWish = (p) =>
    setWishlist((x) =>
      x.some((i) => i.id === p.id) ? x.filter((i) => i.id !== p.id) : [...x, p],
    );
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0),
    count = items.reduce((s, i) => s + i.qty, 0);
  const value = useMemo(
    () => ({
      items,
      add,
      remove,
      update,
      clear,
      subtotal,
      count,
      wishlist,
      toggleWish,
    }),
    [items, wishlist, subtotal, count],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
