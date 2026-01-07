import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for fade-in and slide animations on scroll
 */
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  
  useEffect(() => {
    if (!ref.current) return;

    const defaults = {
      duration: 0.8,
      delay: 0,
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ...options
    };

    // Initial state
    gsap.set(ref.current, {
      opacity: 0,
      y: defaults.y
    });

    // Animation on scroll
    gsap.to(ref.current, {
      opacity: 1,
      y: 0,
      duration: defaults.duration,
      delay: defaults.delay,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'top 50%',
        scrub: false,
        markers: false
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [options]);

  return ref;
};

/**
 * Hook for parallax scroll effect
 */
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: (i, target) => gsap.getProperty(target, 'offsetHeight') * speed,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);

  return ref;
};

/**
 * Hook for staggered list animations
 */
export const useStaggerAnimation = (selector = '.card', options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const defaults = {
      duration: 0.6,
      delay: 0.1,
      y: 40,
      opacity: 0,
      ...options
    };

    gsap.set(ref.current.querySelectorAll(selector), {
      opacity: 0,
      y: defaults.y
    });

    gsap.to(ref.current.querySelectorAll(selector), {
      opacity: 1,
      y: 0,
      duration: defaults.duration,
      stagger: defaults.delay,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%',
        end: 'top 25%',
        scrub: false
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selector, options]);

  return ref;
};

/**
 * Hook for rotate and scale animations
 */
export const useRotateScale = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.set(ref.current, {
      opacity: 0,
      rotationY: -90,
      scale: 0.8
    });

    gsap.to(ref.current, {
      opacity: 1,
      rotationY: 0,
      scale: 1,
      duration: 0.8,
      ease: 'back.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%',
        end: 'top 25%',
        scrub: false
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return ref;
};

/**
 * Hook for counter animation (number increment)
 */
export const useCounter = (target = 100, duration = 2) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      textContent: target,
      duration: duration,
      ease: 'power2.out',
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [target, duration]);

  return ref;
};
