import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wrapper component for applying scroll-triggered animations
 */
export default function ScrollAnimation({ children, className = '', animationType = 'fadeUp', delay = 0 }) {
  const ref = React.useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const animations = {
      fadeUp: { y: 50, opacity: 0, final: { y: 0, opacity: 1 } },
      fadeDown: { y: -50, opacity: 0, final: { y: 0, opacity: 1 } },
      fadeLeft: { x: 50, opacity: 0, final: { x: 0, opacity: 1 } },
      fadeRight: { x: -50, opacity: 0, final: { x: 0, opacity: 1 } },
      scale: { scale: 0.8, opacity: 0, final: { scale: 1, opacity: 1 } },
      rotate: { rotation: -10, opacity: 0, final: { rotation: 0, opacity: 1 } },
      flip: { rotationY: 90, opacity: 0, final: { rotationY: 0, opacity: 1 } },
    };

    const config = animations[animationType] || animations.fadeUp;

    gsap.set(ref.current, config);

    gsap.to(ref.current, {
      ...config.final,
      duration: 0.8,
      delay: delay * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        end: 'top 50%',
        scrub: false,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animationType, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
