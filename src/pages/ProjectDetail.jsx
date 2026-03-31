import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import projects from "../data/projects";
import ProjectImage from "../components/ProjectImage";
import NexoraBackground from "../components/NexoraBackground";
import BaroqueBackground from "../components/BaroqueBackground";
import BaroqueOrnament from "../components/BaroqueOrnament";
import MiraBackground from "../components/MiraBackground";
import MiraWaveDivider from "../components/MiraWaveDivider";
import VentenaraBackground from "../components/VentenaraBackground";
import VentenaraOrnament from "../components/VentenaraOrnament";
import LaCocoBackground from "../components/LaCocoBackground";
import LaCocoOrnament from "../components/LaCocoOrnament";
import EunoiaBackground from "../components/EunoiaBackground";
import EunoiaOrnament from "../components/EunoiaOrnament";

const defaultTheme = {
  bg: "#131518",
  surface: "#1a1c22",
  accent: "#c8a882",
  accentLight: "#e8e2d5",
  text: "#e8e2d5",
  textMuted: "#7a9baa",
  border: "rgba(200,168,130,0.1)",
};

export default function ProjectDetail() {
  const { id } = useParams();
  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  if (!project) return <Navigate to="/" replace />;

  const t = project.theme || defaultTheme;
  const num = String(projectIndex + 1).padStart(2, "0");
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const nextNum = String(((projectIndex + 1) % projects.length) + 1).padStart(2, "0");

  const isNexora = project.id === "nexora-ai";
  const isBaroque = project.id === "baroque-bougies";
  const isMira = project.id === "mira-skincare";
  const isVentenara = project.id === "ventenara";
  const isLaCoco = project.id === "la-coco";
  const isEunoia = project.id === "studio-eunoia";

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
      style={{ backgroundColor: t.bg, position: "relative" }}
    >
      {/* Nexora AI — interactive animated particle background */}
      {isNexora && (
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ mixBlendMode: "screen" }}>
          <NexoraBackground />
        </div>
      )}

      {/* Studio Eunoia — jewelry shimmer + warm vignette */}
      {isEunoia && (
        <>
          <EunoiaBackground />
          <div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 55% 45% at 50% 40%, rgba(196,162,101,0.03) 0%, transparent 55%), radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(20,18,16,0.5) 100%)`,
            }}
          />
        </>
      )}

      {/* La Coco — tropical bubbles + teal vignette */}
      {isLaCoco && (
        <>
          <LaCocoBackground />
          <div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 55% 45% at 50% 40%, rgba(26,158,143,0.03) 0%, transparent 55%), radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(10,26,26,0.5) 100%)`,
            }}
          />
        </>
      )}

      {/* Ventenara — floating gold dust + deep navy vignette */}
      {isVentenara && (
        <>
          <VentenaraBackground />
          <div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 55% 45% at 50% 40%, rgba(201,168,76,0.03) 0%, transparent 55%), radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(12,16,32,0.5) 100%)`,
            }}
          />
        </>
      )}

      {/* Mira Skincare — dreamy flowing orb background + soft vignette */}
      {isMira && (
        <>
          <MiraBackground />
          <div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 40%, rgba(196,132,154,0.04) 0%, transparent 60%), radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(26,18,24,0.5) 100%)`,
            }}
          />
        </>
      )}

      {/* Baroque Bougies — full-page interactive ember background + vignette */}
      {isBaroque && (
        <>
          <BaroqueBackground />
          {/* Warm candlelight vignette — fixed overlay that follows the viewport */}
          <div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 40%, rgba(200,140,60,0.06) 0%, transparent 60%), radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(10,10,8,0.4) 100%)`,
            }}
          />
        </>
      )}

      {/* All page content — relative z-10 to sit above background canvases */}
      <div className="relative z-10">

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
        {/* Gradient overlay — uses project bg */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${t.bg}, ${t.bg}99 40%, transparent)`,
          }}
        />

        {/* Back button */}
        <Link
          to="/"
          className="absolute top-24 left-6 z-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors hover:opacity-100 md:left-12"
          style={{ color: `${t.accentLight}80` }}
          onMouseEnter={(e) => (e.currentTarget.style.color = t.accentLight)}
          onMouseLeave={(e) => (e.currentTarget.style.color = `${t.accentLight}80`)}
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
                  className="font-cormorant text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05]"
                  style={{ color: t.text }}
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
                      className="font-mono text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: `${t.accent}99` }}
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
                className="hidden shrink-0 font-mono text-sm md:block"
                style={{ color: `${t.accentLight}66` }}
              >
                {project.year}
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      {/* Accent divider — bespoke per project */}
      {isBaroque ? (
        <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <BaroqueOrnament color={`${t.accent}88`} delay={0.3} />
        </div>
      ) : isEunoia ? (
        <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <EunoiaOrnament color={`${t.accent}55`} delay={0.3} />
        </div>
      ) : isLaCoco ? (
        <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <LaCocoOrnament color={`${t.accent}55`} delay={0.3} />
        </div>
      ) : isVentenara ? (
        <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <VentenaraOrnament color={`${t.accent}66`} delay={0.3} />
        </div>
      ) : isMira ? (
        <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <MiraWaveDivider color={`${t.accent}55`} delay={0.3} />
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-px origin-left"
            style={{ backgroundColor: t.accent, opacity: 0.3 }}
          />
        </div>
      )}

      {/* Two-column: description + metadata */}
      <div className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.5fr_1fr]">
          {/* Left — description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2
              className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: `${t.accent}88` }}
            >
              About the project
            </h2>
            <p
              className="font-jost text-base font-light leading-[1.9]"
              style={{ color: `${t.text}88` }}
            >
              {project.description}
            </p>
          </motion.div>

          {/* Right — metadata panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="space-y-0 border-t md:border-l md:border-t-0 md:pl-12"
            style={{ borderColor: t.border }}
          >
            {[
              { label: "Client", value: project.client },
              { label: "Year", value: project.year },
              { label: "Services", value: project.services?.join(", ") },
              { label: "Tools", value: project.tools.join(", ") },
            ].map((row) => (
              <div
                key={row.label}
                className="py-5"
                style={{ borderBottom: `1px solid ${t.border}` }}
              >
                <p
                  className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.3em]"
                  style={{ color: `${t.accent}66` }}
                >
                  {row.label}
                </p>
                <p
                  className="font-jost text-sm font-light"
                  style={{ color: t.textMuted }}
                >
                  {row.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gallery — bespoke layout per project */}
      {project.images?.gallery?.length > 0 && (
      <div className="py-10">
        {isBaroque ? (
          <>
            <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
              <BaroqueOrnament color={`${t.accent}44`} delay={0.5} />
              <h3
                className="mb-10 text-center font-cormorant text-xl font-light italic tracking-wide"
                style={{ color: `${t.accentLight}88` }}
              >
                Project Gallery
              </h3>
            </div>
            {/* Masonry grid — luxury unboxing reveal */}
            <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
              <div className="columns-1 gap-5 md:columns-2">
                {project.images.gallery.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1 * i,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="mb-5 overflow-hidden rounded-sm"
                    style={{
                      border: `1px solid ${t.border}`,
                      boxShadow: `0 8px 32px rgba(139,45,79,0.08), 0 2px 8px rgba(0,0,0,0.2)`,
                    }}
                  >
                    <img
                      src={src}
                      alt={`${project.name} — ${i + 1}`}
                      className="w-full object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
              <BaroqueOrnament color={`${t.accent}33`} delay={0} />
            </div>
          </>
        ) : isEunoia ? (
          <>
            {/* Studio Eunoia — masonry jewelry showcase */}
            <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
              <EunoiaOrnament color={`${t.accent}33`} delay={0.5} />
              <h3
                className="mb-12 text-center font-cormorant text-xl font-light italic tracking-wide"
                style={{ color: `${t.accentLight}88` }}
              >
                Visual Identity
              </h3>
            </div>
            <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
              <div className="columns-1 gap-5 md:columns-2">
                {project.images.gallery.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1 * i,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="mb-5 overflow-hidden rounded-sm"
                    style={{
                      border: `1px solid ${t.border}`,
                      boxShadow: `0 8px 32px rgba(196,162,101,0.06), 0 2px 8px rgba(0,0,0,0.2)`,
                    }}
                  >
                    <img
                      src={src}
                      alt={`${project.name} — ${i + 1}`}
                      className="w-full object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 pt-8 md:px-12 lg:px-20">
              <EunoiaOrnament color={`${t.accent}22`} delay={0} />
            </div>
          </>
        ) : isLaCoco ? (
          <>
            {/* La Coco — masonry tropical gallery */}
            <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
              <LaCocoOrnament color={`${t.accent}33`} delay={0.5} />
              <h3
                className="mb-12 text-center font-cormorant text-xl font-light italic tracking-wide"
                style={{ color: `${t.accentLight}88` }}
              >
                Brand Packaging
              </h3>
            </div>
            <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
              <div className="columns-1 gap-5 md:columns-2">
                {project.images.gallery.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1 * i,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="mb-5 overflow-hidden rounded-sm"
                    style={{
                      border: `1px solid ${t.border}`,
                      boxShadow: `0 8px 32px rgba(26,158,143,0.06), 0 2px 8px rgba(0,0,0,0.2)`,
                    }}
                  >
                    <img
                      src={src}
                      alt={`${project.name} — ${i + 1}`}
                      className="w-full object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 pt-8 md:px-12 lg:px-20">
              <LaCocoOrnament color={`${t.accent}22`} delay={0} />
            </div>
          </>
        ) : isVentenara ? (
          <>
            {/* Ventenara — editorial staggered grid */}
            <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
              <VentenaraOrnament color={`${t.accent}33`} delay={0.5} />
              <h3
                className="mb-12 text-center font-cormorant text-xl font-light italic tracking-wide"
                style={{ color: `${t.accentLight}88` }}
              >
                Brand Identity
              </h3>
            </div>
            {/* Masonry columns — handles mixed aspect ratios naturally */}
            <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
              <div className="columns-1 gap-5 md:columns-2">
                {project.images.gallery.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1 * i,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="mb-5 overflow-hidden rounded-sm"
                    style={{
                      border: `1px solid ${t.border}`,
                      boxShadow: `0 8px 32px rgba(201,168,76,0.06), 0 2px 8px rgba(0,0,0,0.2)`,
                    }}
                  >
                    <img
                      src={src}
                      alt={`${project.name} — ${i + 1}`}
                      className="w-full object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 pt-8 md:px-12 lg:px-20">
              <VentenaraOrnament color={`${t.accent}22`} delay={0} />
            </div>
          </>
        ) : isMira ? (
          <>
            {/* Mira — editorial beauty magazine staggered grid */}
            <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
              <MiraWaveDivider color={`${t.accent}33`} delay={0.5} />
              <h3
                className="mb-12 text-center font-cormorant text-xl font-light italic tracking-wide"
                style={{ color: `${t.accentLight}88` }}
              >
                Brand Showcase
              </h3>
            </div>
            <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
              {/* Feature image — full width */}
              {project.images.gallery[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="mb-6 overflow-hidden rounded-sm"
                  style={{
                    border: `1px solid ${t.border}`,
                    boxShadow: `0 12px 40px rgba(196,132,154,0.08), 0 2px 12px rgba(0,0,0,0.15)`,
                  }}
                >
                  <img
                    src={project.images.gallery[0]}
                    alt={`${project.name} — 1`}
                    className="w-full object-contain"
                  />
                </motion.div>
              )}

              {/* Staggered 2-column pairs with offset */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {project.images.gallery.slice(1).map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.08 * i,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="overflow-hidden rounded-sm"
                    style={{
                      border: `1px solid ${t.border}`,
                      boxShadow: `0 8px 32px rgba(196,132,154,0.06), 0 2px 8px rgba(0,0,0,0.12)`,
                      marginTop: i % 2 === 1 ? "2.5rem" : "0",
                    }}
                  >
                    <img
                      src={src}
                      alt={`${project.name} — ${i + 2}`}
                      className="w-full object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 pt-8 md:px-12 lg:px-20">
              <MiraWaveDivider color={`${t.accent}22`} delay={0} />
            </div>
          </>
        ) : (
          <>
            <h3
              className="mb-8 px-6 font-mono text-[10px] uppercase tracking-[0.3em] md:px-12"
              style={{ color: `${t.accent}55` }}
            >
              Project Gallery
            </h3>
            <div className="flex gap-4 overflow-x-auto px-6 pb-6 md:px-12 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
              {project.images.gallery.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 * i }}
                  className="shrink-0 overflow-hidden rounded-sm"
                  style={{ border: `1px solid ${t.border}` }}
                >
                  <img
                    src={src}
                    alt={`${project.name} — ${i + 1}`}
                    className="h-[50vh] w-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
      )}

      {/* Live interactive website embed */}
      {project.link && (
        <div className="px-6 py-16 md:px-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <h3
              className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: `${t.accent}55` }}
            >
              Live Preview
            </h3>
            <p
              className="mb-8 font-jost text-sm font-light"
              style={{ color: `${t.textMuted}88` }}
            >
              Interact with the live website below — scroll, click, and explore the full experience.
            </p>

            {/* Browser chrome frame */}
            <div className="overflow-hidden rounded-lg" style={{ border: `1px solid ${t.border}` }}>
              {/* Browser toolbar */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{
                  borderBottom: `1px solid ${t.border}`,
                  backgroundColor: `${t.surface}cc`,
                }}
              >
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                </div>
                <div
                  className="flex-1 rounded-md px-4 py-1.5 text-center"
                  style={{ backgroundColor: `${t.bg}88` }}
                >
                  <span
                    className="font-mono text-[11px]"
                    style={{ color: `${t.text}44` }}
                  >
                    {project.link}
                  </span>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.15em] transition-colors"
                  style={{ color: `${t.accent}88` }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = t.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = `${t.accent}88`)}
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
            className="inline-flex items-center gap-2 px-6 py-3 font-jost text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300"
            style={{
              border: `1px solid ${t.accent}`,
              backgroundColor: t.accent,
              color: t.bg,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = t.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = t.accent;
              e.currentTarget.style.color = t.bg;
            }}
          >
            View Full Site
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 12L12 4M12 4H6M12 4V10" />
            </svg>
          </a>
        </div>
      )}

      {/* Next project */}
      <div
        className="px-6 py-24 md:px-12"
        style={{ borderTop: `1px solid ${t.border}` }}
      >
        <div className="mx-auto max-w-6xl">
          <p
            className="mb-4 font-mono text-[9px] uppercase tracking-[0.3em]"
            style={{ color: `${t.accent}44` }}
          >
            Next Project
          </p>
          <Link
            to={`/project/${nextProject.id}`}
            className="group inline-flex items-baseline gap-6"
          >
            <span
              className="font-cormorant text-[clamp(1.5rem,4vw,3rem)] font-light transition-colors duration-500"
              style={{ color: `${t.text}66` }}
              onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = `${t.text}66`)}
            >
              {nextProject.name}
            </span>
            <span
              className="font-mono text-xs transition-all duration-300 group-hover:translate-x-2"
              style={{ color: `${t.accent}55` }}
            >
              &rarr;
            </span>
          </Link>
          <p
            className="mt-2 font-mono text-[10px]"
            style={{ color: `${t.textMuted}55` }}
          >
            {nextNum} &middot; {nextProject.category}
          </p>
        </div>
      </div>

      </div>{/* end content wrapper */}
    </motion.main>
  );
}
