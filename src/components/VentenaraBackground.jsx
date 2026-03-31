import { useEffect, useRef } from "react";

/**
 * Ventenara — dense gold dust with mouse/touch gold halo.
 * Many golden flecks drift across the full page. A warm gold radial
 * glow follows the cursor/touch, illuminating nearby particles.
 */
export default function VentenaraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let mouse = { x: -9999, y: -9999 };
    // Smoothed mouse for the halo
    let smooth = { x: -9999, y: -9999 };
    const LERP = 0.06;

    const particles = [];
    const COUNT = 140;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }

    function makeParticle(randomY) {
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : -10 - Math.random() * 40,
        r: 0.5 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.2,
        vy: 0.06 + Math.random() * 0.2,
        alpha: 0.12 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.006 + Math.random() * 0.014,
        hue: 38 + Math.random() * 12,
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

      // Smooth the halo position
      if (mouse.x > -999) {
        if (smooth.x < -999) {
          smooth.x = mouse.x;
          smooth.y = mouse.y;
        } else {
          smooth.x += (mouse.x - smooth.x) * LERP;
          smooth.y += (mouse.y - smooth.y) * LERP;
        }
      } else {
        smooth.x = -9999;
        smooth.y = -9999;
      }

      // Draw gold halo glow at cursor
      if (smooth.x > -999) {
        const haloR = 180;
        const haloGrad = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, haloR);
        haloGrad.addColorStop(0, "rgba(201,168,76,0.14)");
        haloGrad.addColorStop(0.4, "rgba(201,168,76,0.07)");
        haloGrad.addColorStop(0.7, "rgba(228,213,160,0.03)");
        haloGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(smooth.x, smooth.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Twinkle
        const twinkle = 0.5 + Math.sin(time * p.twinkleSpeed + p.phase) * 0.5;
        let alpha = p.alpha * twinkle;

        // Boost brightness near cursor
        if (smooth.x > -999) {
          const dx = p.x - smooth.x;
          const dy = p.y - smooth.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const boost = ((200 - dist) / 200) * 0.4;
            alpha = Math.min(1, alpha + boost);
          }
        }

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Gentle swirl near mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 1) {
          const angle = Math.atan2(dy, dx);
          const force = ((180 - dist) / 180) * 0.25;
          p.x += Math.cos(angle + Math.PI / 2) * force;
          p.y += Math.sin(angle + Math.PI / 2) * force;
        }

        // Respawn
        if (p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          particles[i] = makeParticle(false);
          continue;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.lit}%, ${alpha})`;
        ctx.fill();

        // Glow on brighter particles
        if (alpha > 0.25) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.lit}%, ${alpha * 0.12})`;
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
