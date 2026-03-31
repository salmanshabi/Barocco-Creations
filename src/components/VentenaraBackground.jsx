import { useEffect, useRef } from "react";

/**
 * Ventenara — floating gold dust particles.
 * Tiny golden flecks drift slowly downward like precious metal dust
 * settling in a vault, evoking heritage and timelessness.
 * Mouse proximity creates a gentle swirl.
 */
export default function VentenaraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let mouse = { x: -9999, y: -9999 };

    const particles = [];
    const COUNT = 60;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }

    function makeParticle(randomY) {
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : -10,
        r: 0.6 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.15,
        vy: 0.08 + Math.random() * 0.18,
        alpha: 0.15 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.008 + Math.random() * 0.015,
        // Gold color variation
        hue: 38 + Math.random() * 12, // 38-50 (gold range)
        sat: 60 + Math.random() * 30,
        lit: 55 + Math.random() * 20,
      };
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push(makeParticle(true));
      }
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Twinkle
        const twinkle = 0.5 + Math.sin(time * p.twinkleSpeed + p.phase) * 0.5;
        const alpha = p.alpha * twinkle;

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Mouse swirl — particles orbit gently around cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 1) {
          const angle = Math.atan2(dy, dx);
          const force = ((200 - dist) / 200) * 0.3;
          // Tangential push (swirl) + slight outward push
          p.x += Math.cos(angle + Math.PI / 2) * force + (dx / dist) * force * 0.1;
          p.y += Math.sin(angle + Math.PI / 2) * force + (dy / dist) * force * 0.1;
        }

        // Respawn when off-screen
        if (p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          particles[i] = makeParticle(false);
          continue;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.lit}%, ${alpha})`;
        ctx.fill();

        // Soft glow on brighter particles
        if (alpha > 0.25) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.lit}%, ${alpha * 0.1})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    }
    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onTouchMove(e) {
      const touch = e.touches[0];
      if (touch) {
        mouse.x = touch.clientX;
        mouse.y = touch.clientY + window.scrollY;
      }
    }
    function onTouchEnd() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    init();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", () => { resize(); init(); });
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    const ro = new ResizeObserver(() => {
      canvas.height = document.documentElement.scrollHeight;
    });
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
