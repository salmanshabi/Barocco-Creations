import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

const designSkills = [
  "Brand Identity",
  "Logo Design",
  "Typography",
  "UI/UX",
  "Print Design",
  "Illustration",
  "Figma",
  "Adobe Suite",
];

const devSkills = [
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "REST APIs",
  "Framer Motion",
];

const fadeInView = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      {/* Side accent line */}
      <div className="pointer-events-none absolute top-0 left-[15%] h-full w-px bg-sand/[0.06] hidden lg:block" />

      <div className="mx-auto max-w-5xl">
        <SectionLabel>[ About ]</SectionLabel>

        <div className="grid gap-20 md:grid-cols-[1.2fr_1fr]">
          {/* Bio */}
          <motion.div
            variants={fadeInView}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="font-cormorant text-[clamp(1.8rem,4vw,2.8rem)] font-light leading-[1.15] text-cream/90">
              A studio at the intersection of art and function
            </h2>
            <p className="mt-6 font-jost text-[15px] font-light leading-[1.8] text-cream/45">
              Barocco Creations crafts brand identities, digital experiences, and
              full-stack web solutions that are as beautiful as they are
              purposeful. Every project is an exercise in precision — where baroque
              warmth meets contemporary clarity.
            </p>

            {/* Available badge */}
            <div className="mt-10 inline-flex items-center gap-3 border border-sand/15 px-5 py-2.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sand opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sand" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-sand/60">
                Available for projects
              </span>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={fadeInView}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 gap-10"
          >
            <div>
              <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-slate/60">
                Design
              </h3>
              <div className="space-y-3">
                {designSkills.map((s) => (
                  <p key={s} className="font-jost text-[13px] font-light text-cream/35">
                    {s}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-slate/60">
                Development
              </h3>
              <div className="space-y-3">
                {devSkills.map((s) => (
                  <p key={s} className="font-jost text-[13px] font-light text-cream/35">
                    {s}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative rule */}
        <div className="mt-24 flex items-center gap-4">
          <div className="h-px flex-1 bg-sand/10" />
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-sand/20">BC</span>
          <div className="h-px flex-1 bg-sand/10" />
        </div>
      </div>
    </section>
  );
}
