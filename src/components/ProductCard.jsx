import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../lib/currency";

export default function ProductCard({ product }) {
  const { add } = useCart();
  return (
    <article className="group">
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[0.88] overflow-hidden bg-[#eadbc6]"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-[#f7f1e7] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.15em]">
          {product.tag}
        </span>
      </Link>
      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <Link
            to={`/product/${product.id}`}
            className="font-serif text-lg tracking-[-0.02em] hover:text-[#c96f4a] md:text-xl"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-[10px] uppercase tracking-[0.15em] opacity-50">
            {product.category} / {formatPrice(product.price)}
          </p>
        </div>
        <button
          onClick={() => add(product)}
          className="border-b border-[#2b241e] pb-1 text-[9px] font-bold uppercase tracking-[0.12em] transition hover:border-[#c96f4a] hover:text-[#c96f4a]"
        >
          Add +
        </button>
      </div>
    </article>
  );
}
