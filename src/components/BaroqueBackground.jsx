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

    const parent = canvas.parentElement;
    const isMobile = () => window.innerWidth < 768;

    // Warm color palette for candle embers
    const emberColors = [
      { r: 200, g: 140, b: 60 },   // warm gold
      { r: 180, g: 100, b: 40 },   // deep amber
      { r: 220, g: 160, b: 80 },   // light gold
      { r: 160, g: 70, b: 50 },    // burgundy glow
      { r: 230, g: 180, b: 100 },  // pale flame
    ];

    class Ember {
      constructor() {
        this.reset();
      }

      reset() {
        // Embers originate from the lower portion of the canvas
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 40;

        // Slow upward drift with gentle horizontal sway
        this.vy = -(Math.random() * 0.6 + 0.2);
        this.vx = (Math.random() - 0.5) * 0.3;

        // Sway parameters
        this.swayAmplitude = Math.random() * 0.8 + 0.2;
        this.swaySpeed = Math.random() * 0.015 + 0.005;
        this.swayOffset = Math.random() * Math.PI * 2;

        // Size and life
        this.baseRadius = Math.random() * 2.5 + 0.8;
        this.radius = this.baseRadius;
        this.maxLife = Math.random() * 400 + 200;
        this.life = this.maxLife;

        // Flickering
        this.flickerSpeed = Math.random() * 0.08 + 0.03;
        this.flickerOffset = Math.random() * Math.PI * 2;

        // Color
        this.color = emberColors[Math.floor(Math.random() * emberColors.length)];

        // Glow intensity
        this.glowSize = Math.random() * 15 + 8;
      }

      update(time) {
        // Gentle upward float
        this.y += this.vy;
        this.x += this.vx + Math.sin(time * this.swaySpeed + this.swayOffset) * this.swayAmplitude * 0.3;

        // Decrease life
        this.life -= 1;

        // Flicker the radius
        const flicker = Math.sin(time * this.flickerSpeed + this.flickerOffset);
        this.radius = this.baseRadius * (0.7 + flicker * 0.3);

        // Reset when dead or off-screen
        if (this.life <= 0 || this.y < -20) {
          this.reset();
        }
      }

      draw(time) {
        const lifeRatio = this.life / this.maxLife;
        // Fade in during the first 10%, fade out during the last 30%
        let alpha;
        if (lifeRatio > 0.9) {
          alpha = (1 - lifeRatio) / 0.1;
        } else if (lifeRatio < 0.3) {
          alpha = lifeRatio / 0.3;
        } else {
          alpha = 1;
        }

        // Flicker the alpha slightly
        const flicker = Math.sin(time * this.flickerSpeed * 2 + this.flickerOffset);
        alpha *= (0.6 + flicker * 0.4);
        alpha = Math.max(0, Math.min(1, alpha));

        const { r, g, b } = this.color;

        // Outer glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.glowSize * lifeRatio
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`);
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.1})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowSize * lifeRatio, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.min(r + 40, 255)}, ${Math.min(g + 30, 255)}, ${b}, ${alpha * 0.9})`;
        ctx.fill();
      }
    }

    const initEmbers = () => {
      embers = [];
      const count = isMobile() ? 30 : 55;
      for (let i = 0; i < count; i++) {
        const ember = new Ember();
        // Stagger initial positions so they don't all start from the bottom
        ember.y = Math.random() * canvas.height;
        ember.life = Math.random() * ember.maxLife;
        embers.push(ember);
      }
    };

    let time = 0;

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const ember of embers) {
        ember.update(time);
        ember.draw(time);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      initEmbers();
    };

    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: "transparent" }}
    />
  );
}
