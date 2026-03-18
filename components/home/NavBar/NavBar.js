'use client';

import { useEffect, useRef, useState } from 'react';
import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle';
import styles from './NavBar.module.css';

const links = [
  { href: '/', label: 'Home', id: 'top' },
  { href: '#about', label: 'About', id: 'about' },
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#projects', label: 'Projects', id: 'projects' },
];

export default function NavBar() {
  const [activeSection, setActiveSection] = useState('top');
  const manualTargetRef = useRef(null);
  const manualLockUntilRef = useRef(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const getActiveSection = () => {
      const navOffset = 140;
      const scrollPosition = window.scrollY + navOffset;
      let nextActiveSection = 'top';

      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          nextActiveSection = section.id;
        }
      }

      return nextActiveSection;
    };

    const updateActiveSection = () => {
      const now = Date.now();

      if (now < manualLockUntilRef.current && manualTargetRef.current) {
        setActiveSection(manualTargetRef.current);
        return;
      }

      manualTargetRef.current = null;
      setActiveSection(getActiveSection());
    };

    const handleScroll = () => {
      if (frameRef.current) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveSection);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  function handleLinkClick(id) {
    manualTargetRef.current = id;
    manualLockUntilRef.current = Date.now() + 700;
    setActiveSection(id);
  }

  function handleNavigate(event, link) {
    event.preventDefault();
    handleLinkClick(link.id);

    if (link.id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      return;
    }

    const target = document.getElementById(link.id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', link.href);
    }
  }

  return (
    <header className={styles.siteHeader}>
      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={activeSection === link.id ? styles.activeLink : ''}
              onClick={(event) => handleNavigate(event, link)}
            >
              {link.label}
              <span
                className={`${styles.activeMarker} ${activeSection === link.id ? styles.activeMarkerVisible : ''}`}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
        <div className={styles.navToggle}>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
