import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const { products, categories } = useProducts();
  const requestedCategory = searchParams.get("category");
  const initialCategory = categories.includes(requestedCategory)
    ? requestedCategory
    : "All celebrations";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const visibleProducts =
    activeCategory === "All celebrations"
      ? products.filter((product) => product.available !== false)
      : products.filter((product) => product.category === activeCategory && product.available !== false);
  return (
    <main className="mx-auto max-w-350 px-5 pb-20 md:px-10 md:pb-28">
      <div className="border-t border-[#2b241e]/20 pt-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
          Celebration bakery
        </p>
        <h1 className="mt-3 font-serif text-5xl tracking-tighter sm:text-6xl md:text-8xl">
          Made for your big moments.
        </h1>
        <p className="mt-5 max-w-md text-sm leading-6 opacity-65">
          Cakes, dessert boxes, and celebration treats for birthdays,
          anniversaries, marriages, and holud ceremonies.
        </p>
      </div>
      <div className="mt-12 flex gap-5 overflow-x-auto border-b border-[#2b241e]/15 pb-4 text-[10px] font-bold uppercase tracking-[0.16em]">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap border-b-2 pb-4 transition ${activeCategory === category ? "border-[#c96f4a] text-[#c96f4a]" : "border-transparent opacity-50 hover:opacity-100"}`}
          >
            {category}
          </button>
        ))}
      </div>
      {visibleProducts.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 md:gap-x-5 md:gap-y-16">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-10 border border-dashed border-[#2b241e]/25 px-6 py-20 text-center">
          <p className="font-serif text-3xl">No products available.</p>
          <p className="mt-3 text-sm opacity-60">
            We are preparing fresh celebration treats for this category.
          </p>
        </div>
      )}
    </main>
  );
}
