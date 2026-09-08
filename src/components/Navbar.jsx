import { Link, NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function Navbar() {
  const { count } = useCart();

  return (
    <header className="relative overflow-hidden border-b border-[#6b4637]/20 bg-[#f8e6d9]/95 text-[#3e2a22] shadow-[0_4px_18px_rgba(62,42,34,0.08)] backdrop-blur-sm">
      <div className="pointer-events-none absolute -left-5 -top-12 h-24 w-44 rounded-br-[70%] rounded-bl-[45%] bg-[#b05e4d]/80" />
      <div className="pointer-events-none absolute right-1/3 top-0 h-7 w-20 rotate-12 border-b border-dashed border-[#3e2a22]/50 opacity-70" />
      <div className="relative mx-auto flex max-w-350 items-center justify-between gap-6 px-5 py-4 md:px-10">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 font-serif text-xl font-bold tracking-[-0.04em] md:text-2xl"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#a75d4c] text-sm text-[#f8e6d9]">
            e
          </span>
          emulsion
        </Link>
        <nav className="hidden items-center gap-0 text-[10px] font-semibold tracking-[0.08em]  md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `border-r border-[#6b4637]/30 px-4 transition ${isActive ? "text-[#a75d4c]" : "hover:text-[#a75d4c]"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `border-r border-[#6b4637]/30 px-4 transition ${isActive ? "text-[#a75d4c]" : "hover:text-[#a75d4c]"}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `border-r border-[#6b4637]/30 px-4 transition ${isActive ? "text-[#a75d4c]" : "hover:text-[#a75d4c]"}`
            }
          >
            Contact
          </NavLink>
        </nav>
        <NavLink
          to="/cart"
          aria-label={`Shopping cart with ${count} items`}
          title="Shopping cart"
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-semibold tracking-[0.08em] transition ${isActive ? "border-[#a75d4c] bg-[#a75d4c] text-[#fff8f1]" : "border-[#6b4637]/40 hover:border-[#a75d4c] hover:text-[#a75d4c]"}`
          }
        >
          <span aria-hidden="true" className="text-lg leading-none">
            🛍
          </span>
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3e2a22] px-1 py-1  text-[9px] text-[#f8e6d9]">
            {count}
          </span>
        </NavLink>
      </div>
      <div className="relative flex items-center justify-center gap-5 border-t border-[#6b4637]/15 px-5 py-3 text-[10px] font-semibold tracking-[0.08em] md:hidden">
        <NavLink to="/" end className="hover:text-[#a75d4c]">
          Home
        </NavLink>
        <NavLink to="/shop" className="hover:text-[#a75d4c]">
          Shop
        </NavLink>
        <NavLink to="/contact" className="hover:text-[#a75d4c]">
          Contact
        </NavLink>
      </div>
    </header>
  );
}
