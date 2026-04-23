'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ScrollReveal.module.css';

const DEFAULT_ROOT_MARGIN = '0px 0px -12% 0px';

function isInitiallyVisible(node) {
  if (typeof window === 'undefined' || !node) {
    return false;
  }

  const { top, bottom } = node.getBoundingClientRect();
  return top < window.innerHeight * 0.88 && bottom > 0;
}

export default function ScrollReveal({
  as = 'div',
  children,
  className = '',
  variant = 'rise',
  delay = 0,
  distance = 24,
  threshold = 0.2,
  rootMargin = DEFAULT_ROOT_MARGIN,
  once = true,
  style,
  ...props
}) {
  const ref = useRef(null);
  const [state, setState] = useState('hidden');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', syncPreference);
      return () => mediaQuery.removeEventListener('change', syncPreference);
    }

    mediaQuery.addListener(syncPreference);
    return () => mediaQuery.removeListener(syncPreference);
  }, []);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    if (prefersReducedMotion) {
      setState('instant');
      return undefined;
    }

    if (isInitiallyVisible(node) || typeof IntersectionObserver === 'undefined') {
      setState('instant');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setState('visible');

          if (once) {
            observer.unobserve(entry.target);
          }

          return;
        }

        if (!once) {
          setState('hidden');
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, prefersReducedMotion, rootMargin, threshold]);

  const Component = as;
  const variantClassName = styles[variant] ?? styles.rise;
  const stateClassName =
    state === 'visible' ? styles.visible : state === 'instant' ? styles.instant : '';
  const combinedClassName = [styles.reveal, variantClassName, stateClassName, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      ref={ref}
      className={combinedClassName}
      data-reveal-state={state}
      style={{
        '--reveal-delay': `${delay}ms`,
        '--reveal-distance': `${distance}px`,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
