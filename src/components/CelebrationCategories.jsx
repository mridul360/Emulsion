import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

const categoryDetails = {
  Birthday: {
    description: "Layer cakes and candle-ready treats",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
  },
  Anniversary: {
    description: "Sweet details for another year together",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=85",
  },
  Marriage: {
    description: "Dessert tables for the whole celebration",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",
  },
  Holud: {
    description: "Bright, joyful bakes for your holud day",
    image:
      "https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=900&q=85",
  },
  Gifts: {
    description: "Beautiful boxes made for sending a little joy",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85",
  },
};

export default function CelebrationCategories() {
  const { categories } = useProducts();
  return (
    <section className="mx-auto max-w-350 px-5 pb-20 md:px-10 md:pb-28">
      <div className="border-t border-[#2b241e]/20 pt-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
          02 / Celebrate beautifully
        </p>
        <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="font-serif text-5xl tracking-tight">
            Find your occasion
          </h2>
          <p className="max-w-xs text-sm leading-6 opacity-60">
            Thoughtful cakes and sweet tables for the moments worth gathering
            around.
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {categories.slice(1).map((category, index) => (
          (() => {
            const details = categoryDetails[category] || {
              description: `Thoughtful treats for your ${category.toLowerCase()} celebration`,
              image:
                "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85",
            };
            return (
          <Link
            key={category}
            to={`/shop?category=${encodeURIComponent(category)}`}
            className="group relative flex min-h-64 overflow-hidden text-[#fff7ed] transition hover:-translate-y-1 md:min-h-80"
          >
            <img
              src={details.image}
              alt={`${category} celebration desserts`}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#2b241e]/45 transition group-hover:bg-[#2b241e]/30" />
            <div className="relative flex h-full w-full flex-col justify-between p-5 md:p-7">
              <span className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em]">
                <span>0{index + 1} / Occasion</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/60 text-base transition group-hover:bg-[#f3c877] group-hover:text-[#285447]">
                  ↗
                </span>
              </span>
              <span>
                <span className="block font-serif text-3xl leading-none md:text-4xl">
                  {category}
                </span>
                <span className="mt-3 block max-w-48 text-xs leading-5 text-white/80">
                    {details.description}
                </span>
              </span>
            </div>
          </Link>
            );
          })()
        ))}
      </div>
    </section>
  );
}
