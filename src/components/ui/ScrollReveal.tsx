import { type ReactNode, useEffect, useState, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

const transforms: Record<string, string> = {
  up: 'translateY(40px)',
  down: 'translateY(-40px)',
  left: 'translateX(40px)',
  right: 'translateX(-40px)',
};

export function ScrollReveal({ children, className = '', direction = 'up', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'enter' | 'hidden' | 'visible'>('enter');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    setPhase('hidden');

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setPhase('visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isHidden = phase === 'hidden';
  const isVisible = phase === 'visible';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : isHidden ? 0 : 1,
        transform: isVisible ? 'translate(0,0)' : isHidden ? transforms[direction] : 'none',
        transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
