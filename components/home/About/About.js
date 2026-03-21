'use client';

import { useState } from 'react';
import { about } from '../../../content/about';
import SectionHeading from '../SectionHeading/SectionHeading';
import styles from './About.module.css';

export default function About() {
  const [activeMode, setActiveMode] = useState(about.defaultMode);
  const activeCommand =
    about.commandModes.find((mode) => mode.id === activeMode) ?? about.commandModes[0];

  return (
    <section className={styles.section} id="about">
      <SectionHeading title="About" />
      <div className={styles.aboutLayout}>
        <div className={styles.copyPanel}>
          <div className={styles.copyHeader}>
            <span className={styles.fileLabel}>about</span>
          </div>
          <div className={styles.copyBody}>
            <p className={styles.lead}>{about.lead}</p>
            <p className={styles.support}>{about.support}</p>
          </div>
        </div>
        <div className={styles.commandPanel} aria-label="Technical skills">
          <div className={styles.panelHeader}>
            <span className={styles.fileLabel}>{about.fileLabel}</span>
          </div>
          <div className={styles.commandBody}>
            <div className={styles.commandBar} role="tablist" aria-label="Skill categories">
              {about.commandModes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  className={mode.id === activeCommand.id ? styles.commandActive : styles.commandButton}
                  onClick={() => setActiveMode(mode.id)}
                  role="tab"
                  aria-selected={mode.id === activeCommand.id}
                >
                  <span className={styles.commandPrompt} aria-hidden="true">
                    $
                  </span>
                  {mode.label}
                </button>
              ))}
            </div>
            <div className={styles.commandOutput}>
              <div className={styles.outputHeader}>
                <span className={styles.outputLabel}>{activeCommand.label}</span>
                <p className={styles.outputDescription}>{activeCommand.description}</p>
              </div>
              <div className={styles.skillGrid}>
                {activeCommand.skills.map((skill) => (
                  <div key={skill} className={styles.skillItem}>
                    <span className={styles.skillMarker} aria-hidden="true" />
                    <span className={styles.skillText}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
