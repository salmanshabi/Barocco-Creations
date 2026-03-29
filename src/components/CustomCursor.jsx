import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const pos = useRef({ x: -40, y: -40 });
  const rendered = useRef({ x: -40, y: -40 });
  const rafId = useRef(null);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const el = cursorRef.current;
    if (!el) return;

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      rendered.current.x = lerp(rendered.current.x, pos.current.x, 0.15);
      rendered.current.y = lerp(rendered.current.y, pos.current.y, 0.15);
      el.style.transform = `translate3d(${rendered.current.x - 5}px, ${rendered.current.y - 5}px, 0)`;
      rafId.current = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      el.style.opacity = "1";
    };

    const onLeave = () => { el.style.opacity = "0"; };
    const onEnter = () => { el.style.opacity = "1"; };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-2.5 w-2.5 rounded-full bg-sand mix-blend-difference"
      style={{ opacity: 0, willChange: "transform" }}
    />
  );
}
