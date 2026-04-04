import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "./SectionLabel";

const steps = [
  { num: "01", title: "Discover", desc: "Deep dive into your brand, goals, and audience" },
  { num: "02", title: "Design", desc: "Crafting visual systems with intention and precision" },
  { num: "03", title: "Develop", desc: "Building robust, performant digital experiences" },
  { num: "04", title: "Deliver", desc: "Launching polished work that performs and endures" },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>⟨ Process ⟩</SectionLabel>

        <div ref={ref} className="relative mt-20">
          {/* Connecting line */}
          <div className="absolute top-14 right-0 left-0 hidden h-px bg-sand/[0.06] md:block">
            <motion.div
              className="h-full bg-gradient-to-r from-sand/40 via-sand/20 to-sand/40"
              initial={{ width: "0%" }}
              animate={inView ? { width: "100%" } : {}}
              transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>

          <div className="grid gap-16 md:grid-cols-4 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.4 + i * 0.25,
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="relative text-center"
              >
                {/* Step diamond on line */}
                <div className="mx-auto mb-6 hidden h-3 w-3 items-center justify-center md:flex">
                  <div className="h-2 w-2 rotate-45 bg-sand/40" />
                </div>

                <p className="font-nippo-var text-[3.5rem] font-light leading-none text-sand/15 md:text-[4rem]">
                  {step.num}
                </p>
                <h3 className="mt-2 font-nippo font-medium text-xl tracking-wide text-cream/80">
                  {step.title}
                </h3>
                <p className="mt-3 font-nippo-var text-[13px] font-light leading-relaxed text-cream/35">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
