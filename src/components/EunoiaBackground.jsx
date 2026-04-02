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
    const RING_COUNT = 85; // Increased for more density

    /* ── Light rays ── */
    const rays = [];
    const RAY_COUNT = 18; // More dramatic light beams

    /* ── Tiny accent sparkles ── */
    const sparks = [];
    const SPARK_COUNT = 180; // Denser sparkle field

    /* ── Floating jewelry particles ── */
    const gems = [];
    const GEM_COUNT = 25; // New: floating gem shapes

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }

    function makeRing() {
      const sizeTier = Math.random();
      let radius, lineWidth, alpha;

      // Three size tiers for more visual variety
      if (sizeTier < 0.2) { // Large statement rings
        radius = 120 + Math.random() * 80;
        lineWidth = 2.5 + Math.random() * 2.5;
        alpha = 0.25 + Math.random() * 0.35;
      } else if (sizeTier < 0.6) { // Medium rings
        radius = 50 + Math.random() * 70;
        lineWidth = 1.5 + Math.random() * 1.5;
        alpha = 0.18 + Math.random() * 0.3;
      } else { // Small delicate rings
        radius = 20 + Math.random() * 30;
        lineWidth = 0.8 + Math.random() * 1.2;
        alpha = 0.15 + Math.random() * 0.25;
      }

      // More varied movement patterns
      const movementType = Math.random();
      let vx, vy, rotSpeed;

      if (movementType < 0.3) { // Slow drifters
        vx = (Math.random() - 0.5) * 0.15;
        vy = (Math.random() - 0.5) * 0.12;
        rotSpeed = (Math.random() - 0.5) * 0.002;
      } else if (movementType < 0.7) { // Moderate movers
        vx = (Math.random() - 0.5) * 0.35;
        vy = (Math.random() - 0.5) * 0.25;
        rotSpeed = (Math.random() - 0.5) * 0.004;
      } else { // Active dancers
        vx = (Math.random() - 0.5) * 0.5;
        vy = (Math.random() - 0.5) * 0.35;
        rotSpeed = (Math.random() - 0.5) * 0.008;
      }

      // Extended color palette with rose gold accents
      const colorTier = Math.random();
      let hue, sat, lit;

      if (colorTier < 0.5) { // Classic gold
        hue = 35 + Math.random() * 25;
        sat = 55 + Math.random() * 35;
        lit = 55 + Math.random() * 25;
      } else if (colorTier < 0.8) { // Rose gold
        hue = 10 + Math.random() * 20;
        sat = 45 + Math.random() * 30;
        lit = 60 + Math.random() * 20;
      } else { // Champagne/white gold
        hue = 45 + Math.random() * 15;
        sat = 25 + Math.random() * 25;
        lit = 70 + Math.random() * 15;
      }

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        vx,
        vy,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed,
        tilt: 0.25 + Math.random() * 0.6,
        alpha,
        lineWidth,
        arcStart: Math.random() * Math.PI * 2,
        arcEnd: Math.PI + Math.random() * Math.PI * 1.5,
        hue,
        sat,
        lit,
        breathPhase: Math.random() * Math.PI * 2,
        breathSpeed: 0.001 + Math.random() * 0.006,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.0005 + Math.random() * 0.001,
        wobbleAmount: 0.02 + Math.random() * 0.08,
      };
    }

    function makeRay() {
      const rayType = Math.random();
      return {
        x: Math.random() * canvas.width * 1.5 - canvas.width * 0.25,
        y: -100,
        angle: 0.3 + Math.random() * 0.4,
        width: 120 + Math.random() * 280,
        length: canvas.height * (0.5 + Math.random() * 0.8),
        speed: 0.25 + Math.random() * 0.5, // Wider speed range
        alpha: 0.05 + Math.random() * 0.08, // More visible
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.001 + Math.random() * 0.003,
        rayType: rayType < 0.3 ? 'wide' : rayType < 0.7 ? 'medium' : 'narrow',
        sweepAngle: (Math.random() - 0.5) * 0.3, // Gentle sweeping motion
      };
    }

    function makeGem(randomY) {
      const gemTypes = ['diamond', 'oval', 'pear', 'emerald'];
      const type = gemTypes[Math.floor(Math.random() * gemTypes.length)];
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : -20,
        size: 3 + Math.random() * 6,
        vx: (Math.random() - 0.5) * 0.3,
        vy: 0.02 + Math.random() * 0.04, // Slow fall
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        alpha: 0.4 + Math.random() * 0.4,
        hue: Math.random() < 0.7 ? 35 + Math.random() * 25 : 180 + Math.random() * 40, // Gold or diamond blue
        facets: 4 + Math.floor(Math.random() * 4),
        sparklePhase: Math.random() * Math.PI * 2,
        sparkleSpeed: 0.02 + Math.random() * 0.05,
      };
    }

    function makeSpark(randomY) {
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : canvas.height + 10,
        r: 0.8 + Math.random() * 2.2, // bigger sparkles (was 0.4–1.6)
        vx: (Math.random() - 0.5) * 0.22,
        vy: -(0.06 + Math.random() * 0.18), // faster rise
        alpha: 0.3 + Math.random() * 0.55, // was 0.1–0.4
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.025 + Math.random() * 0.04,
        hue: 35 + Math.random() * 25,
      };
    }

    function init() {
      rings.length = 0;
      rays.length = 0;
      sparks.length = 0;
      gems.length = 0;
      for (let i = 0; i < RING_COUNT; i++) rings.push(makeRing());
      for (let i = 0; i < RAY_COUNT; i++) rays.push(makeRay());
      for (let i = 0; i < SPARK_COUNT; i++) sparks.push(makeSpark(true));
      for (let i = 0; i < GEM_COUNT; i++) gems.push(makeGem(true));
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

        // Sweep and drift
        ray.angle += ray.sweepAngle * 0.002;
        ray.x += ray.speed * 0.5;
        if (ray.x > canvas.width + 300) {
          ray.x = -300;
          ray.y = -100 + Math.random() * 200;
          ray.angle = 0.3 + Math.random() * 0.4; // Reset angle
        }
      }

      /* ── Floating rings ── */
      for (const ring of rings) {
        // Breathing alpha
        const breath = 0.6 + Math.sin(time * ring.breathSpeed + ring.breathPhase) * 0.4;
        const alpha = ring.alpha * breath;

        // Drift
        ring.x += ring.vx;
        ring.y += ring.vy;
        ring.rotation += ring.rotSpeed;

        // Mouse influence
        const dx = mouse.x - ring.x;
        const dy = mouse.y - ring.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let tiltMod = ring.tilt;
        if (dist < 300 && dist > 1) {
          const influence = ((300 - dist) / 300) * 0.25;
          tiltMod = ring.tilt + influence;
          ring.x += (dx / dist) * influence * 0.5;
          ring.y += (dy / dist) * influence * 0.5;
        }

        // Wrap
        if (ring.x < -ring.radius * 2) ring.x = canvas.width + ring.radius;
        if (ring.x > canvas.width + ring.radius * 2) ring.x = -ring.radius;
        if (ring.y < -ring.radius * 2) ring.y = canvas.height + ring.radius;
        if (ring.y > canvas.height + ring.radius * 2) ring.y = -ring.radius;

        // Wobble effect for more organic movement
        const wobble = Math.sin(time * ring.wobbleSpeed + ring.wobblePhase) * ring.wobbleAmount;
        const finalTilt = tiltMod + wobble;

        // Draw ring arc with perspective tilt and wobble
        ctx.save();
        ctx.translate(ring.x, ring.y);
        ctx.rotate(ring.rotation);
        ctx.scale(1, finalTilt);

        ctx.beginPath();
        ctx.arc(0, 0, ring.radius, ring.arcStart, ring.arcEnd);
        ctx.strokeStyle = `hsla(${ring.hue}, ${ring.sat}%, ${ring.lit}%, ${alpha})`;
        ctx.lineWidth = ring.lineWidth;
        ctx.stroke();

        // Second inner ring (thinner, offset) - more visible
        if (ring.radius > 50) {
          ctx.beginPath();
          ctx.arc(0, 0, ring.radius * 0.75, ring.arcStart + 0.5, ring.arcEnd - 0.3);
          ctx.strokeStyle = `hsla(${ring.hue}, ${ring.sat}%, ${ring.lit + 15}%, ${alpha * 0.7})`;
          ctx.lineWidth = ring.lineWidth * 0.6;
          ctx.stroke();
        }

        // Third accent ring for large rings
        if (ring.radius > 80) {
          ctx.beginPath();
          ctx.arc(0, 0, ring.radius * 0.5, ring.arcStart - 0.3, ring.arcEnd - 0.8);
          ctx.strokeStyle = `hsla(${ring.hue}, ${ring.sat}%, ${ring.lit + 20}%, ${alpha * 0.5})`;
          ctx.lineWidth = ring.lineWidth * 0.4;
          ctx.stroke();
        }

        ctx.restore();
      }

      /* ── Accent sparkles ── */
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        const tw = 0.3 + Math.sin(time * s.twinkle + s.phase) * 0.7;
        const alpha = s.alpha * tw;

        s.x += s.vx;
        s.y += s.vy;

        if (s.y < -10 || s.x < -10 || s.x > canvas.width + 10) {
          sparks[i] = makeSpark(false);
          continue;
        }

        // Draw a 4-point star cross for bigger sparkles
        if (s.r > 1.5) {
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.strokeStyle = `hsla(${s.hue}, 60%, 80%, ${alpha * 0.6})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(-s.r * 2.5, 0); ctx.lineTo(s.r * 2.5, 0);
          ctx.moveTo(0, -s.r * 2.5); ctx.lineTo(0, s.r * 2.5);
          ctx.stroke();
          ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 60%, 78%, ${alpha})`;
        ctx.fill();
      }

      /* ── Floating gems ── */
      for (let i = 0; i < gems.length; i++) {
        const g = gems[i];
        const sparkle = 0.5 + Math.sin(time * g.sparkleSpeed + g.sparklePhase) * 0.5;
        const alpha = g.alpha * sparkle;

        g.x += g.vx;
        g.y += g.vy;
        g.rotation += g.rotSpeed;

        // Wrap around
        if (g.y > canvas.height + 20) {
          gems[i] = makeGem(false); // Reset to top
          continue;
        }
        if (g.x < -20) g.x = canvas.width + 20;
        if (g.x > canvas.width + 20) g.x = -20;

        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(g.rotation);

        // Draw faceted gem shape
        ctx.beginPath();
        const facets = g.facets;
        for (let f = 0; f < facets * 2; f++) {
          const angle = (Math.PI * 2 * f) / (facets * 2);
          const r = f % 2 === 0 ? g.size : g.size * 0.6;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (f === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        // Gem fill with gradient effect
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, g.size);
        grad.addColorStop(0, `hsla(${g.hue}, 70%, 85%, ${alpha})`);
        grad.addColorStop(0.5, `hsla(${g.hue}, 60%, 70%, ${alpha * 0.8})`);
        grad.addColorStop(1, `hsla(${g.hue}, 50%, 50%, ${alpha * 0.6})`);
        ctx.fillStyle = grad;
        ctx.fill();

        // Gem outline
        ctx.strokeStyle = `hsla(${g.hue}, 70%, 80%, ${alpha * 0.8})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Highlight facet
        ctx.beginPath();
        ctx.moveTo(-g.size * 0.3, -g.size * 0.3);
        ctx.lineTo(0, -g.size * 0.5);
        ctx.lineTo(g.size * 0.3, -g.size * 0.3);
        ctx.strokeStyle = `hsla(0, 0%, 100%, ${alpha * 0.6})`;
        ctx.stroke();

        ctx.restore();
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
