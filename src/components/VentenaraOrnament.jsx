import { motion } from "framer-motion";

/**
 * Ventenara — ornate crest divider.
 * A symmetrical gold filigree with a central diamond and radiating
 * scrollwork, evoking antique heritage and royal insignia.
 */
export default function VentenaraOrnament({ color = "rgba(201,168,76,0.5)", delay = 0.3 }) {
  return (
    <div className="my-8 flex items-center justify-center gap-3">
      {/* Left filigree line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="origin-right"
        style={{ flex: "1 1 0" }}
      >
        <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="h-3 w-full">
          <line x1="0" y1="6" x2="200" y2="6" stroke={color} strokeWidth="0.5" />
          {/* Small diamonds along the line */}
          <polygon points="180,6 185,3 190,6 185,9" fill={color} opacity="0.6" />
          <polygon points="160,6 163,4.5 166,6 163,7.5" fill={color} opacity="0.3" />
        </svg>
      </motion.div>

      {/* Central crest motif */}
      <motion.svg
        initial={{ scale: 0, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.15, ease: "backOut" }}
        width="28"
        height="28"
        viewBox="0 0 28 28"
        className="shrink-0"
      >
        {/* Outer diamond */}
        <polygon
          points="14,2 26,14 14,26 2,14"
          fill="none"
          stroke={color}
          strokeWidth="0.6"
        />
        {/* Inner diamond */}
        <polygon
          points="14,7 21,14 14,21 7,14"
          fill="none"
          stroke={color}
          strokeWidth="0.4"
          opacity="0.6"
        />
        {/* Centre dot */}
        <circle cx="14" cy="14" r="1.5" fill={color} opacity="0.5" />
        {/* Cross lines */}
        <line x1="14" y1="4" x2="14" y2="9" stroke={color} strokeWidth="0.3" opacity="0.4" />
        <line x1="14" y1="19" x2="14" y2="24" stroke={color} strokeWidth="0.3" opacity="0.4" />
        <line x1="4" y1="14" x2="9" y2="14" stroke={color} strokeWidth="0.3" opacity="0.4" />
        <line x1="19" y1="14" x2="24" y2="14" stroke={color} strokeWidth="0.3" opacity="0.4" />
      </motion.svg>

      {/* Right filigree line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="origin-left"
        style={{ flex: "1 1 0" }}
      >
        <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="h-3 w-full">
          <line x1="0" y1="6" x2="200" y2="6" stroke={color} strokeWidth="0.5" />
          <polygon points="10,6 15,3 20,6 15,9" fill={color} opacity="0.6" />
          <polygon points="34,6 37,4.5 40,6 37,7.5" fill={color} opacity="0.3" />
        </svg>
      </motion.div>
    </div>
  );
}
