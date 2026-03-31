import { motion } from "framer-motion";

/**
 * Self-drawing baroque ornamental flourish divider.
 * Uses SVG stroke-dashoffset animation for the "drawing" effect.
 */
export default function BaroqueOrnament({ color = "#8b2d4f", delay = 0 }) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: "easeInOut", delay },
        opacity: { duration: 0.5, delay },
      },
    },
  };

  return (
    <div className="flex items-center justify-center py-8">
      <svg
        viewBox="0 0 600 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-xl"
        style={{ overflow: "visible" }}
      >
        {/* Left flourish — mirrored scroll */}
        <motion.path
          d="M300 30 C280 30, 260 10, 230 12 C200 14, 190 30, 160 28 C130 26, 125 10, 100 12 C75 14, 70 30, 50 28 C30 26, 20 18, 10 20"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        />
        {/* Left lower curl */}
        <motion.path
          d="M300 30 C280 30, 260 50, 230 48 C200 46, 190 30, 170 32 C150 34, 140 48, 120 46 C100 44, 90 32, 70 34"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity={0.5}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        />

        {/* Right flourish — mirrored scroll */}
        <motion.path
          d="M300 30 C320 30, 340 10, 370 12 C400 14, 410 30, 440 28 C470 26, 475 10, 500 12 C525 14, 530 30, 550 28 C570 26, 580 18, 590 20"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        />
        {/* Right lower curl */}
        <motion.path
          d="M300 30 C320 30, 340 50, 370 48 C400 46, 410 30, 430 32 C450 34, 460 48, 480 46 C500 44, 510 32, 530 34"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity={0.5}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        />

        {/* Center diamond ornament */}
        <motion.path
          d="M300 18 L308 30 L300 42 L292 30 Z"
          stroke={color}
          strokeWidth="1"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        />
        {/* Inner diamond */}
        <motion.path
          d="M300 23 L305 30 L300 37 L295 30 Z"
          stroke={color}
          strokeWidth="0.8"
          fill="none"
          opacity={0.6}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 0.6,
              transition: {
                pathLength: { duration: 1.5, ease: "easeInOut", delay: delay + 1 },
                opacity: { duration: 0.5, delay: delay + 1 },
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        />
      </svg>
    </div>
  );
}
