import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../lib/currency";
import { openWhatsApp } from "../lib/whatsapp";

const initialDetails = { name: "", phone: "", address: "", note: "" };

export default function Cart() {
  const { cart, total, changeQuantity, removeItem } = useCart();
  const [details, setDetails] = useState(initialDetails);

  function updateDetails(event) {
    const { name, value } = event.target;
    setDetails((current) => ({ ...current, [name]: value }));
  }

  function submitOrder(event) {
    event.preventDefault();
    openWhatsApp(cart, details);
  }

  return (
    <main className="mx-auto max-w-350 px-5 pb-24 pt-8 md:px-10 md:pt-12">
      <div className="border-t border-[#2b241e]/20 pt-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
          Your celebration order
        </p>
        <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h1 className="font-serif text-6xl leading-[0.9] tracking-tight md:text-8xl">
            Made to share.
          </h1>
          <p className="max-w-xs text-sm leading-6 opacity-60">
            Review your treats, add your details, and we&apos;ll confirm your
            order personally on WhatsApp.
          </p>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="mt-12 border border-dashed border-[#2b241e]/25 bg-[#eadbc6]/40 px-6 py-24 text-center">
          <span className="text-4xl">✦</span>
          <p className="mt-5 font-serif text-3xl">
            Your order is still a blank page.
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 opacity-60">
            Choose a cake, a dessert box, or something sweet for the table.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex bg-[#ffc18b] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#fffcfc]"
          >
            Browse the occasions ↗
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-3xl">Your selection</h2>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-50">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <div className="divide-y divide-[#2b241e]/15 border-y border-[#2b241e]/15">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 py-5 md:gap-6">
                  <Link
                    to={`/product/${item.id}`}
                    className="h-28 w-24 shrink-0 overflow-hidden bg-[#eadbc6] md:h-36 md:w-30"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c96f4a]">
                          {item.category}
                        </p>
                        <Link
                          to={`/product/${item.id}`}
                          className="mt-1 block font-serif text-xl leading-tight hover:text-[#c96f4a] md:text-2xl"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <p className="font-serif text-xl">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-[#2b241e]/25 text-xs">
                          <button
                            type="button"
                            onClick={() => changeQuantity(item.id, -1)}
                            className="h-8 w-8 transition hover:bg-[#eadbc6]"
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            −
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => changeQuantity(item.id, 1)}
                            className="h-8 w-8 transition hover:bg-[#eadbc6]"
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#a75d4c] underline underline-offset-4 transition hover:text-[#7e352d]"
                        >
                          Remove
                        </button>
                      </div>
                      <span className="text-xs opacity-50">
                        {formatPrice(item.price)} each
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form id="order-form" onSubmit={submitOrder} className="mt-12">
              <div className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
                  Delivery details
                </p>
                <h2 className="mt-2 font-serif text-3xl">
                  Tell us where to send the good stuff.
                </h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  value={details.name}
                  onChange={updateDetails}
                  placeholder="Your full name"
                />
                <Field
                  label="Phone number"
                  name="phone"
                  type="tel"
                  value={details.phone}
                  onChange={updateDetails}
                  placeholder="Your phone number"
                />
              </div>
              <div className="mt-6">
                <label
                  htmlFor="address"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em]"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={details.address}
                  onChange={updateDetails}
                  required
                  rows="2"
                  placeholder="Pickup or delivery address"
                  className="w-full resize-none border-b border-[#2b241e]/30 bg-transparent px-0 py-3 text-sm outline-none placeholder:opacity-40 focus:border-[#c96f4a]"
                />
              </div>
              <div className="mt-6">
                <label
                  htmlFor="note"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em]"
                >
                  Order note{" "}
                  <span className="font-normal normal-case tracking-normal opacity-50">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={details.note}
                  onChange={updateDetails}
                  rows="2"
                  placeholder="Allergies, timing, or special requests"
                  className="w-full resize-none border-b border-[#2b241e]/30 bg-transparent px-0 py-3 text-sm outline-none placeholder:opacity-40 focus:border-[#c96f4a]"
                />
              </div>
            </form>
          </section>

          <aside className="sticky top-6 bg-[#285447] p-6 text-[#fff7ed] md:p-8">
            <div className="flex items-start justify-between border-b border-[#fff7ed]/20 pb-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f3c877]">
                  Order summary
                </p>
                <p className="mt-2 text-sm text-[#fff7ed]/65">
                  Freshly prepared for you
                </p>
              </div>
              <span className="text-2xl">✦</span>
            </div>
            <div className="space-y-4 border-b border-[#fff7ed]/20 py-6 text-sm">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4 text-[#fff7ed]/75"
                >
                  <span>
                    {item.name}{" "}
                    <span className="text-xs text-[#fff7ed]/45">
                      × {item.quantity}
                    </span>
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between py-6 font-serif text-3xl">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="text-xs leading-5 text-[#fff7ed]/60">
              We&apos;ll confirm availability and pickup time with you on
              WhatsApp.
            </p>
            <button
              type="submit"
              form="order-form"
              className="mt-7 w-full bg-[#25d366] py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#1daf55]"
            >
              Buy now on WhatsApp ↗
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}

function Field({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full border-b border-[#2b241e]/30 bg-transparent px-0 py-3 text-sm outline-none placeholder:opacity-40 focus:border-[#c96f4a]"
      />
    </div>
  );
}
