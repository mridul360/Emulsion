import { Link, useParams } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { openWhatsApp } from "../lib/whatsapp";
import { useProducts } from "../hooks/useProducts";
import { formatPrice } from "../lib/currency";

export default function ProductDetails() {
  const { productId } = useParams();
  const { products } = useProducts();
  const product = products.find((item) => item.id === Number(productId));
  const { add } = useCart();
  if (!product)
    return (
      <main className="px-5 py-32 text-center">
        <h1 className="font-serif text-5xl">Bake not found.</h1>
        <Link to="/shop" className="mt-8 inline-block underline">
          Back to the bakery
        </Link>
      </main>
    );
  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 pt-5 md:grid-cols-2 md:px-10 md:pt-10">
      <div className="aspect-square overflow-hidden bg-[#eadbc6]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <Link
          to="/shop"
          className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-55 hover:text-[#c96f4a]"
        >
          ← Back to the counter
        </Link>
        <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
          {product.category} / {product.tag}
        </p>
        <h1 className="mt-4 font-serif text-6xl leading-[0.92] tracking-tight">
          {product.name}
        </h1>
        <p className="mt-6 font-serif text-2xl">{formatPrice(product.price)}</p>
        <p className="mt-7 max-w-md text-sm leading-7 opacity-70">
          {product.description}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => add(product)}
            className="bg-[#2b241e] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white hover:bg-[#c96f4a]"
          >
            Add to order
          </button>
          <button
            onClick={() => openWhatsApp([{ ...product, quantity: 1 }])}
            className="border border-[#2b241e]/30 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] hover:border-[#c96f4a] hover:text-[#c96f4a]"
          >
            Buy now on WhatsApp ↗
          </button>
        </div>
      </div>
    </main>
  );
}
