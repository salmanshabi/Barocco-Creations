import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import projects, { filterCategories } from "../data/projects";
import SectionLabel from "./SectionLabel";
import ProjectImage from "./ProjectImage";

function MagneticCTA({ to, children }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 30) {
      setOffset({ x: dx, y: dy });
    }
  }, []);

  const reset = () => setOffset({ x: 0, y: 0 });

  return (
    <Link
      ref={ref}
      to={to}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="group inline-flex items-center gap-2"
    >
      <motion.span
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative font-nippo-var text-xs uppercase tracking-[0.2em] text-sand"
      >
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-sand transition-all duration-500 group-hover:w-full" />
      </motion.span>
      <motion.span
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-sand transition-transform duration-300 group-hover:translate-x-1"
      >
        &rarr;
      </motion.span>
    </Link>
  );
}

function ProjectSlide({ project, index, total }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const num = String(index + 1).padStart(2, "0");
  const [imgHover, setImgHover] = useState(false);

  return (
    <div
      ref={ref}
      className="flex min-h-[85vh] snap-start items-center px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:gap-16 lg:gap-20 items-center">
        {/* Left — content */}
        <div className="relative">
          {/* Large number */}
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="pointer-events-none absolute -left-2 -top-8 font-nippo-var text-[clamp(6rem,12vw,10rem)] font-light leading-none text-sand/[0.05] select-none md:-left-6 md:-top-14"
          >
            {num}
          </motion.span>

          <div className="relative">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-nippo font-medium text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] text-cream"
            >
              {project.name}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 flex flex-wrap gap-x-3 gap-y-1"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-nippo-var text-[10px] uppercase tracking-[0.2em] text-slate/50"
                >
                  {tag}
                </span>
              ))}
              <span className="font-nippo-var text-[10px] text-sand/30">
                {project.year}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 max-w-md font-nippo-var text-[15px] font-light leading-relaxed text-cream/40"
            >
              {project.teaser}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8"
            >
              <MagneticCTA to={`/project/${project.id}`}>
                View Project
              </MagneticCTA>
            </motion.div>
          </div>
        </div>

        {/* Right — image with 3D tilt */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
          onMouseEnter={() => setImgHover(true)}
          onMouseLeave={() => setImgHover(false)}
          style={{ perspective: "1000px" }}
        >
          {/* Glow */}
          <div
            className="pointer-events-none absolute -inset-6 rounded-sm transition-all duration-700"
            style={{
              background: imgHover
                ? "radial-gradient(ellipse at center, rgba(200,168,130,0.08) 0%, transparent 70%)"
                : "radial-gradient(ellipse at center, rgba(200,168,130,0.03) 0%, transparent 70%)",
            }}
          />
          <div
            className="relative overflow-hidden border border-sand/[0.06] transition-all duration-700"
            style={{
              transform: imgHover
                ? "rotateY(0deg) scale(1.02)"
                : "rotateY(-8deg) rotateX(2deg)",
              transformOrigin: "center center",
              transition: "transform 0.6s cubic-bezier(0.25,0.1,0.25,1)",
            }}
          >
            {project.images?.hero ? (
              <img
                src={project.images.hero}
                alt={project.name}
                className="h-full w-full object-cover"
                style={{ aspectRatio: "4/3" }}
              />
            ) : (
              <ProjectImage
                projectId={project.id}
                number={num}
                aspect="4/3"
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProgressIndicator({ count, activeIndex }) {
  return (
    <div className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="transition-all duration-500"
          style={{
            width: i === activeIndex ? 2 : 2,
            height: i === activeIndex ? 24 : 8,
            borderRadius: 1,
            backgroundColor:
              i === activeIndex
                ? "rgba(200,168,130,0.6)"
                : "rgba(200,168,130,0.15)",
          }}
        />
      ))}
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef(null);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll("[data-slide]");
    if (!slides.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.slide);
            setActiveSlide(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [filtered]);

  return (
    <section id="work" className="py-20">
      <div className="px-6">
        <SectionLabel>⟨ Selected Work ⟩</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center font-nippo font-medium text-[clamp(2rem,4vw,3rem)] text-cream/80"
        >
          Projects &amp; Case Studies
        </motion.h2>

        {/* Filter pills */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`border px-4 py-1.5 font-nippo-var text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                active === cat
                  ? "border-sand bg-sand text-olive-dark"
                  : "border-sand/20 text-sand/50 hover:border-sand/40 hover:text-sand/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cinematic slides */}
      <div ref={containerRef} className="relative snap-y snap-mandatory">
        <ProgressIndicator count={filtered.length} activeIndex={activeSlide} />

        <AnimatePresence mode="wait">
          {filtered.map((project, i) => (
            <div key={project.id} data-slide={i}>
              <ProjectSlide
                project={project}
                index={projects.indexOf(project)}
                total={filtered.length}
              />
              {/* Separator */}
              {i < filtered.length - 1 && (
                <div className="mx-auto flex max-w-6xl items-center gap-4 px-6">
                  <div className="h-px flex-1 bg-sand/[0.06]" />
                  <span className="font-nippo-var text-[8px] tracking-[0.4em] text-sand/15">
                    ✕
                  </span>
                  <div className="h-px flex-1 bg-sand/[0.06]" />
                </div>
              )}
            </div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
