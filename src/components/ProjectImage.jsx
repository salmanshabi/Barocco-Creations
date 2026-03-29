const patterns = {
  "barocco-creations": (
    <>
      {/* Concentric arcs */}
      {[120, 180, 240, 300, 360].map((r) => (
        <circle
          key={r}
          cx="50%"
          cy="50%"
          r={r}
          fill="none"
          stroke="rgba(200,168,130,0.07)"
          strokeWidth="0.5"
        />
      ))}
      <path
        d="M200,100 Q350,250 200,400 Q50,250 200,100Z"
        fill="none"
        stroke="rgba(200,168,130,0.1)"
        strokeWidth="0.5"
      />
    </>
  ),
  "olive-and-stone": (
    <>
      {/* Diagonal lines */}
      {Array.from({ length: 20 }, (_, i) => (
        <line
          key={i}
          x1={i * 40 - 200}
          y1="0"
          x2={i * 40 + 200}
          y2="500"
          stroke="rgba(200,168,130,0.06)"
          strokeWidth="0.5"
        />
      ))}
    </>
  ),
  "meridian-finance": (
    <>
      {/* Dot grid */}
      {Array.from({ length: 12 }, (_, row) =>
        Array.from({ length: 16 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 40 + 20}
            cy={row * 40 + 20}
            r="1.5"
            fill="rgba(200,168,130,0.1)"
          />
        ))
      )}
    </>
  ),
  "nomad-journal": (
    <>
      {/* Horizontal typographic lines */}
      {Array.from({ length: 18 }, (_, i) => (
        <rect
          key={i}
          x="15%"
          y={i * 28 + 30}
          width={`${30 + Math.sin(i * 0.8) * 20}%`}
          height="1"
          fill="rgba(200,168,130,0.08)"
        />
      ))}
    </>
  ),
  "solis-architecture": (
    <>
      {/* Overlapping rectangles */}
      {[
        { x: "20%", y: "15%", w: "35%", h: "50%" },
        { x: "40%", y: "25%", w: "40%", h: "55%" },
        { x: "30%", y: "35%", w: "25%", h: "40%" },
      ].map((r, i) => (
        <rect
          key={i}
          x={r.x}
          y={r.y}
          width={r.w}
          height={r.h}
          fill="none"
          stroke="rgba(200,168,130,0.08)"
          strokeWidth="0.5"
        />
      ))}
    </>
  ),
  "forma-studio": (
    <>
      {/* Overlapping circles */}
      {[
        { cx: "35%", cy: "40%", r: 100 },
        { cx: "55%", cy: "35%", r: 80 },
        { cx: "45%", cy: "60%", r: 120 },
        { cx: "60%", cy: "55%", r: 60 },
      ].map((c, i) => (
        <circle
          key={i}
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          fill="none"
          stroke="rgba(200,168,130,0.07)"
          strokeWidth="0.5"
        />
      ))}
    </>
  ),
};

export default function ProjectImage({ projectId, number, className = "", aspect = "4/3" }) {
  return (
    <div
      className={`relative overflow-hidden bg-olive-dark ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 450"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {patterns[projectId] || patterns["barocco-creations"]}
      </svg>

      {/* Project number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-cormorant text-[8rem] font-light leading-none text-sand/[0.06] select-none">
          {number}
        </span>
      </div>

      {/* BC watermark bottom-right */}
      <div className="absolute right-4 bottom-4">
        <span className="font-cormorant text-sm font-light text-sand/[0.12] select-none">
          BC
        </span>
      </div>
    </div>
  );
}
