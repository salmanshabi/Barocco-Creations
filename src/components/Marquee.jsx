const items = [
  "Graphic Design",
  "Brand Identity",
  "UI/UX",
  "Web Development",
  "Art meets function",
  "Barocco Creations",
];

export default function Marquee() {
  const text = items.map((t) => t + " \u00B7 ").join("");

  return (
    <div className="w-full overflow-hidden border-t border-sand/[0.08] py-5">
      <div className="animate-marquee flex whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.35em] text-sand/25">
        <span className="pr-6">{text}</span>
        <span className="pr-6">{text}</span>
      </div>
    </div>
  );
}
