import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas({ 
  className = '',
  particleCount = 150,
  connectDistance = 150
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let mouse = { x: 0, y: 0, radius: 100 };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 2 + 1,
          color: `rgba(0, 200, 150, ${Math.random() * 0.5 + 0.1})`,
          originalColor: `rgba(0, 200, 150, ${Math.random() * 0.5 + 0.1})`,
          mouseColor: `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`
        });
      }
    };

    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.9;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.9;

        // Mouse interaction
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          // Repel from mouse
          const force = (mouse.radius - distance) / mouse.radius;
          particle.x -= dx * force * 0.05;
          particle.y -= dy * force * 0.05;
          
          // Change color near mouse
          particle.color = particle.mouseColor;
        } else {
          particle.color = particle.originalColor;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx2 = particles[j].x - particle.x;
          const dy2 = particles[j].y - particle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < connectDistance) {
            // Create gradient line
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, particles[j].color);

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5 * (1 - distance2 / connectDistance);
            ctx.stroke();
          }
        }
      });
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    // Animation loop
    const animate = () => {
      drawParticles();
      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    animate();
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particleCount, connectDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-canvas ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}