import React, { useEffect, useRef } from 'react';
import anime from 'animejs'; 

/**
 * Enhanced animated gradient background with anime.js
 * Creates flowing gradient animation with smooth transitions
 */
export function AnimatedGradientBg({ colors = ['#ffffff', '#f0f9ff', '#f0fff4'] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animate gradient background using anime.js
    anime({
      targets: container,
      backgroundPosition: ['0% 0%', '100% 100%'],
      duration: 20000,
      loop: true,
      direction: 'alternate',
      easing: 'linear'
    });

    // Animate opacity for breathing effect
    anime({
      targets: container,
      opacity: [0.95, 1],
      duration: 3000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine'
    });

  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
        backgroundSize: '200% 200%',
        backgroundPosition: '0% 0%',
        transition: 'background 0.5s ease'
      }}
    />
  );
}

/**
 * Galaxy effect with stars and nebulas
 */
export function GalaxyEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    let nebulae = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initScene();
    };

    // Initialize scene
    const initScene = () => {
      stars = [];
      nebulae = [];
      
      // Create stars
      const starCount = Math.floor((canvas.width * canvas.height) / 4000);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          brightness: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.3,
          twinkleSpeed: Math.random() * 0.05
        });
      }
      
      // Create nebulae
      const nebulaCount = 4;
      for (let i = 0; i < nebulaCount; i++) {
        nebulae.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 300 + 200,
          color: `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 150 + 100)}, ${Math.floor(Math.random() * 200 + 50)}, 0.03)`,
          pulseSpeed: Math.random() * 0.003 + 0.001
        });
      }
    };

    // Draw scene
    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw nebulae
      nebulae.forEach(nebula => {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Nebula pulse
        nebula.radius += Math.sin(Date.now() * nebula.pulseSpeed) * 0.2;
      });
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();
        
        // Update star
        star.y += star.speed;
        star.brightness += star.twinkleSpeed;
        
        if (star.brightness > 1 || star.brightness < 0.2) {
          star.twinkleSpeed *= -1;
        }
        
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
    };

    // Animation loop
    const animate = () => {
      drawScene();
      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    animate();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}

/**
 * Interactive spark effect
 */
export function SparkEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let sparks = [];
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSparks();
    };

    const initSparks = () => {
      sparks = [];
      const sparkCount = 80;
      
      for (let i = 0; i < sparkCount; i++) {
        sparks.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          size: Math.random() * 2 + 0.5,
          life: Math.random() * 100 + 50,
          maxLife: 150,
          color: `hsl(${Math.random() * 60 + 150}, 100%, 70%)`
        });
      }
    };

    const drawSparks = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      sparks.forEach(spark => {
        // Draw spark
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.fill();
        
        // Draw trail
        ctx.beginPath();
        ctx.moveTo(spark.x, spark.y);
        ctx.lineTo(spark.x - spark.vx * 2, spark.y - spark.vy * 2);
        ctx.strokeStyle = `${spark.color}80`;
        ctx.lineWidth = spark.size / 2;
        ctx.stroke();
        
        // Update spark
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.life--;
        
        // Bounce off edges
        if (spark.x < 0 || spark.x > canvas.width) spark.vx *= -0.8;
        if (spark.y < 0 || spark.y > canvas.height) spark.vy *= -0.8;
        
        // Reset if dead
        if (spark.life <= 0) {
          spark.x = Math.random() * canvas.width;
          spark.y = Math.random() * canvas.height;
          spark.life = spark.maxLife;
        }
      });
    };

    const animate = () => {
      drawSparks();
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}

export default AnimatedGradientBg;