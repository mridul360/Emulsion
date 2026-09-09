import { useCallback, useEffect, useMemo, useState } from "react";
import { categories as initialCategories, products as initialProducts } from "../data/products";
import { ProductContext } from "./product-context";
import { hasSupabaseConfig, supabase } from "../lib/supabase";

const STORAGE_KEY = "emulsion-products";
const CATEGORY_STORAGE_KEY = "emulsion-categories";

function loadProductsFromStorage() {
  try {
    const savedProducts = window.localStorage.getItem(STORAGE_KEY);
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  } catch {
    return initialProducts;
  }
}

function loadCategoriesFromStorage() {
  try {
    const savedCategories = window.localStorage.getItem(CATEGORY_STORAGE_KEY);
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  } catch {
    return initialCategories;
  }
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(
    hasSupabaseConfig ? initialProducts : loadProductsFromStorage,
  );
  const [categories, setCategories] = useState(
    hasSupabaseConfig ? initialCategories : loadCategoriesFromStorage,
  );
  const [databaseError, setDatabaseError] = useState("");

  useEffect(() => {
    if (!hasSupabaseConfig) return;

    async function loadRemoteData() {
      const [productsResult, categoriesResult] = await Promise.all([
        supabase.from("products").select("*").order("created_at", { ascending: true }),
        supabase.from("categories").select("name").order("name", { ascending: true }),
      ]);

      if (productsResult.error) {
        console.error("Unable to load products from Supabase", productsResult.error);
        setDatabaseError(productsResult.error.message);
      } else if (productsResult.data.length > 0) {
        setProducts(productsResult.data);
      } else {
        setProducts([]);
      }

      if (categoriesResult.error) {
        console.error("Unable to load categories from Supabase", categoriesResult.error);
        setDatabaseError(categoriesResult.error.message);
      } else {
        setCategories(["All celebrations", ...categoriesResult.data.map((item) => item.name)]);
      }
    }

    loadRemoteData();
  }, []);

  const addProduct = useCallback((product) => {
    if (hasSupabaseConfig) {
      return supabase
        .from("products")
        .insert({ ...product, price: Number(product.price), available: true })
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          setProducts((currentProducts) => [...currentProducts, data]);
          return data;
        });
    }

    const nextProduct = { ...product, id: Date.now(), price: Number(product.price), available: true };
    setProducts((currentProducts) => {
      const nextProducts = [...currentProducts, nextProduct];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
      return nextProducts;
    });
    return nextProduct;
  }, []);

  const updateProduct = useCallback((id, product) => {
    if (hasSupabaseConfig) {
      return supabase
        .from("products")
        .update({ ...product, price: Number(product.price) })
        .eq("id", id)
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          setProducts((currentProducts) =>
            currentProducts.map((currentProduct) =>
              currentProduct.id === id ? data : currentProduct,
            ),
          );
          return data;
        });
    }

    setProducts((currentProducts) => {
      const nextProducts = currentProducts.map((currentProduct) =>
        currentProduct.id === id
          ? { ...currentProduct, ...product, price: Number(product.price) }
          : currentProduct,
      );
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
      return nextProducts;
    });
  }, []);

  const addCategory = useCallback((category) => {
    const nextCategory = category.trim();
    if (!nextCategory || categories.includes(nextCategory)) return false;

    if (hasSupabaseConfig) {
      return supabase
        .from("categories")
        .insert({ name: nextCategory })
        .select("name")
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          setCategories((currentCategories) => [...currentCategories, data.name]);
          return true;
        });
    }

    setCategories((currentCategories) => {
      const nextCategories = [...currentCategories, nextCategory];
      window.localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(nextCategories));
      return nextCategories;
    });
    return true;
  }, [categories]);

  const removeProduct = useCallback((id) => {
    if (hasSupabaseConfig) {
      return supabase
        .from("products")
        .delete()
        .eq("id", id)
        .then(({ error }) => {
          if (error) throw error;
          setProducts((currentProducts) => currentProducts.filter((product) => product.id !== id));
        });
    }

    setProducts((currentProducts) => {
      const nextProducts = currentProducts.filter((product) => product.id !== id);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
      return nextProducts;
    });
  }, []);

  const updateProductAvailability = useCallback((id, available) => {
    if (hasSupabaseConfig) {
      return supabase
        .from("products")
        .update({ available })
        .eq("id", id)
        .then(({ error }) => {
          if (error) throw error;
          setProducts((currentProducts) =>
            currentProducts.map((product) =>
              product.id === id ? { ...product, available } : product,
            ),
          );
        });
    }

    setProducts((currentProducts) => {
      const nextProducts = currentProducts.map((product) =>
        product.id === id ? { ...product, available } : product,
      );
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
      return nextProducts;
    });
  }, []);

  const value = useMemo(
    () => ({ products, categories, databaseError, addProduct, updateProduct, addCategory, removeProduct, updateProductAvailability }),
    [products, categories, databaseError, addProduct, updateProduct, addCategory, removeProduct, updateProductAvailability],
  );
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
