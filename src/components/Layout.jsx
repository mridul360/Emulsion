import { Link, NavLink, Outlet } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function Layout() {
  const { count } = useCart();
  return (
    <div className="min-h-screen bg-[#f7f1e7] text-[#2b241e]">
      <div className="bg-[#c96f4a] px-5 py-2 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#fff7ed]">
        Baked fresh every morning <span className="mx-2 opacity-60">•</span>{" "}
        Order by 11am for same-day pickup
      </div>
      <header className="mx-auto flex max-w-350 items-center justify-between px-5 py-5 md:px-10">
        <Link to="/" className="font-serif text-3xl italic tracking-[-0.06em]">
          emulsion<span className="text-[#c96f4a]">.</span>
        </Link>
        <nav className="hidden items-center gap-7 text-[10px] font-bold uppercase tracking-[0.18em] md:flex">
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? "text-[#c96f4a]" : "hover:text-[#c96f4a]"
            }
          >
            The bakery
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-[#c96f4a]" : "hover:text-[#c96f4a]"
            }
          >
            Our story
          </NavLink>
        </nav>
        <NavLink
          to="/cart"
          className="text-[10px] font-bold uppercase tracking-[0.18em] hover:text-[#c96f4a]"
        >
          Order{" "}
          <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2b241e] px-1 text-[9px] text-white">
            {count}
          </span>
        </NavLink>
      </header>
      <Outlet />
      <footer className="border-t border-[#2b241e]/15 px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-350 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link
              to="/"
              className="font-serif text-3xl italic tracking-[-0.06em]"
            >
              emulsion<span className="text-[#c96f4a]">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 opacity-65">
              A neighborhood bakery for slow mornings, warm loaves, and little
              celebrations.
            </p>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em]">
              Visit us
            </p>
            <p className="text-sm leading-6 opacity-65">
              18 Rose Street
              <br />
              Tuesday – Sunday, 7am – 3pm
            </p>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em]">
              Questions?
            </p>
            <p className="text-sm leading-6 opacity-65">
              Message us on WhatsApp
              <br />
              for custom orders and pickup times.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
