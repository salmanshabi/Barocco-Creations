import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Splash intro — the X icon draws itself via stroke animation,
 * then fills in, the bracket frame appears, and the whole thing
 * scales up and fades out to reveal the site.
 */

const ICON_PATH =
  "M83.29 68.46L98.11 52.13V39.41H115.37V55.28L93.33 79.66L116.07 104.62V120.6H98.81V107.89L83.29 90.74M76.7 90.73L61.19 107.88V120.59H43.93V104.61L66.67 79.65L44.51 55.27V39.4H61.77V52.12L76.7 68.45";

export default function SplashIntro({ onComplete }) {
  const [phase, setPhase] = useState("draw"); // draw → fill → exit

  useEffect(() => {
    // draw stroke: 0 → 1.4s
    const fillTimer = setTimeout(() => setPhase("fill"), 1400);
    // hold filled: 1.4 → 2.4s, then exit
    const exitTimer = setTimeout(() => setPhase("exit"), 2400);
    // fully done
    const doneTimer = setTimeout(() => onComplete(), 3200);

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0, scale: 1.1 } : { opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-olive-dark"
      >
        {/* Bracket corners */}
        <motion.div
          className="absolute"
          style={{ width: 220, height: 220 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "draw" ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-sand/40" />
          <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-sand/40" />
          <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-sand/40" />
          <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-sand/40" />
        </motion.div>

        {/* SVG icon */}
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative"
        >
          {/* Stroke draw animation */}
          <motion.path
            d={ICON_PATH}
            stroke="#C8A882"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{
              pathLength: 1,
              opacity: phase === "fill" || phase === "exit" ? 0 : 1,
            }}
            transition={{
              pathLength: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
              opacity: { duration: 0.3 },
            }}
          />

          {/* Filled version fades in */}
          <motion.path
            d={ICON_PATH}
            fill="#C8A882"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "fill" || phase === "exit" ? 0.85 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </svg>

        {/* Tagline */}
        <motion.p
          className="absolute bottom-[38%] font-nippo-var text-sm tracking-[0.3em] uppercase text-sand/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: phase === "fill" || phase === "exit" ? 1 : 0,
            y: phase === "fill" || phase === "exit" ? 0 : 10,
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Designing what&apos;s next
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
