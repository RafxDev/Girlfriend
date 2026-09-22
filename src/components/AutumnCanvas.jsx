import React, { useEffect, useRef } from 'react';

export default function AutumnCanvas({ isNightMode = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle types: Autumn leaves, glowing fireflies, yellow petals
    const leavesColors = isNightMode 
      ? ['#a16207', '#78350f', '#451a03', '#ca8a04'] 
      : ['#ea580c', '#c2410c', '#d97706', '#b45309', '#f59e0b'];

    const particleCount = window.innerWidth < 768 ? 24 : 45;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 9 + 6,
        speedY: Math.random() * 0.7 + 0.4,
        speedX: Math.random() * 0.9 - 0.2,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        color: leavesColors[Math.floor(Math.random() * leavesColors.length)],
        isFirefly: isNightMode && Math.random() > 0.45,
        fireflyAlpha: Math.random(),
        fireflySpeed: Math.random() * 0.03 + 0.01,
        petalGlow: Math.random() > 0.7,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 0.8 + p.speedX;
        p.angle += p.angularSpeed;

        // Wrap around borders
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);

        if (p.isFirefly) {
          // Firefly glow
          p.fireflyAlpha += p.fireflySpeed;
          const alpha = (Math.sin(p.fireflyAlpha) + 1) / 2 * 0.7 + 0.2;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(253, 224, 71, ${alpha})`;
          ctx.shadowColor = '#facc15';
          ctx.shadowBlur = 10;
          ctx.fill();
        } else {
          // Autumn leaf or yellow flower petal
          ctx.rotate(p.angle);
          ctx.beginPath();
          // Stylized curved leaf / petal shape
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.7, -p.size * 0.3, p.size * 0.2, p.size);
          ctx.quadraticCurveTo(-p.size * 0.7, -p.size * 0.3, 0, -p.size);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = isNightMode ? 0.45 : 0.65;
          ctx.fill();

          // Leaf vein
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 0.8);
          ctx.lineTo(0, p.size * 0.8);
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isNightMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
}
