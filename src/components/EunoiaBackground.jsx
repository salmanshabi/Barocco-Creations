import { useEffect, useRef } from "react";

/**
 * Studio Eunoia — floating golden rings + drifting light rays.
 * Elegant thin ring arcs slowly rotate and drift like jewelry pieces
 * floating in a display case, paired with soft diagonal light sweeps
 * that glide across the page. Mouse proximity gently tilts nearby rings.
 */
export default function EunoiaBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let mouse = { x: -9999, y: -9999 };

    /* ── Floating rings ── */
    const rings = [];
    const RING_COUNT = 12;

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
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 30 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.06,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.0008,
        tilt: 0.3 + Math.random() * 0.5, // ellipse squash (perspective)
        alpha: 0.04 + Math.random() * 0.08,
        lineWidth: 0.4 + Math.random() * 0.8,
        // Arc extent — not full circles, partial arcs like jewelry
        arcStart: Math.random() * Math.PI,
        arcEnd: Math.PI + Math.random() * Math.PI,
        // Color
        hue: 35 + Math.random() * 20,
        sat: 35 + Math.random() * 25,
        lit: 55 + Math.random() * 20,
        // Breathing
        breathPhase: Math.random() * Math.PI * 2,
        breathSpeed: 0.001 + Math.random() * 0.002,
      };
    }

    function makeRay() {
      return {
        x: Math.random() * canvas.width * 1.5 - canvas.width * 0.25,
        y: -100,
        angle: 0.3 + Math.random() * 0.4, // diagonal angle
        width: 80 + Math.random() * 200,
        length: canvas.height * (0.5 + Math.random() * 0.8),
        speed: 0.15 + Math.random() * 0.2,
        alpha: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.0008 + Math.random() * 0.001,
      };
    }

    function makeSpark(randomY) {
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : canvas.height + 10,
        r: 0.4 + Math.random() * 1.2,
        vx: (Math.random() - 0.5) * 0.1,
        vy: -(0.02 + Math.random() * 0.08),
        alpha: 0.1 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.015 + Math.random() * 0.02,
        hue: 35 + Math.random() * 25,
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
        grad.addColorStop(0.7, `rgba(224,204,154,${alpha * 0.6})`);
        grad.addColorStop(1, `rgba(196,162,101,0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(-ray.width / 2, 0, ray.width, ray.length);
        ctx.restore();

        // Slow drift
        ray.x += ray.speed * 0.3;
        if (ray.x > canvas.width + 300) {
          ray.x = -300;
          ray.y = -100 + Math.random() * 200;
        }
      }

      /* ── Floating rings ── */
      for (const ring of rings) {
        // Breathing alpha
        const breath = 0.7 + Math.sin(time * ring.breathSpeed + ring.breathPhase) * 0.3;
        const alpha = ring.alpha * breath;

        // Drift
        ring.x += ring.vx;
        ring.y += ring.vy;
        ring.rotation += ring.rotSpeed;

        // Mouse influence — tilt rings slightly toward cursor
        const dx = mouse.x - ring.x;
        const dy = mouse.y - ring.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let tiltMod = ring.tilt;
        if (dist < 250 && dist > 1) {
          const influence = ((250 - dist) / 250) * 0.15;
          tiltMod = ring.tilt + influence;
          // Slight attraction
          ring.x += (dx / dist) * influence * 0.3;
          ring.y += (dy / dist) * influence * 0.3;
        }

        // Wrap
        if (ring.x < -ring.radius * 2) ring.x = canvas.width + ring.radius;
        if (ring.x > canvas.width + ring.radius * 2) ring.x = -ring.radius;
        if (ring.y < -ring.radius * 2) ring.y = canvas.height + ring.radius;
        if (ring.y > canvas.height + ring.radius * 2) ring.y = -ring.radius;

        // Draw ring arc with perspective tilt
        ctx.save();
        ctx.translate(ring.x, ring.y);
        ctx.rotate(ring.rotation);
        ctx.scale(1, tiltMod);

        ctx.beginPath();
        ctx.arc(0, 0, ring.radius, ring.arcStart, ring.arcEnd);
        ctx.strokeStyle = `hsla(${ring.hue}, ${ring.sat}%, ${ring.lit}%, ${alpha})`;
        ctx.lineWidth = ring.lineWidth;
        ctx.stroke();

        // Second inner ring (thinner, offset)
        if (ring.radius > 50) {
          ctx.beginPath();
          ctx.arc(0, 0, ring.radius * 0.75, ring.arcStart + 0.5, ring.arcEnd - 0.3);
          ctx.strokeStyle = `hsla(${ring.hue}, ${ring.sat}%, ${ring.lit + 10}%, ${alpha * 0.5})`;
          ctx.lineWidth = ring.lineWidth * 0.5;
          ctx.stroke();
        }

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
        ctx.fillStyle = `hsla(${s.hue}, 40%, 70%, ${alpha})`;
        ctx.fill();
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
