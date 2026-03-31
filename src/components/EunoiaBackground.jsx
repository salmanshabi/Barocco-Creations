import { useEffect, useRef } from "react";

/**
 * Studio Eunoia — jewelry shimmer particles + warm gold cursor glow.
 * Tiny faceted sparkles drift slowly in all directions like light
 * refracting off gemstones and polished metal, with a warm gold
 * radial glow following the mouse/touch.
 */
export default function EunoiaBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let mouse = { x: -9999, y: -9999 };
    let smooth = { x: -9999, y: -9999 };
    const LERP = 0.05;

    const sparkles = [];
    const COUNT = 90;

    const PALETTE = [
      { h: 40, s: 55, l: 65 },  // warm gold
      { h: 35, s: 45, l: 60 },  // antique gold
      { h: 45, s: 35, l: 70 },  // champagne
      { h: 30, s: 40, l: 55 },  // bronze
      { h: 175, s: 30, l: 45 }, // muted teal
      { h: 50, s: 30, l: 75 },  // travertine
    ];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }

    function makeSparkle(randomPos) {
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      return {
        x: Math.random() * canvas.width,
        y: randomPos ? Math.random() * canvas.height : -10 - Math.random() * 30,
        r: 0.5 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.12,
        vy: 0.03 + Math.random() * 0.1,
        alpha: 0.1 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.01 + Math.random() * 0.025,
        // Facet flash — occasional bright pulse
        flashPhase: Math.random() * Math.PI * 2,
        flashSpeed: 0.002 + Math.random() * 0.004,
        h: c.h, s: c.s, l: c.l,
      };
    }

    function init() {
      sparkles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        sparkles.push(makeSparkle(true));
      }
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth cursor
      if (mouse.x > -999) {
        if (smooth.x < -999) { smooth.x = mouse.x; smooth.y = mouse.y; }
        else { smooth.x += (mouse.x - smooth.x) * LERP; smooth.y += (mouse.y - smooth.y) * LERP; }
      } else {
        smooth.x = -9999; smooth.y = -9999;
      }

      // Warm gold cursor glow
      if (smooth.x > -999) {
        const gr = 150;
        const grd = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, gr);
        grd.addColorStop(0, "rgba(196,162,101,0.12)");
        grd.addColorStop(0.4, "rgba(196,162,101,0.06)");
        grd.addColorStop(0.7, "rgba(224,204,154,0.02)");
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(smooth.x, smooth.y, gr, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];

        // Twinkle + occasional facet flash
        const twinkle = 0.4 + Math.sin(time * s.twinkleSpeed + s.phase) * 0.6;
        const flash = Math.max(0, Math.sin(time * s.flashSpeed + s.flashPhase));
        const flashBoost = flash > 0.97 ? 0.5 : 0; // rare bright flash
        let alpha = s.alpha * twinkle + flashBoost;

        // Drift
        s.x += s.vx;
        s.y += s.vy;

        // Brightness boost near cursor
        if (smooth.x > -999) {
          const dx = s.x - smooth.x;
          const dy = s.y - smooth.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 170) {
            alpha = Math.min(0.9, alpha + ((170 - dist) / 170) * 0.35);
          }
        }

        // Respawn
        if (s.y > canvas.height + 20 || s.x < -20 || s.x > canvas.width + 20) {
          sparkles[i] = makeSparkle(false);
          continue;
        }

        // Draw sparkle
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.h}, ${s.s}%, ${s.l}%, ${alpha})`;
        ctx.fill();

        // Glow halo
        if (alpha > 0.25) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${s.h}, ${s.s}%, ${s.l}%, ${alpha * 0.1})`;
          ctx.fill();
        }

        // Cross-flare on flash
        if (flashBoost > 0) {
          ctx.strokeStyle = `hsla(${s.h}, ${s.s}%, ${s.l + 15}%, ${flashBoost * 0.6})`;
          ctx.lineWidth = 0.3;
          ctx.beginPath();
          ctx.moveTo(s.x - s.r * 4, s.y);
          ctx.lineTo(s.x + s.r * 4, s.y);
          ctx.moveTo(s.x, s.y - s.r * 4);
          ctx.lineTo(s.x, s.y + s.r * 4);
          ctx.stroke();
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
