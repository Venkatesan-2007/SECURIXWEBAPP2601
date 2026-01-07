import { useEffect, useRef } from 'react';

/**
 * Magnetic hover effect - element follows cursor movement
 * @param {number} strength - How strongly element follows cursor (0-1)
 * @returns {React.RefObject} - Ref to attach to element
 */
export function useMagneticHover(strength = 0.5) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distX = (e.clientX - centerX) * strength * 0.1;
      const distY = (e.clientY - centerY) * strength * 0.1;
      
      element.style.setProperty('--tx', `${distX}px`);
      element.style.setProperty('--ty', `${distY}px`);
      element.style.transform = `translate(${distX}px, ${distY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
}

/**
 * Tilt effect based on mouse position
 * @param {number} maxTilt - Maximum tilt angle in degrees
 * @returns {React.RefObject} - Ref to attach to element
 */
export function useTiltEffect(maxTilt = 10) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);
      
      const tiltX = percentY * maxTilt;
      const tiltY = percentX * -maxTilt;
      
      element.style.transform = `
        perspective(1000px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale(1.02)
      `;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt]);

  return ref;
}

/**
 * Glow effect that follows cursor
 * @param {string} glowColor - Color for glow effect
 * @returns {React.RefObject} - Ref to attach to element
 */
export function useGlowEffect(glowColor = 'rgba(0, 200, 83, 0.5)') {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      element.style.setProperty('--glow-x', `${x}px`);
      element.style.setProperty('--glow-y', `${y}px`);
      element.style.setProperty('--glow-color', glowColor);
    };

    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [glowColor]);

  return ref;
}

/**
 * Smooth parallax effect on scroll
 * @param {number} speed - Parallax speed multiplier
 * @returns {React.RefObject} - Ref to attach to element
 */
export function useParallaxElement(speed = 0.5) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const yPos = rect.top * speed;
      element.style.transform = `translateY(${yPos}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return ref;
}
