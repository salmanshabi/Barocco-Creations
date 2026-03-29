import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import projects from "../data/projects";
import ProjectImage from "../components/ProjectImage";

export default function ProjectDetail() {
  const { id } = useParams();
  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  if (!project) return <Navigate to="/" replace />;

  const num = String(projectIndex + 1).padStart(2, "0");
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const nextNum = String(((projectIndex + 1) % projects.length) + 1).padStart(2, "0");

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Full-bleed hero */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {project.images?.hero ? (
          <img
            src={project.images.hero}
            alt={project.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <ProjectImage
            projectId={project.id}
            number={num}
            aspect="auto"
            className="h-full w-full"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-olive-dark via-olive-dark/60 to-transparent" />

        {/* Back button */}
        <Link
          to="/"
          className="absolute top-24 left-6 z-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-sand/50 transition-colors hover:text-sand md:left-12"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 4L6 8L10 12" />
          </svg>
          Back to Work
        </Link>

        {/* Hero text over gradient */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 md:px-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between gap-6">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="font-cormorant text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] text-cream"
                >
                  {project.name}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="mt-3 flex flex-wrap gap-x-3"
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate/60"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="hidden shrink-0 font-mono text-sm text-sand/40 md:block"
              >
                {project.year}
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column: description + metadata */}
      <div className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.5fr_1fr]">
          {/* Left — description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-sand/40">
              About the project
            </h2>
            <p className="font-jost text-base font-light leading-[1.9] text-cream/50">
              {project.description}
            </p>
          </motion.div>

          {/* Right — metadata panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="space-y-0 border-t border-sand/10 md:border-l md:border-t-0 md:pl-12"
          >
            {[
              { label: "Client", value: project.client },
              { label: "Year", value: project.year },
              { label: "Services", value: project.services?.join(", ") },
              { label: "Tools", value: project.tools.join(", ") },
            ].map((row) => (
              <div
                key={row.label}
                className="border-b border-sand/[0.06] py-5"
              >
                <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-sand/30">
                  {row.label}
                </p>
                <p className="font-jost text-sm font-light text-cream/50">
                  {row.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <div className="py-10">
        <h3 className="mb-8 px-6 font-mono text-[10px] uppercase tracking-[0.3em] text-sand/30 md:px-12">
          Project Gallery
        </h3>
        <div className="flex gap-4 overflow-x-auto px-6 pb-6 md:px-12 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {project.images?.gallery ? (
            project.images.gallery.map((src, i) => (
              <div
                key={i}
                className="shrink-0 overflow-hidden border border-sand/[0.05]"
              >
                <img
                  src={src}
                  alt={`${project.name} — ${i + 1}`}
                  className="h-[50vh] w-auto object-contain"
                />
              </div>
            ))
          ) : (
            [1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-[70vw] shrink-0 overflow-hidden border border-sand/[0.05] md:w-[45vw] lg:w-[35vw]"
              >
                <ProjectImage
                  projectId={project.id}
                  number={String(i).padStart(2, "0")}
                  aspect="16/10"
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Live interactive website embed */}
      {project.link && (
        <div className="px-6 py-16 md:px-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-sand/30">
              Live Preview
            </h3>
            <p className="mb-8 font-jost text-sm font-light text-cream/40">
              Interact with the live website below — scroll, click, and explore the full experience.
            </p>

            {/* Browser chrome frame */}
            <div className="overflow-hidden rounded-lg border border-sand/10">
              {/* Browser toolbar */}
              <div className="flex items-center gap-3 border-b border-sand/10 bg-olive-mid/60 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                </div>
                <div className="flex-1 rounded-md bg-olive-dark/50 px-4 py-1.5 text-center">
                  <span className="font-mono text-[11px] text-cream/30">{project.link}</span>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.15em] text-sand/40 transition-colors hover:text-sand"
                >
                  Open ↗
                </a>
              </div>

              {/* Iframe */}
              <iframe
                src={project.link}
                title={`${project.name} — Live Preview`}
                className="h-[75vh] w-full bg-white"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
          </div>
        </div>
      )}

      {/* External link */}
      {project.link && (
        <div className="px-6 py-10 md:px-12">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-sand bg-sand px-6 py-3 font-jost text-xs font-medium uppercase tracking-[0.2em] text-olive-dark transition-all duration-300 hover:bg-transparent hover:text-sand"
          >
            View Full Site
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 12L12 4M12 4H6M12 4V10" />
            </svg>
          </a>
        </div>
      )}

      {/* Next project */}
      <div className="border-t border-sand/[0.06] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.3em] text-sand/25">
            Next Project
          </p>
          <Link
            to={`/project/${nextProject.id}`}
            className="group inline-flex items-baseline gap-6"
          >
            <span className="font-cormorant text-[clamp(1.5rem,4vw,3rem)] font-light text-cream/40 transition-colors duration-500 group-hover:text-cream">
              {nextProject.name}
            </span>
            <span className="font-mono text-xs text-sand/30 transition-all duration-300 group-hover:translate-x-2 group-hover:text-sand">
              &rarr;
            </span>
          </Link>
          <p className="mt-2 font-mono text-[10px] text-slate/30">
            {nextNum} &middot; {nextProject.category}
          </p>
        </div>
      </div>
    </motion.main>
  );
}
