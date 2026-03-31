import { useEffect, useRef } from "react";

/**
 * Mira Skincare — dreamy flowing-orb + sparkle background.
 * Luminous blush / mauve blobs drift across the canvas with visible glow,
 * plus tiny floating sparkle particles that twinkle and drift upward.
 * Mouse proximity attracts sparkles and gently repels orbs.
 */
export default function MiraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let mouse = { x: -9999, y: -9999 };

    /* ── Orbs — large luminous blobs ── */
    const ORB_COLORS = [
      "rgba(196,132,154,0.18)",
      "rgba(232,196,208,0.14)",
      "rgba(180,120,150,0.16)",
      "rgba(220,180,200,0.12)",
      "rgba(160,100,130,0.15)",
      "rgba(210,160,185,0.13)",
      "rgba(190,140,165,0.17)",
      "rgba(240,200,220,0.10)",
      "rgba(170,110,140,0.14)",
      "rgba(200,150,175,0.16)",
    ];

    const orbs = [];
    const ORB_COUNT = 10;

    /* ── Sparkles — tiny twinkling particles ── */
    const sparkles = [];
    const SPARKLE_COUNT = 50;

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
          r: 150 + Math.random() * 300,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.08,
          color: ORB_COLORS[i % ORB_COLORS.length],
          phase: Math.random() * Math.PI * 2,
          breathSpeed: 0.004 + Math.random() * 0.005,
        });
      }
    }

    function initSparkles() {
      sparkles.length = 0;
      for (let i = 0; i < SPARKLE_COUNT; i++) {
        sparkles.push(makeSparkle());
      }
    }

    function makeSparkle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 1 + Math.random() * 2.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.15 - Math.random() * 0.35,
        alpha: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        life: 0,
        maxLife: 300 + Math.random() * 400,
      };
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* ── Draw orbs ── */
      for (const orb of orbs) {
        const breath = 1 + Math.sin(time * orb.breathSpeed + orb.phase) * 0.15;
        const r = orb.r * breath;

        orb.x += orb.vx;
        orb.y += orb.vy;

        // Mouse repulsion
        const dx = orb.x - mouse.x;
        const dy = orb.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 350) {
          const force = ((350 - dist) / 350) * 0.2;
          orb.x += (dx / dist) * force;
          orb.y += (dy / dist) * force;
        }

        // Wrap
        if (orb.x < -orb.r) orb.x = canvas.width + orb.r;
        if (orb.x > canvas.width + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = canvas.height + orb.r;
        if (orb.y > canvas.height + orb.r) orb.y = -orb.r;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(0.6, orb.color.replace(/[\d.]+\)$/, (m) => `${parseFloat(m) * 0.4})`));
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      /* ── Draw sparkles ── */
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.life++;

        // Twinkle
        const twinkle = 0.4 + Math.sin(time * s.twinkleSpeed + s.phase) * 0.6;
        const fadeFactor =
          s.life < 40
            ? s.life / 40
            : s.life > s.maxLife - 60
              ? (s.maxLife - s.life) / 60
              : 1;
        const alpha = s.alpha * twinkle * fadeFactor;

        // Drift
        s.x += s.vx;
        s.y += s.vy;

        // Mouse attraction (sparkles drift toward cursor)
        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300 && dist > 1) {
          const pull = ((300 - dist) / 300) * 0.15;
          s.x += (dx / dist) * pull;
          s.y += (dy / dist) * pull;
        }

        // Respawn
        if (s.life > s.maxLife || s.y < -20 || s.x < -20 || s.x > canvas.width + 20) {
          sparkles[i] = makeSparkle();
          sparkles[i].y = canvas.height + 10;
          continue;
        }

        // Draw sparkle with soft glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,196,208,${alpha})`;
        ctx.fill();

        // Outer glow
        if (alpha > 0.3) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196,132,154,${alpha * 0.15})`;
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
    initOrbs();
    initSparkles();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", () => {
      resize();
      initOrbs();
      initSparkles();
    });
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
