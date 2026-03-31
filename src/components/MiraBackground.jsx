import { useEffect, useRef } from "react";

/**
 * Mira Skincare — soft radial glow that follows the mouse.
 * A large, smooth mauve/blush gradient bloom tracks the cursor position,
 * creating a gentle luminous aura across the page.
 */
export default function MiraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    // Smoothed position (lerps toward target)
    let current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let target = { x: current.x, y: current.y };
    const LERP = 0.04;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth interpolation
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;

      const x = current.x;
      const y = current.y;
      const r = Math.max(canvas.width, canvas.height) * 0.45;

      // Primary mauve glow
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, "rgba(196,132,154,0.18)");
      grad.addColorStop(0.3, "rgba(196,132,154,0.10)");
      grad.addColorStop(0.6, "rgba(180,120,150,0.04)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Smaller inner blush highlight
      const r2 = r * 0.35;
      const grad2 = ctx.createRadialGradient(x, y, 0, x, y, r2);
      grad2.addColorStop(0, "rgba(232,196,208,0.14)");
      grad2.addColorStop(0.5, "rgba(220,180,200,0.06)");
      grad2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(x, y, r2, 0, Math.PI * 2);
      ctx.fillStyle = grad2;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    }

    function onMouseMove(e) {
      target.x = e.clientX;
      target.y = e.clientY + window.scrollY;
    }
    function onMouseLeave() {
      target.x = canvas.width / 2;
      target.y = canvas.height / 2;
    }
    function onTouchMove(e) {
      const touch = e.touches[0];
      if (touch) {
        target.x = touch.clientX;
        target.y = touch.clientY + window.scrollY;
      }
    }
    function onTouchEnd() {
      target.x = canvas.width / 2;
      target.y = canvas.height / 2;
    }

    resize();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
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
