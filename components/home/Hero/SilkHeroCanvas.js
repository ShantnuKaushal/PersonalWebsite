'use client';

import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

function hexToRgb(value) {
  const hex = value.trim().replace('#', '');
  if (hex.length !== 6) {
    return { r: 245, g: 245, b: 247 };
  }

  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  };
}

function readThemeColors() {
  const root = window.getComputedStyle(document.documentElement);
  const isLight = document.documentElement.dataset.theme === 'light';

  return {
    text: hexToRgb(root.getPropertyValue('--text')),
    accent: hexToRgb(root.getPropertyValue('--accent')),
    bg: hexToRgb(root.getPropertyValue('--bg')),
    line: isLight ? { r: 82, g: 78, b: 69 } : hexToRgb(root.getPropertyValue('--text')),
    accentLine: isLight ? { r: 142, g: 106, b: 34 } : hexToRgb(root.getPropertyValue('--accent')),
    isLight,
  };
}

export default function SilkHeroCanvas() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) {
      return undefined;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return undefined;
    }

    const pointer = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.46,
      tx: window.innerWidth * 0.5,
      ty: window.innerHeight * 0.46,
      vx: 0,
      vy: 0,
    };

    const strands = [
      { y: 0.34, amp: 20, freq: 1.05, phase: 0.3, darkAlpha: 0.12, lightAlpha: 0.28, accent: false },
      { y: 0.47, amp: 24, freq: 0.9, phase: 1.8, darkAlpha: 0.13, lightAlpha: 0.19, accent: true },
      {
        y: 0.675,
        compactY: 0.695,
        amp: 18,
        freq: 1.1,
        phase: 2.95,
        darkAlpha: 0.12,
        lightAlpha: 0.3,
        accent: false,
      },
    ];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let waveTime = 0;
    let pointerTime = 0;
    let lastTimestamp = 0;
    let colors = readThemeColors();
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');
    let hasTouchPointer = coarsePointerQuery.matches;

    function rgba(color, alpha) {
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
    }

    function resize() {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function updatePointer(usesCompactMotion) {
      if (hasTouchPointer) {
        pointer.tx = width * (0.5 + Math.sin(pointerTime * 0.62) * 0.18);
        pointer.ty = height * (0.51 + Math.cos(pointerTime * 0.48) * 0.1);
      }

      const dx = pointer.tx - pointer.x;
      const dy = pointer.ty - pointer.y;
      pointer.vx += dx * (usesCompactMotion ? 0.034 : 0.026);
      pointer.vy += dy * (usesCompactMotion ? 0.034 : 0.026);
      pointer.vx *= usesCompactMotion ? 0.84 : 0.86;
      pointer.vy *= usesCompactMotion ? 0.84 : 0.86;
      pointer.x += pointer.vx;
      pointer.y += pointer.vy;
    }

    function drawStrand(strand, index, usesCompactMotion) {
      const points = 112;
      const strandY = usesCompactMotion && strand.compactY ? strand.compactY : strand.y;
      const baseY = height * strandY;
      const cursorRange = Math.min(340, width * 0.42);
      const waveAmplitude = strand.amp * (usesCompactMotion ? 1.14 : 1);

      context.beginPath();

      for (let point = 0; point <= points; point += 1) {
        const progress = point / points;
        const x = progress * width;
        const waveA =
          Math.sin(progress * Math.PI * 2 * strand.freq + strand.phase + waveTime * 0.12) *
          waveAmplitude;
        const waveB =
          Math.sin(progress * Math.PI * 4.4 + strand.phase * 0.65 - waveTime * 0.08) *
          waveAmplitude *
          0.26;
        const naturalY = baseY + waveA + waveB;
        const distance = Math.hypot(x - pointer.x, naturalY - pointer.y);
        const influence = Math.max(0, 1 - distance / cursorRange);
        const eased = influence * influence * (3 - 2 * influence);
        const px = x + pointer.vx * eased * (0.18 + index * 0.018);
        const py = naturalY + pointer.vy * eased * (0.3 + index * 0.02);

        if (point === 0) {
          context.moveTo(px, py);
        } else {
          context.lineTo(px, py);
        }
      }

      context.strokeStyle = strand.accent
        ? rgba(colors.accentLine, colors.isLight ? strand.lightAlpha * 1.08 : strand.darkAlpha)
        : rgba(colors.line, colors.isLight ? strand.lightAlpha : strand.darkAlpha);
      context.lineWidth = strand.accent ? 1.12 : 1.2;
      context.stroke();
    }

    function render(timestamp) {
      const usesCompactMotion = hasTouchPointer || width <= 900;
      const deltaSeconds = lastTimestamp ? Math.min((timestamp - lastTimestamp) / 1000, 0.08) : 1 / 60;
      const compactSpeed = usesCompactMotion ? 3.6 : 1;

      lastTimestamp = timestamp;
      waveTime += deltaSeconds * compactSpeed;
      pointerTime += deltaSeconds;
      updatePointer(usesCompactMotion);
      context.clearRect(0, 0, width, height);
      strands.forEach((strand, index) => drawStrand(strand, index, usesCompactMotion));
      frame = window.requestAnimationFrame(render);
    }

    function handlePointerMove(event) {
      const rect = wrap.getBoundingClientRect();
      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
    }

    function handleThemeChange() {
      colors = readThemeColors();
    }

    function handlePointerCapabilityChange(event) {
      hasTouchPointer = event.matches;
    }

    const observer = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(handleThemeChange);

    observer.observe(wrap);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    coarsePointerQuery.addEventListener('change', handlePointerCapabilityChange);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    resize();
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
      coarsePointerQuery.removeEventListener('change', handlePointerCapabilityChange);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.silkCanvasWrap} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.silkCanvas} />
    </div>
  );
}
