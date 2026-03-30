import { useEffect, useRef } from "react";

export default function NexoraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let shootingStars = [];

    const connectionDistance = 150;
    const mouseConnectionDistance = 200;
    const mouseRepelDistance = 100;
    const particleSpeedOptions = [0.15, 0.3, 0.5];

    const mouse = { x: -1000, y: -1000, isClicked: false };

    const handleMouseMove = (e) => {
      // e.pageX/pageY = document coords; canvas starts at page origin
      mouse.x = e.pageX;
      mouse.y = e.pageY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isClicked = false;
    };
    const handleMouseDown = () => { mouse.isClicked = true; };
    const handleMouseUp = () => { mouse.isClicked = false; };

    const parent = canvas.parentElement;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    // Use document for mouseleave — parent has pointer-events:none so fires instantly
    document.addEventListener("mouseleave", handleMouseLeave);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        const speed = particleSpeedOptions[Math.floor(Math.random() * particleSpeedOptions.length)];
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.baseRadius = Math.random() * 1.5 + 1;
        this.radius = this.baseRadius;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += 0.05;
        this.radius = this.baseRadius + Math.sin(this.angle) * 0.5;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelDist = mouse.isClicked ? mouseRepelDistance * 2.5 : mouseRepelDistance;

        if (distance < repelDist) {
          const force = (repelDist - distance) / repelDist;
          const strength = mouse.isClicked ? 15 : 3;
          this.x -= (dx / distance) * force * strength;
          this.y -= (dy / distance) * force * strength;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 200, 0.8)";
        ctx.fill();
      }
    }

    class ShootingStar {
      constructor(sx, sy, tx, ty) {
        this.x = sx;
        this.y = sy;
        const dx = tx - sx;
        const dy = ty - sy;
        const angle = Math.atan2(dy, dx);
        const speed = Math.random() * 4 + 6;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.maxLife = Math.random() * 40 + 30;
        this.life = this.maxLife;
        this.history = [];
      }

      update() {
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > 12) this.history.shift();
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 1.5;
      }

      draw() {
        ctx.beginPath();
        for (let i = 0; i < this.history.length; i++) {
          const p = this.history[i];
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(0, 212, 200, ${(this.life / this.maxLife) * 0.9})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.life / this.maxLife})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      shootingStars = [];
      const count = Math.min(Math.max(Math.floor((canvas.width * canvas.height) / 12000), 40), 100);
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 200, ${(1 - dist / connectionDistance) * 0.3})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        if (mouse.x > 0 && mouse.y > 0) {
          const mdx = particles[i].x - mouse.x;
          const mdy = particles[i].y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < mouseConnectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 200, ${(1 - mDist / mouseConnectionDistance) * (mouse.isClicked ? 0.9 : 0.5)})`;
            ctx.lineWidth = mouse.isClicked ? 1.5 : 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.03 && particles.length > 2) {
        const p1 = particles[Math.floor(Math.random() * particles.length)];
        const p2 = particles[Math.floor(Math.random() * particles.length)];
        if (p1 !== p2) shootingStars.push(new ShootingStar(p1.x, p1.y, p2.x, p2.y));
      }

      for (const p of particles) { p.update(); p.draw(); }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        shootingStars[i].update();
        shootingStars[i].draw();
        if (shootingStars[i].life <= 0) shootingStars.splice(i, 1);
      }

      drawConnections();

      if (mouse.x > 0 && mouse.y > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.isClicked ? 5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.shadowBlur = mouse.isClicked ? 20 : 10;
        ctx.shadowColor = "rgba(0, 212, 200, 1)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      initParticles();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
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
