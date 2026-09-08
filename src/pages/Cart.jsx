import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { openWhatsApp } from "../lib/whatsapp";

const initialDetails = { contact: "", address: "", note: "" };

export default function Cart() {
  const { cart, total, changeQuantity } = useCart();
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
    <main className="mx-auto max-w-5xl px-5 pb-24 pt-5 md:px-10 md:pt-10">
      <div className="border-t border-[#2b241e]/20 pt-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
          Your order
        </p>
        <h1 className="mt-3 font-serif text-6xl tracking-tight">
          Ready when you are.
        </h1>
      </div>
      {cart.length === 0 ? (
        <div className="border-b border-[#2b241e]/15 py-20 text-center">
          <p className="font-serif text-3xl">
            Your order is still a blank page.
          </p>
          <Link
            to="/shop"
            className="mt-7 inline-block bg-[#2b241e] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
          >
            Browse the bakes
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_320px]">
          <div className="divide-y divide-[#2b241e]/15">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 py-5 first:pt-0">
                <img
                  src={item.image}
                  alt=""
                  className="h-28 w-24 object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-3">
                    <Link
                      to={`/product/${item.id}`}
                      className="font-serif text-xl hover:text-[#c96f4a]"
                    >
                      {item.name}
                    </Link>
                    <p>${item.price * item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <button
                      onClick={() => changeQuantity(item.id, -1)}
                      className="h-7 w-7 border border-[#2b241e]/30"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => changeQuantity(item.id, 1)}
                      className="h-7 w-7 border border-[#2b241e]/30"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <form
              id="order-form"
              onSubmit={submitOrder}
              className="space-y-5 pt-8"
            >
              <div>
                <label
                  htmlFor="contact"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em]"
                >
                  Contact
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  value={details.contact}
                  onChange={updateDetails}
                  required
                  placeholder="Name or phone number"
                  className="w-full border-b border-[#2b241e]/30 bg-transparent px-0 py-3 text-sm outline-none placeholder:opacity-40 focus:border-[#c96f4a]"
                />
              </div>
              <div>
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
              <div>
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
          </div>
          <div className="h-fit bg-[#eadbc6] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em]">
              Order summary
            </p>
            <div className="mt-7 flex justify-between font-serif text-2xl">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <p className="mt-4 text-xs leading-5 opacity-65">
              Add your details, then we’ll confirm availability and pickup time
              on WhatsApp.
            </p>
            <button
              type="submit"
              form="order-form"
              className="mt-7 w-full bg-[#25d366] py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white hover:bg-[#1daf55]"
            >
              Buy now on WhatsApp ↗
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
