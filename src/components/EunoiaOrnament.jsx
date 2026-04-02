import { motion } from "framer-motion";

/**
 * Studio Eunoia — olive branch divider.
 * A symmetrical olive branch motif flanking a centre gem/leaf mark,
 * matching the brand's gold olive branch monogram.
 */
export default function EunoiaOrnament({ color = "rgba(196,162,101,0.75)", delay = 0.3 }) {
  return (
    <div className="my-8 flex items-center justify-center gap-3">
      {/* Left olive branch */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="origin-right"
        style={{ flex: "1 1 0" }}
      >
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="h-5 w-full">
          <path
            d="M0,10 L200,10"
            fill="none"
            stroke={color}
            strokeWidth="1.2"
          />
          {/* Leaves along the branch */}
          <ellipse cx="170" cy="7" rx="6" ry="3" fill="none" stroke={color} strokeWidth="1.2" transform="rotate(-20 170 7)" />
          <ellipse cx="155" cy="13" rx="5" ry="2.5" fill="none" stroke={color} strokeWidth="1.1" transform="rotate(15 155 13)" />
          <ellipse cx="140" cy="7.5" rx="4.5" ry="2" fill="none" stroke={color} strokeWidth="1.0" transform="rotate(-15 140 7.5)" />
          <ellipse cx="126" cy="13" rx="4" ry="2" fill="none" stroke={color} strokeWidth="0.9" transform="rotate(15 126 13)" />
          <ellipse cx="113" cy="7" rx="3.5" ry="1.8" fill="none" stroke={color} strokeWidth="0.8" transform="rotate(-12 113 7)" />
        </svg>
      </motion.div>

      {/* Centre olive/gem motif */}
      <motion.svg
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.15, ease: "backOut" }}
        width="28"
        height="28"
        viewBox="0 0 20 20"
        className="shrink-0"
      >
        {/* Outer glow ring */}
        <motion.circle
          cx="10" cy="10" r="9"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity={0.4}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Leaf/gem shape */}
        <path
          d="M10,2 Q16,6 16,10 Q16,16 10,18 Q4,16 4,10 Q4,6 10,2 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
        />
        {/* Centre vein */}
        <line x1="10" y1="4" x2="10" y2="16" stroke={color} strokeWidth="0.7" opacity="0.8" />
        {/* Side veins */}
        <path d="M10,7 Q7,9 6,10" fill="none" stroke={color} strokeWidth="0.6" opacity="0.7" />
        <path d="M10,7 Q13,9 14,10" fill="none" stroke={color} strokeWidth="0.6" opacity="0.7" />
        <path d="M10,10 Q7,12 6,13" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
        <path d="M10,10 Q13,12 14,13" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
      </motion.svg>

      {/* Right olive branch */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="origin-left"
        style={{ flex: "1 1 0" }}
      >
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="h-5 w-full">
          <path
            d="M0,10 L200,10"
            fill="none"
            stroke={color}
            strokeWidth="1.2"
          />
          <ellipse cx="30" cy="7" rx="6" ry="3" fill="none" stroke={color} strokeWidth="1.2" transform="rotate(20 30 7)" />
          <ellipse cx="45" cy="13" rx="5" ry="2.5" fill="none" stroke={color} strokeWidth="1.1" transform="rotate(-15 45 13)" />
          <ellipse cx="60" cy="7.5" rx="4.5" ry="2" fill="none" stroke={color} strokeWidth="1.0" transform="rotate(15 60 7.5)" />
          <ellipse cx="74" cy="13" rx="4" ry="2" fill="none" stroke={color} strokeWidth="0.9" transform="rotate(-15 74 13)" />
          <ellipse cx="87" cy="7" rx="3.5" ry="1.8" fill="none" stroke={color} strokeWidth="0.8" transform="rotate(12 87 7)" />
        </svg>
      </motion.div>
    </div>
  );
}
