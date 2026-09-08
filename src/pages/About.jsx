export default function About() {
  return (
    <main className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10">
      <section className="grid gap-10 border-t border-[#2b241e]/20 pt-8 md:grid-cols-2 md:gap-20">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
            Our story
          </p>
          <h1 className="mt-4 font-serif text-6xl leading-[0.9] tracking-[-0.05em] md:text-8xl">
            Baked for the <em>in-between</em> moments.
          </h1>
        </div>
        <div className="flex items-end">
          <p className="max-w-md text-lg leading-8 opacity-70">
            Emulsion started with a simple belief: everyday bread can be
            extraordinary. We work with local grain, patient fermentation, and a
            lot of butter to make the kind of food you remember.
          </p>
        </div>
      </section>
      <img
        className="mt-16 h-[420px] w-full object-cover md:h-[620px]"
        src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1400&q=85"
        alt="Baker working in a warm bakery kitchen"
      />
    </main>
  );
}
