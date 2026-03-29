import monogram from "../assets/logo/favicon3.png";

export default function Footer() {
  return (
    <footer className="border-t border-sand/[0.08] px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
        <img src={monogram} alt="BC" className="h-8 w-auto opacity-40" />
        <p className="font-jost text-[11px] uppercase tracking-[0.25em] text-cream/25">
          Barocco Creations
        </p>
        <p className="font-pinyon text-base text-sand/25">Art meets function</p>
        <p className="mt-2 font-mono text-[9px] tracking-widest text-cream/15">
          &copy; 2025 Barocco Creations. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
