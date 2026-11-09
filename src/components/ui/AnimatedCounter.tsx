import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ end, suffix = '', duration = 2000 }: AnimatedCounterProps) {
  const { ref, isVisible } = useScrollReveal<HTMLSpanElement>();
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isVisible) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setCount(end);
      return;
    }

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}
