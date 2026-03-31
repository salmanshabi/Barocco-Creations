import { motion } from "framer-motion";

/**
 * Mira Skincare — organic wave divider.
 * A soft, flowing SVG wave that draws itself in, matching the brand's
 * "bespoke wave pattern" identity element.
 */
export default function MiraWaveDivider({ color = "rgba(196,132,154,0.35)", delay = 0.3 }) {
  return (
    <div className="my-8 flex items-center justify-center gap-4">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="origin-right"
        style={{ flex: "1 1 0" }}
      >
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="h-3 w-full">
          <path
            d="M0,10 Q25,0 50,10 T100,10 T150,10 T200,10"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
          />
        </svg>
      </motion.div>

      {/* Centre petal / droplet motif */}
      <motion.svg
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2, ease: "backOut" }}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        className="shrink-0"
      >
        <path
          d="M8,1 Q12,5 12,9 A4,4 0 0,1 4,9 Q4,5 8,1 Z"
          fill="none"
          stroke={color}
          strokeWidth="0.8"
        />
      </motion.svg>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="origin-left"
        style={{ flex: "1 1 0" }}
      >
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="h-3 w-full">
          <path
            d="M0,10 Q25,20 50,10 T100,10 T150,10 T200,10"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
          />
        </svg>
      </motion.div>
    </div>
  );
}
