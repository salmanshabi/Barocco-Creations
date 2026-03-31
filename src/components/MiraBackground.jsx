import { useEffect, useRef } from "react";

/**
 * Mira Skincare — dreamy flowing-orb background.
 * Soft, luminous blush / mauve blobs drift slowly across a dark canvas,
 * evoking skincare serums and fluid organic textures.
 * Mouse proximity gently repels the nearest orbs.
 */
export default function MiraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let mouse = { x: -9999, y: -9999 };

    const COLORS = [
      "rgba(196,132,154,0.08)",  // mauve
      "rgba(232,196,208,0.06)",  // blush
      "rgba(180,120,150,0.07)",  // dusty rose
      "rgba(220,180,200,0.05)",  // petal pink
      "rgba(160,100,130,0.06)",  // deep mauve
    ];

    const orbs = [];
    const ORB_COUNT = 7;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }

    function initOrbs() {
      orbs.length = 0;
      for (let i = 0; i < ORB_COUNT; i++) {
        orbs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 180 + Math.random() * 260,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.1,
          color: COLORS[i % COLORS.length],
          phase: Math.random() * Math.PI * 2,
          breathSpeed: 0.003 + Math.random() * 0.004,
        });
      }
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const orb of orbs) {
        // Gentle breathing scale
        const breath = 1 + Math.sin(time * orb.breathSpeed + orb.phase) * 0.12;
        const r = orb.r * breath;

        // Drift
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Mouse repulsion
        const dx = orb.x - mouse.x;
        const dy = orb.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400) {
          const force = (400 - dist) / 400 * 0.4;
          orb.x += (dx / dist) * force;
          orb.y += (dy / dist) * force;
        }

        // Wrap around
        if (orb.x < -orb.r) orb.x = canvas.width + orb.r;
        if (orb.x > canvas.width + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = canvas.height + orb.r;
        if (orb.y > canvas.height + orb.r) orb.y = -orb.r;

        // Draw radial gradient orb
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
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

    resize();
    initOrbs();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", () => { resize(); initOrbs(); });
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const ro = new ResizeObserver(() => {
      canvas.height = document.documentElement.scrollHeight;
    });
    ro.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
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
