import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-32 text-center">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
        404 / Gone from the oven
      </p>
      <h1 className="mt-4 font-serif text-6xl">That page cooled off.</h1>
      <Link
        to="/"
        className="mt-8 inline-block bg-[#2b241e] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
      >
        Back home
      </Link>
    </main>
  );
}
