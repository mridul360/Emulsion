import { Link } from "react-router-dom";
import CelebrationCategories from "../components/CelebrationCategories";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function Home() {
  const { products } = useProducts();
  return (
    <main>
      <section className="mx-auto grid max-w-350 gap-5 px-5 pb-16 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:pb-24">
        <div className="flex min-h-132.5 flex-col justify-between bg-[#285447] p-7 text-[#fff7ed] md:min-h-160 md:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em]">
            Emulsion bakery / Est. 2020
          </p>
          <div>
            <h1 className="max-w-xl font-serif text-5xl leading-[0.9] tracking-tighter sm:text-6xl md:text-8xl">
              Good bread, <em>good days.</em>
            </h1>
            <p className="mt-7 max-w-sm text-sm leading-6 text-[#fff7ed]/75">
              Slow-fermented loaves, bright pastries, and cakes made for
              sharing. Baked fresh in small batches every morning.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex border border-[#fff7ed]/50 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:bg-[#fff7ed] hover:text-[#285447]"
            >
              Shop today’s bakes <span className="ml-6">↗</span>
            </Link>
          </div>
        </div>
        <div className="relative min-h-112 overflow-hidden bg-[#d5ad8e] md:min-h-160">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85"
            alt="Fresh rustic bread loaves"
            className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
          />
          <p className="absolute bottom-6 left-6 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Made with time / shared with love
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-350 px-5 pb-20 md:px-10 md:pb-28">
        <div className="border-t border-[#2b241e]/20 pt-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
            01 / The counter
          </p>
          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">
              Today’s favorites
            </h2>
            <Link
              to="/shop"
              className="text-[10px] font-bold uppercase tracking-[0.18em] underline underline-offset-8"
            >
              See all bakes ↗
            </Link>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <CelebrationCategories />
      <section className="grid bg-[#eadbc6] md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 md:p-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
            03 / Made properly
          </p>
          <h2 className="mt-5 max-w-md font-serif text-4xl leading-[0.98] tracking-tighter sm:text-5xl md:text-7xl">
            The long way is the <em>right</em> way.
          </h2>
          <p className="mt-7 max-w-sm text-sm leading-6 opacity-70">
            Our dough rests overnight, our fruit is chosen at its ripest, and
            every bake leaves our kitchen by hand.
          </p>
          <Link
            to="/about"
            className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] underline underline-offset-8"
          >
            Meet the bakers ↗
          </Link>
        </div>
        <img
          className="h-105 w-full object-cover md:h-140"
          src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=85"
          alt="Baker preparing fresh dough"
        />
      </section>
    </main>
  );
}
