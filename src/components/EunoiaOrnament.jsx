import { motion } from "framer-motion";

/**
 * Studio Eunoia — olive branch divider.
 * A symmetrical olive branch motif flanking a centre gem/leaf mark,
 * matching the brand's gold olive branch monogram.
 */
export default function EunoiaOrnament({ color = "rgba(196,162,101,0.45)", delay = 0.3 }) {
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
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="h-4 w-full">
          <path
            d="M0,10 L200,10"
            fill="none"
            stroke={color}
            strokeWidth="0.4"
          />
          {/* Leaves along the branch */}
          <ellipse cx="170" cy="7" rx="6" ry="3" fill="none" stroke={color} strokeWidth="0.5" transform="rotate(-20 170 7)" />
          <ellipse cx="155" cy="13" rx="5" ry="2.5" fill="none" stroke={color} strokeWidth="0.5" transform="rotate(15 155 13)" />
          <ellipse cx="140" cy="7.5" rx="4.5" ry="2" fill="none" stroke={color} strokeWidth="0.4" transform="rotate(-15 140 7.5)" />
        </svg>
      </motion.div>

      {/* Centre olive/gem motif */}
      <motion.svg
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.15, ease: "backOut" }}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="shrink-0"
      >
        {/* Leaf/gem shape */}
        <path
          d="M10,2 Q16,6 16,10 Q16,16 10,18 Q4,16 4,10 Q4,6 10,2 Z"
          fill="none"
          stroke={color}
          strokeWidth="0.6"
        />
        {/* Centre vein */}
        <line x1="10" y1="4" x2="10" y2="16" stroke={color} strokeWidth="0.3" opacity="0.5" />
        {/* Side veins */}
        <path d="M10,7 Q7,9 6,10" fill="none" stroke={color} strokeWidth="0.3" opacity="0.4" />
        <path d="M10,7 Q13,9 14,10" fill="none" stroke={color} strokeWidth="0.3" opacity="0.4" />
      </motion.svg>

      {/* Right olive branch */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="origin-left"
        style={{ flex: "1 1 0" }}
      >
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="h-4 w-full">
          <path
            d="M0,10 L200,10"
            fill="none"
            stroke={color}
            strokeWidth="0.4"
          />
          <ellipse cx="30" cy="7" rx="6" ry="3" fill="none" stroke={color} strokeWidth="0.5" transform="rotate(20 30 7)" />
          <ellipse cx="45" cy="13" rx="5" ry="2.5" fill="none" stroke={color} strokeWidth="0.5" transform="rotate(-15 45 13)" />
          <ellipse cx="60" cy="7.5" rx="4.5" ry="2" fill="none" stroke={color} strokeWidth="0.4" transform="rotate(15 60 7.5)" />
        </svg>
      </motion.div>
    </div>
  );
}
