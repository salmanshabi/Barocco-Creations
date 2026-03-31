import { motion } from "framer-motion";

/**
 * La Coco — tropical leaf divider.
 * A simple palm-leaf / coconut-themed ornamental divider
 * with a centre coconut motif flanked by curved fronds.
 */
export default function LaCocoOrnament({ color = "rgba(26,158,143,0.4)", delay = 0.3 }) {
  return (
    <div className="my-8 flex items-center justify-center gap-3">
      {/* Left frond line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="origin-right"
        style={{ flex: "1 1 0" }}
      >
        <svg viewBox="0 0 200 16" preserveAspectRatio="none" className="h-3 w-full">
          <path
            d="M0,8 Q60,2 120,8 T200,8"
            fill="none"
            stroke={color}
            strokeWidth="0.7"
          />
          <circle cx="185" cy="8" r="2" fill={color} opacity="0.5" />
        </svg>
      </motion.div>

      {/* Centre coconut / leaf motif */}
      <motion.svg
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.15, ease: "backOut" }}
        width="22"
        height="22"
        viewBox="0 0 22 22"
        className="shrink-0"
      >
        {/* Three leaves radiating from centre */}
        <path
          d="M11,3 Q14,7 11,11 Q8,7 11,3 Z"
          fill="none"
          stroke={color}
          strokeWidth="0.6"
        />
        <path
          d="M5,15 Q8,10 11,11 Q7,13 5,15 Z"
          fill="none"
          stroke={color}
          strokeWidth="0.6"
        />
        <path
          d="M17,15 Q14,10 11,11 Q15,13 17,15 Z"
          fill="none"
          stroke={color}
          strokeWidth="0.6"
        />
        <circle cx="11" cy="11" r="1.5" fill={color} opacity="0.4" />
      </motion.svg>

      {/* Right frond line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="origin-left"
        style={{ flex: "1 1 0" }}
      >
        <svg viewBox="0 0 200 16" preserveAspectRatio="none" className="h-3 w-full">
          <path
            d="M0,8 Q60,14 120,8 T200,8"
            fill="none"
            stroke={color}
            strokeWidth="0.7"
          />
          <circle cx="15" cy="8" r="2" fill={color} opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  );
}
