import { useEffect, useRef } from "react";

/**
 * La Coco — rising tropical bubbles + teal cursor glow.
 * Tiny luminous circles drift upward like carbonation bubbles in a
 * milkshake, with a soft teal radial glow following the mouse.
 */
export default function LaCocoBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let mouse = { x: -9999, y: -9999 };
    let smooth = { x: -9999, y: -9999 };
    const LERP = 0.05;

    const bubbles = [];
    const COUNT = 80;

    const COLORS = [
      { h: 170, s: 70, l: 55 }, // teal
      { h: 165, s: 60, l: 60 }, // seafoam
      { h: 175, s: 50, l: 65 }, // mint
      { h: 160, s: 55, l: 50 }, // deep teal
      { h: 180, s: 40, l: 70 }, // pale aqua
    ];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }

    function makeBubble(randomY) {
      const c = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : canvas.height + 10 + Math.random() * 40,
        r: 1 + Math.random() * 3,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -(0.1 + Math.random() * 0.25),
        alpha: 0.1 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.01 + Math.random() * 0.02,
        wobbleAmp: 0.3 + Math.random() * 0.5,
        h: c.h, s: c.s, l: c.l,
      };
    }

    function init() {
      bubbles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        bubbles.push(makeBubble(true));
      }
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth cursor position
      if (mouse.x > -999) {
        if (smooth.x < -999) { smooth.x = mouse.x; smooth.y = mouse.y; }
        else { smooth.x += (mouse.x - smooth.x) * LERP; smooth.y += (mouse.y - smooth.y) * LERP; }
      } else {
        smooth.x = -9999; smooth.y = -9999;
      }

      // Teal cursor glow
      if (smooth.x > -999) {
        const gr = 160;
        const grd = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, gr);
        grd.addColorStop(0, "rgba(26,158,143,0.12)");
        grd.addColorStop(0.4, "rgba(26,158,143,0.06)");
        grd.addColorStop(0.7, "rgba(94,196,184,0.02)");
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(smooth.x, smooth.y, gr, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // Draw bubbles
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];

        // Wobble sideways
        const wobble = Math.sin(time * b.wobbleSpeed + b.phase) * b.wobbleAmp;

        b.x += b.vx + wobble * 0.05;
        b.y += b.vy;

        // Brightness boost near cursor
        let alpha = b.alpha;
        if (smooth.x > -999) {
          const dx = b.x - smooth.x;
          const dy = b.y - smooth.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            alpha = Math.min(0.8, alpha + ((180 - dist) / 180) * 0.3);
          }
        }

        // Respawn
        if (b.y < -20 || b.x < -20 || b.x > canvas.width + 20) {
          bubbles[i] = makeBubble(false);
          continue;
        }

        // Bubble
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${b.h}, ${b.s}%, ${b.l}%, ${alpha})`;
        ctx.fill();

        // Glow
        if (alpha > 0.2) {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${b.h}, ${b.s}%, ${b.l}%, ${alpha * 0.1})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function onMouseMove(e) { mouse.x = e.clientX; mouse.y = e.clientY + window.scrollY; }
    function onMouseLeave() { mouse.x = -9999; mouse.y = -9999; }
    function onTouchMove(e) { const t = e.touches[0]; if (t) { mouse.x = t.clientX; mouse.y = t.clientY + window.scrollY; } }
    function onTouchEnd() { mouse.x = -9999; mouse.y = -9999; }

    resize();
    init();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", () => { resize(); init(); });
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    const ro = new ResizeObserver(() => { canvas.height = document.documentElement.scrollHeight; });
    ro.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
