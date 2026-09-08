import { useState } from "react";

const contactItems = [
  {
    label: "Visit the bakery",
    value: "18 Rose Street",
    detail: "Tuesday - Sunday, 7am - 3pm",
  },
  {
    label: "Call or WhatsApp",
    value: "+1 555 123 4567",
    detail: "For custom orders and pickup times",
  },
  {
    label: "Write to us",
    value: "hello@emulsionbakery.com",
    detail: "We usually reply within one working day",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="mx-auto max-w-350 px-5 pb-24 md:px-10">
      <section className="grid gap-10 border-t border-[#2b241e]/20 pt-8 md:grid-cols-[1.05fr_0.95fr] md:gap-20">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
            Contact us
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[0.94] tracking-tighter sm:text-6xl md:text-8xl">
            Let&apos;s make something <em>worth sharing.</em>
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 opacity-70">
            Need a celebration cake, a dessert table, or just a warm loaf for
            tomorrow morning? We would love to hear from you.
          </p>
          <a
            href="https://wa.me/8801972086115"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex bg-[#25d366] px-5 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#1daf55]"
          >
            Message us on WhatsApp ↗
          </a>
        </div>
        <div className="bg-[#eadbc6] p-7 md:p-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
            Come say hello
          </p>
          <div className="mt-8 space-y-7">
            {contactItems.map((item) => (
              <div key={item.label} className="border-b border-[#2b241e]/15 pb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-55">
                  {item.label}
                </p>
                <p className="mt-2 font-serif text-2xl">{item.value}</p>
                <p className="mt-1 text-sm opacity-60">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 grid gap-10 border-t border-[#2b241e]/20 pt-8 md:grid-cols-2 md:gap-20">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
            Send a note
          </p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
            Tell us what you&apos;re planning.
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="contact-name"
              className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em]"
            >
              Your name
            </label>
            <input
              id="contact-name"
              required
              className="w-full border-b border-[#2b241e]/30 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#c96f4a]"
              placeholder="Full name"
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em]"
            >
              Email or phone
            </label>
            <input
              id="contact-email"
              required
              className="w-full border-b border-[#2b241e]/30 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#c96f4a]"
              placeholder="How can we reach you?"
            />
          </div>
          <div>
            <label
              htmlFor="contact-message"
              className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em]"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows="4"
              className="w-full resize-none border-b border-[#2b241e]/30 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#c96f4a]"
              placeholder="Tell us about your occasion"
            />
          </div>
          <button
            type="submit"
            className="bg-[#2b241e] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#c96f4a]"
          >
            {submitted ? "Message noted" : "Send your note ↗"}
          </button>
        </form>
      </section>
    </main>
  );
}
