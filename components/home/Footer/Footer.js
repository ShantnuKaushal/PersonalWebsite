'use client';

import { useEffect, useState } from 'react';
import styles from './Footer.module.css';

const terminalStates = [
  {
    command: 'build --status',
    output: 'Deployment Stable',
  },
  {
    command: 'build --author',
    output: 'Designed and Engineered by Shantnu',
  },
];

const PROMPT = 'shantnu@portfolio:~$';
const WINDOW_TITLE = 'shantnu@portfolio - zsh - 80x24';

export default function SystemStatus() {
  const [stateIndex, setStateIndex] = useState(0);
  const [linePhase, setLinePhase] = useState('command');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const activeState = terminalStates[stateIndex];
    const targetLength = activeState.command.length;
    const isLineComplete = charIndex >= targetLength;

    let delay;
    if (linePhase === 'command' && charIndex === 0) {
      delay = 520;
    } else if (linePhase === 'command' && !isLineComplete) {
      delay = 90;
    } else if (linePhase === 'command' && isLineComplete) {
      delay = 2600;
    } else {
      delay = 3000;
    }

    const timeout = window.setTimeout(() => {
      if (linePhase === 'command' && !isLineComplete) {
        setCharIndex((previous) => previous + 1);
        return;
      }

      if (linePhase === 'command') {
        setLinePhase('output');
        return;
      }

      setStateIndex((previous) => (previous + 1) % terminalStates.length);
      setLinePhase('command');
      setCharIndex(0);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [charIndex, linePhase, stateIndex]);

  const activeState = terminalStates[stateIndex];
  const visibleCommand =
    linePhase === 'command' ? activeState.command.slice(0, charIndex) : activeState.command;
  const visibleOutput = linePhase === 'output' ? activeState.output : '';

  return (
    <section className={styles.section} aria-label="Portfolio terminal">
      <div className={styles.terminalWrap}>
        <div className={styles.terminalShell}>
          <div className={styles.windowBar} aria-hidden="true">
            <div className={styles.windowDots}>
              <span className={`${styles.windowDot} ${styles.windowDotClose}`} />
              <span className={`${styles.windowDot} ${styles.windowDotMinimize}`} />
              <span className={`${styles.windowDot} ${styles.windowDotExpand}`} />
            </div>
            <span className={styles.windowTitle}>{WINDOW_TITLE}</span>
          </div>

          <div className={styles.terminal} aria-label="Portfolio terminal">
            <p className={`${styles.line} ${styles.promptLine}`}>
              <span className={styles.promptPrefix}>{PROMPT}</span>
              <span aria-hidden="true"> </span>
              <span className={styles.promptCommand}>{visibleCommand}</span>
              {linePhase === 'command' ? <span className={styles.cursor} aria-hidden="true" /> : null}
            </p>

            <p className={`${styles.line} ${styles.outputLine}`}>
              <span className={styles.outputText}>{visibleOutput}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
