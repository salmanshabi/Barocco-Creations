import icon from "../assets/logo/next-icon-transparent.svg";

export default function Footer() {
  return (
    <footer className="border-t border-sand/[0.08] px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
        <img src={icon} alt="NEXT." className="h-10 w-auto opacity-30" />
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-sand/10" />
          <p className="font-nippo font-medium text-[11px] uppercase tracking-[0.25em] text-cream/25">
            ⟨NEXT.⟩
          </p>
          <div className="h-px w-8 bg-sand/10" />
        </div>
        <p className="font-nippo-var text-xs font-light text-sand/25">Designing what&apos;s next</p>
        <p className="mt-2 font-nippo-var text-[9px] tracking-widest text-cream/15">
          &copy; 2026 ⟨NEXT.⟩ All rights reserved.
        </p>
      </div>
    </footer>
  );
}
