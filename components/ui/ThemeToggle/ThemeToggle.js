'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.7 5.3 17 7M7 17l-1.7 1.7M18.7 18.7 17 17M7 7 5.3 5.3" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 14.2A8.8 8.8 0 0 1 9.8 4a9 9 0 1 0 10.2 10.2Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme || 'light';
    setTheme(currentTheme);
  }, []);

  function handleToggle() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
