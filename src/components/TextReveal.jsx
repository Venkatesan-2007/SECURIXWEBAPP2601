import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Advanced text animation component with character reveal
 * Animates text character by character or by lines
 */
export function TextReveal({ children, className = '', charByChar = false, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (charByChar) {
      // Split into characters
      const text = element.textContent;
      element.innerHTML = '';
      const chars = text.split('').map((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        element.appendChild(span);
        return span;
      });

      gsap.from(chars, {
        opacity: 0,
        y: 20,
        rotationX: 90,
        stagger: 0.05,
        duration: 0.6,
        delay: delay * 0.1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 50%',
          markers: false,
        },
      });
    } else {
      // Animate as whole text
      gsap.from(element, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: delay * 0.1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 50%',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [charByChar, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Gradient animated text component
 * Text with flowing gradient animation on hover
 */
export function GradientText({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        backgroundPosition: '200% center',
        duration: 1,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        background: 'linear-gradient(90deg, #1a365d, #00C853, #7c3aed, #1a365d)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      {children}
    </span>
  );
}

/**
 * Number counter with animation
 * Counts from 0 to target on scroll
 */
export function CounterNumber({ target = 100, suffix = '', prefix = '', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const counter = { value: 0 };

    gsap.to(counter, {
      value: target,
      duration: 2,
      delay: delay * 0.1,
      onUpdate: () => {
        element.textContent = `${prefix}${Math.floor(counter.value)}${suffix}`;
      },
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 50%',
        once: true,
      },
      ease: 'power2.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [target, suffix, prefix, delay]);

  return (
    <span
      ref={ref}
      style={{
        color: '#00C853',
        fontWeight: 'bold',
        fontSize: '1.5em',
        textShadow: '0 0 10px rgba(0, 200, 83, 0.3)',
      }}
    >
      0{suffix}
    </span>
  );
}

export default TextReveal;
