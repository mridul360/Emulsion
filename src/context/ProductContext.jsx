import { useCallback, useMemo, useState } from "react";
import { categories as initialCategories, products as initialProducts } from "../data/products";
import { ProductContext } from "./product-context";

const STORAGE_KEY = "emulsion-products";
const CATEGORY_STORAGE_KEY = "emulsion-categories";

function loadProducts() {
  try {
    const savedProducts = window.localStorage.getItem(STORAGE_KEY);
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  } catch {
    return initialProducts;
  }
}

function loadCategories() {
  try {
    const savedCategories = window.localStorage.getItem(CATEGORY_STORAGE_KEY);
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  } catch {
    return initialCategories;
  }
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(loadProducts);
  const [categories, setCategories] = useState(loadCategories);

  const addProduct = useCallback((product) => {
    const nextProduct = { ...product, id: Date.now(), price: Number(product.price), available: true };
    setProducts((currentProducts) => {
      const nextProducts = [...currentProducts, nextProduct];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
      return nextProducts;
    });
    return nextProduct;
  }, []);

  const addCategory = useCallback((category) => {
    const nextCategory = category.trim();
    if (!nextCategory || categories.includes(nextCategory)) return false;
    setCategories((currentCategories) => {
      const nextCategories = [...currentCategories, nextCategory];
      window.localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(nextCategories));
      return nextCategories;
    });
    return true;
  }, [categories]);

  const removeProduct = useCallback((id) => {
    setProducts((currentProducts) => {
      const nextProducts = currentProducts.filter((product) => product.id !== id);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
      return nextProducts;
    });
  }, []);

  const updateProductAvailability = useCallback((id, available) => {
    setProducts((currentProducts) => {
      const nextProducts = currentProducts.map((product) =>
        product.id === id ? { ...product, available } : product,
      );
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
      return nextProducts;
    });
  }, []);

  const value = useMemo(
    () => ({ products, categories, addProduct, addCategory, removeProduct, updateProductAvailability }),
    [products, categories, addProduct, addCategory, removeProduct, updateProductAvailability],
  );
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
