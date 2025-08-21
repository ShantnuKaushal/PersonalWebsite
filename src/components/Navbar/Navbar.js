import React, { useState, useEffect } from 'react';
import './Navbar.css';

const sections = [
  { id: 'home',       label: 'Home' },
  { id: 'about',      label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills',     label: 'Skills' },
  { id: 'contact',    label: 'Contact' },
];
export default function Navbar() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', 
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, options);

 
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
  return (
    <nav className="top-nav">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={active === id ? 'active' : ''}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}