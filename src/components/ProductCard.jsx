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
          aria-label={`Add ${product.name} to cart`}
          title="Add to cart"
          className="group/cart flex shrink-0 items-center gap-2 rounded-full border border-[#285447] bg-[#285447] px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#fff7ed] transition hover:border-[#c96f4a] hover:bg-[#c96f4a]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-none stroke-current stroke-[1.7]"
          >
            <path d="M5 8.5h14l-1 11H6l-1-11Z" />
            <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
            <path d="M12 12v4M10 14h4" />
          </svg>
          <span>Add to cart</span>
        </button>
      </div>
    </article>
  );
}
