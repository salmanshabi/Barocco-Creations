export default function PlaceholderImage({ className = "", aspect = "4/3" }) {
  return (
    <div
      className={`relative overflow-hidden bg-olive-dark ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {/* Grid overlay */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(200,168,130,0.08)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* BC watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-nippo-var text-6xl font-light text-sand/10 select-none">
          BC
        </span>
      </div>
    </div>
  );
}
