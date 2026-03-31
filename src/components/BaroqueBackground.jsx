import { useEffect, useRef } from "react";

export default function BaroqueBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let embers = [];

    const isMobile = () => window.innerWidth < 768;

    // Mouse/touch state
    const mouse = { x: -1000, y: -1000, isDown: false };

    const mouseAttractRadius = 180;
    const mouseGlowRadius = 120;
    const burstCount = 8;

    // ── Mouse events ──
    const handleMouseMove = (e) => {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
    };
    const handleMouseDown = () => { mouse.isDown = true; spawnBurst(); };
    const handleMouseUp = () => { mouse.isDown = false; };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isDown = false;
    };

    // ── Touch events ──
    const handleTouchMove = (e) => {
      const t = e.touches[0];
      if (!t) return;
      mouse.x = t.pageX;
      mouse.y = t.pageY;
    };
    const handleTouchStart = (e) => {
      const t = e.touches[0];
      if (!t) return;
      mouse.x = t.pageX;
      mouse.y = t.pageY;
      mouse.isDown = true;
      spawnBurst();
    };
    const handleTouchEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isDown = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    // Warm color palette for candle embers
    const emberColors = [
      { r: 200, g: 140, b: 60 },   // warm gold
      { r: 180, g: 100, b: 40 },   // deep amber
      { r: 220, g: 160, b: 80 },   // light gold
      { r: 160, g: 70, b: 50 },    // burgundy glow
      { r: 230, g: 180, b: 100 },  // pale flame
    ];

    // Brighter burst colors
    const burstColors = [
      { r: 255, g: 200, b: 80 },   // bright flame
      { r: 255, g: 160, b: 50 },   // hot orange
      { r: 240, g: 220, b: 130 },  // white-gold
    ];

    class Ember {
      constructor(opts) {
        if (opts) {
          // Burst ember — starts from a specific position with velocity
          this.x = opts.x;
          this.y = opts.y;
          this.vx = opts.vx;
          this.vy = opts.vy;
          this.isBurst = true;
          this.baseRadius = Math.random() * 3 + 1.5;
          this.radius = this.baseRadius;
          this.maxLife = Math.random() * 80 + 40;
          this.life = this.maxLife;
          this.flickerSpeed = Math.random() * 0.12 + 0.06;
          this.flickerOffset = Math.random() * Math.PI * 2;
          this.color = burstColors[Math.floor(Math.random() * burstColors.length)];
          this.glowSize = Math.random() * 20 + 12;
          this.swayAmplitude = 0;
          this.swaySpeed = 0;
          this.swayOffset = 0;
        } else {
          this.isBurst = false;
          this.reset();
        }
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 40;
        this.vy = -(Math.random() * 0.6 + 0.2);
        this.vx = (Math.random() - 0.5) * 0.3;
        this.swayAmplitude = Math.random() * 0.8 + 0.2;
        this.swaySpeed = Math.random() * 0.015 + 0.005;
        this.swayOffset = Math.random() * Math.PI * 2;
        this.baseRadius = Math.random() * 2.5 + 0.8;
        this.radius = this.baseRadius;
        this.maxLife = Math.random() * 400 + 200;
        this.life = this.maxLife;
        this.flickerSpeed = Math.random() * 0.08 + 0.03;
        this.flickerOffset = Math.random() * Math.PI * 2;
        this.color = emberColors[Math.floor(Math.random() * emberColors.length)];
        this.glowSize = Math.random() * 15 + 8;
        this.isBurst = false;
      }

      update(time) {
        // Mouse attraction — embers gently drift toward cursor
        const hasPointer = mouse.x > 0 && mouse.y > 0;
        if (hasPointer && !this.isBurst) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseAttractRadius && dist > 0) {
            const strength = mouse.isDown ? 0.04 : 0.015;
            const force = (1 - dist / mouseAttractRadius) * strength;
            this.x += dx * force;
            this.y += dy * force;
          }
        }

        this.y += this.vy;
        this.x += this.vx + Math.sin(time * this.swaySpeed + this.swayOffset) * this.swayAmplitude * 0.3;

        // Burst embers decelerate and float upward
        if (this.isBurst) {
          this.vx *= 0.97;
          this.vy *= 0.97;
          this.vy -= 0.01; // slight upward drift
        }

        this.life -= 1;

        const flicker = Math.sin(time * this.flickerSpeed + this.flickerOffset);
        this.radius = this.baseRadius * (0.7 + flicker * 0.3);

        if (this.life <= 0 || this.y < -20) {
          if (this.isBurst) {
            this.dead = true;
          } else {
            this.reset();
          }
        }
      }

      draw(time) {
        const lifeRatio = this.life / this.maxLife;
        let alpha;
        if (lifeRatio > 0.9) {
          alpha = (1 - lifeRatio) / 0.1;
        } else if (lifeRatio < 0.3) {
          alpha = lifeRatio / 0.3;
        } else {
          alpha = 1;
        }

        const flicker = Math.sin(time * this.flickerSpeed * 2 + this.flickerOffset);
        alpha *= (0.6 + flicker * 0.4);
        alpha = Math.max(0, Math.min(1, alpha));

        const { r, g, b } = this.color;

        // Outer glow
        const glowR = this.glowSize * lifeRatio;
        if (glowR > 0.5) {
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, glowR
          );
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`);
          gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.1})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.beginPath();
          ctx.arc(this.x, this.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Bright core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.min(r + 40, 255)}, ${Math.min(g + 30, 255)}, ${b}, ${alpha * 0.9})`;
        ctx.fill();
      }
    }

    // Burst effect — spawn embers radiating from cursor on click/tap
    function spawnBurst() {
      if (mouse.x < 0 || mouse.y < 0) return;
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 / burstCount) * i + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 3 + 1.5;
        embers.push(new Ember({
          x: mouse.x,
          y: mouse.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        }));
      }
    }

    const initEmbers = () => {
      embers = [];
      const count = isMobile() ? 35 : 65;
      for (let i = 0; i < count; i++) {
        const ember = new Ember();
        ember.y = Math.random() * canvas.height;
        ember.life = Math.random() * ember.maxLife;
        embers.push(ember);
      }
    };

    let time = 0;

    // Draw warm glow around cursor
    const drawMouseGlow = () => {
      if (mouse.x < 0 || mouse.y < 0) return;

      const r = mouse.isDown ? mouseGlowRadius * 1.6 : mouseGlowRadius;
      const alpha = mouse.isDown ? 0.12 : 0.06;

      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, r
      );
      gradient.addColorStop(0, `rgba(200, 140, 60, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(180, 100, 40, ${alpha * 0.4})`);
      gradient.addColorStop(1, "rgba(180, 100, 40, 0)");

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, r, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawMouseGlow();

      // Clean up dead burst embers
      for (let i = embers.length - 1; i >= 0; i--) {
        if (embers[i].dead) embers.splice(i, 1);
      }

      for (const ember of embers) {
        ember.update(time);
        ember.draw(time);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      // Use the main element (grandparent) scrollHeight for full-page coverage
      const main = canvas.closest("main");
      canvas.width = window.innerWidth;
      canvas.height = main ? main.scrollHeight : document.documentElement.scrollHeight;
      initEmbers();
    };

    // ResizeObserver to track when page content changes height
    const main = canvas.closest("main");
    let resizeObserver;
    if (main && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        const newH = main.scrollHeight;
        if (Math.abs(canvas.height - newH) > 50) {
          canvas.width = window.innerWidth;
          canvas.height = newH;
        }
      });
      resizeObserver.observe(main);
    }

    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      if (resizeObserver) resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 z-0"
      style={{ background: "transparent", width: "100%", pointerEvents: "none" }}
    />
  );
}
