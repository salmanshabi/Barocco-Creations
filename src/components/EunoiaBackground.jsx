import { useEffect, useRef } from "react";

/**
 * Studio Eunoia — subtle floating golden ring arcs with soft light rays
 * and gentle sparkles. Kept minimal for an elegant, understated feel.
 */
export default function EunoiaBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    /* ── Floating rings ── */
    const rings = [];
    const RING_COUNT = 18;

    /* ── Light rays ── */
    const rays = [];
    const RAY_COUNT = 4;

    /* ── Tiny accent sparkles ── */
    const sparks = [];
    const SPARK_COUNT = 35;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }

    function makeRing() {
      const sizeTier = Math.random();
      let radius, lineWidth, alpha;

      if (sizeTier < 0.3) {
        radius = 60 + Math.random() * 60;
        lineWidth = 1.5 + Math.random() * 1.5;
        alpha = 0.12 + Math.random() * 0.15;
      } else {
        radius = 25 + Math.random() * 40;
        lineWidth = 0.8 + Math.random() * 1;
        alpha = 0.1 + Math.random() * 0.15;
      }

      const hue = 35 + Math.random() * 20;
      const sat = 50 + Math.random() * 30;
      const lit = 58 + Math.random() * 20;

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.12,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.002,
        tilt: 0.3 + Math.random() * 0.5,
        alpha,
        lineWidth,
        arcStart: Math.random() * Math.PI * 2,
        arcEnd: Math.PI + Math.random() * Math.PI * 1.2,
        hue,
        sat,
        lit,
        breathPhase: Math.random() * Math.PI * 2,
        breathSpeed: 0.001 + Math.random() * 0.003,
      };
    }

    function makeRay() {
      return {
        x: Math.random() * canvas.width * 1.5 - canvas.width * 0.25,
        y: -100,
        angle: 0.3 + Math.random() * 0.4,
        width: 100 + Math.random() * 150,
        length: canvas.height * (0.4 + Math.random() * 0.5),
        speed: 0.15 + Math.random() * 0.25,
        alpha: 0.03 + Math.random() * 0.04,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.001 + Math.random() * 0.002,
      };
    }

    function makeSpark(randomY) {
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : canvas.height + 10,
        r: 0.5 + Math.random() * 1.2,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(0.04 + Math.random() * 0.1),
        alpha: 0.15 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.015 + Math.random() * 0.025,
        hue: 35 + Math.random() * 20,
      };
    }

    function init() {
      rings.length = 0;
      rays.length = 0;
      sparks.length = 0;
      for (let i = 0; i < RING_COUNT; i++) rings.push(makeRing());
      for (let i = 0; i < RAY_COUNT; i++) rays.push(makeRay());
      for (let i = 0; i < SPARK_COUNT; i++) sparks.push(makeSpark(true));
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* ── Light rays ── */
      for (const ray of rays) {
        const pulse = 0.5 + Math.sin(time * ray.pulseSpeed + ray.phase) * 0.5;
        const alpha = ray.alpha * pulse;

        ctx.save();
        ctx.translate(ray.x, ray.y);
        ctx.rotate(ray.angle);

        const grad = ctx.createLinearGradient(0, 0, 0, ray.length);
        grad.addColorStop(0, `rgba(196,162,101,0)`);
        grad.addColorStop(0.3, `rgba(196,162,101,${alpha})`);
        grad.addColorStop(0.7, `rgba(224,204,154,${alpha * 0.7})`);
        grad.addColorStop(1, `rgba(196,162,101,0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(-ray.width / 2, 0, ray.width, ray.length);
        ctx.restore();

        ray.x += ray.speed * 0.3;
        if (ray.x > canvas.width + 300) {
          ray.x = -300;
          ray.y = -100 + Math.random() * 200;
        }
      }

      /* ── Floating rings ── */
      for (const ring of rings) {
        const breath = 0.7 + Math.sin(time * ring.breathSpeed + ring.breathPhase) * 0.3;
        const alpha = ring.alpha * breath;

        ring.x += ring.vx;
        ring.y += ring.vy;
        ring.rotation += ring.rotSpeed;

        // Wrap
        if (ring.x < -ring.radius * 2) ring.x = canvas.width + ring.radius;
        if (ring.x > canvas.width + ring.radius * 2) ring.x = -ring.radius;
        if (ring.y < -ring.radius * 2) ring.y = canvas.height + ring.radius;
        if (ring.y > canvas.height + ring.radius * 2) ring.y = -ring.radius;

        ctx.save();
        ctx.translate(ring.x, ring.y);
        ctx.rotate(ring.rotation);
        ctx.scale(1, ring.tilt);

        ctx.beginPath();
        ctx.arc(0, 0, ring.radius, ring.arcStart, ring.arcEnd);
        ctx.strokeStyle = `hsla(${ring.hue}, ${ring.sat}%, ${ring.lit}%, ${alpha})`;
        ctx.lineWidth = ring.lineWidth;
        ctx.stroke();

        ctx.restore();
      }

      /* ── Accent sparkles ── */
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        const tw = 0.4 + Math.sin(time * s.twinkle + s.phase) * 0.6;
        const alpha = s.alpha * tw;

        s.x += s.vx;
        s.y += s.vy;

        if (s.y < -10 || s.x < -10 || s.x > canvas.width + 10) {
          sparks[i] = makeSpark(false);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 50%, 75%, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    init();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", () => { resize(); init(); });

    const ro = new ResizeObserver(() => { canvas.height = document.documentElement.scrollHeight; });
    ro.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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
