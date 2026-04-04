import { motion } from "framer-motion";
import icon from "../assets/logo/next-icon-transparent.svg";
import Marquee from "./Marquee";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.6 + i * 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex w-full min-h-screen flex-col justify-between overflow-hidden">
      {/* Angular X-grid background */}
      <div className="pointer-events-none absolute inset-0">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(200,168,130,0.03)" strokeWidth="0.5" />
              <path d="M 20 20 L 40 40 L 60 20 M 20 60 L 40 40 L 60 60" fill="none" stroke="rgba(200,168,130,0.015)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Thin accent lines */}
      <div className="pointer-events-none absolute top-0 left-[15%] h-full w-px bg-sand/[0.06]" />
      <div className="pointer-events-none absolute top-0 right-[15%] h-full w-px bg-sand/[0.06]" />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-24">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mb-10"
        >
          {/* Angular bracket frame */}
          <div className="absolute inset-[-40px]" style={{ animation: "spin-slow 40s linear infinite" }}>
            {/* Top-left bracket */}
            <div className="absolute top-0 left-0 h-7 w-7 border-t border-l border-sand/[0.15]" />
            {/* Top-right bracket */}
            <div className="absolute top-0 right-0 h-7 w-7 border-t border-r border-sand/[0.15]" />
            {/* Bottom-left bracket */}
            <div className="absolute bottom-0 left-0 h-7 w-7 border-b border-l border-sand/[0.15]" />
            {/* Bottom-right bracket */}
            <div className="absolute bottom-0 right-0 h-7 w-7 border-b border-r border-sand/[0.15]" />
            {/* Orbiting dot */}
            <div className="absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sand/40" />
          </div>

          <img
            src={icon}
            alt="NEXT. icon"
            className="h-44 w-auto object-contain drop-shadow-[0_0_40px_rgba(200,168,130,0.12)] md:h-56"
            style={{ animation: "float 6s ease-in-out infinite" }}
          />
        </motion.div>

        {/* Typography stack */}
        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-nippo font-medium text-[clamp(1.2rem,3vw,2.2rem)] leading-[1.1] tracking-[0.05em] text-cream/80 text-center"
        >
          Designing what&apos;s next
        </motion.h1>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-5 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 w-full"
        >
          <span className="hidden md:block h-px w-8 bg-sand/30" />
          <p className="font-nippo-var text-[clamp(0.7rem,1.5vw,0.85rem)] font-light uppercase tracking-[0.35em] text-slate/80 text-center leading-relaxed max-w-[280px] md:max-w-none mx-auto">
            Graphic Design &amp; Web Development
          </p>
          <span className="hidden md:block h-px w-8 bg-sand/30" />
        </motion.div>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-5 font-nippo-var text-[clamp(1.3rem,3vw,2rem)] text-sand/50 text-center"
        >
          Where creativity meets code
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-14 flex flex-wrap items-center justify-center gap-5"
        >
          <button
            onClick={() => scrollTo("#work")}
            className="group relative overflow-hidden border border-sand bg-sand px-8 py-3.5 font-nippo-var text-xs font-medium uppercase tracking-[0.2em] text-olive-dark transition-all duration-300 hover:bg-transparent hover:text-sand"
          >
            View Work
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="border border-sand/30 px-8 py-3.5 font-nippo-var text-xs font-medium uppercase tracking-[0.2em] text-sand/70 transition-all duration-300 hover:border-sand hover:text-sand"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>

      {/* Bottom section marker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="relative z-10 mb-4 flex flex-col items-center gap-3"
      >
        <span className="font-nippo-var text-[9px] uppercase tracking-[0.4em] text-sand/25">
          Scroll
        </span>
        <div className="h-8 w-px bg-sand/15" style={{ animation: "pulse-line 2s ease-in-out infinite" }} />
      </motion.div>

      {/* Marquee */}
      <div className="relative z-10">
        <Marquee />
      </div>
    </section>
  );
}
