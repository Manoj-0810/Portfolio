import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal<T extends HTMLElement>(
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    start?: string;
  }
) {
  const ref = useRef<T>(null);
  const {
    y = 40,
    duration = 0.7,
    delay = 0,
    stagger = 0.1,
    start = 'top 85%',
  } = options || {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.children.length > 0 ? el.children : [el];
    
    gsap.set(children, { opacity: 0, y });
    
    const triggers: ScrollTrigger[] = [];
    
    Array.from(children).forEach((child, i) => {
      const tween = gsap.to(child, {
        opacity: 1,
        y: 0,
        duration,
        delay: delay + i * stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: child,
          start,
          toggleActions: 'play none none none',
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [y, duration, delay, stagger, start]);

  return ref;
}
