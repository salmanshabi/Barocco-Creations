const items = [
  "Graphic Design",
  "Brand Identity",
  "UI/UX",
  "Web Development",
  "Designing what's next",
  "⟨NEXT.⟩",
];

export default function Marquee() {
  const text = items.map((t) => t + " \u2715 ").join("");

  return (
    <div className="w-full overflow-hidden border-t border-sand/[0.08] py-5">
      <div className="animate-marquee flex whitespace-nowrap font-nippo-var text-[9px] uppercase tracking-[0.35em] text-sand/25">
        <span className="pr-6">{text}</span>
        <span className="pr-6">{text}</span>
      </div>
    </div>
  );
}
