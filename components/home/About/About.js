'use client';

import { useId, useRef, useState } from 'react';
import { FaJava } from 'react-icons/fa6';
import { HiOutlineCircleStack, HiOutlineCodeBracketSquare } from 'react-icons/hi2';
import { LuGitBranchPlus, LuSearchCode, LuWorkflow } from 'react-icons/lu';
import {
  SiApachekafka,
  SiCplusplus,
  SiDocker,
  SiGo,
  SiHuggingface,
  SiMinio,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPrisma,
  SiPytorch,
  SiPython,
  SiReact,
  SiRedis,
  SiScikitlearn,
  SiTensorflow,
  SiTypescript,
} from 'react-icons/si';
import { about } from '../../../content/about';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import styles from './About.module.css';

const skillIcons = {
  python: SiPython,
  typescript: SiTypescript,
  code: HiOutlineCodeBracketSquare,
  node: SiNodedotjs,
  golang: SiGo,
  cplusplus: SiCplusplus,
  react: SiReact,
  nextjs: SiNextdotjs,
  java: FaJava,
  pytorch: SiPytorch,
  tensorflow: SiTensorflow,
  huggingface: SiHuggingface,
  rag: LuWorkflow,
  'vector-search': LuSearchCode,
  pandas: SiPandas,
  numpy: SiNumpy,
  'scikit-learn': SiScikitlearn,
  postgresql: SiPostgresql,
  sql: HiOutlineCircleStack,
  redis: SiRedis,
  kafka: SiApachekafka,
  docker: SiDocker,
  minio: SiMinio,
  prisma: SiPrisma,
  cicd: LuGitBranchPlus,
};

export default function About() {
  const tabSetId = useId();
  const tabRefs = useRef([]);
  const [activeMode, setActiveMode] = useState(about.defaultMode);
  const activeCommand =
    about.commandModes.find((mode) => mode.id === activeMode) ?? about.commandModes[0];

  const handleTabKeyDown = (event, currentIndex) => {
    const { key } = event;

    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(key)) {
      return;
    }

    event.preventDefault();

    const lastIndex = about.commandModes.length - 1;
    let nextIndex = currentIndex;

    if (key === 'Home') {
      nextIndex = 0;
    } else if (key === 'End') {
      nextIndex = lastIndex;
    } else if (key === 'ArrowRight' || key === 'ArrowDown') {
      nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
      nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    }

    const nextMode = about.commandModes[nextIndex];

    if (!nextMode) {
      return;
    }

    setActiveMode(nextMode.id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className={styles.section} id="about">
      <ScrollReveal as="div" className={styles.sectionHeader} variant="soft" distance={16}>
        <h2>About</h2>
      </ScrollReveal>
      <div className={styles.aboutLayout}>
        <ScrollReveal as="div" className={styles.copyPanel} variant="driftLeft" distance={22}>
          <div className={styles.panelHeader}>
            <span className={styles.fileLabel}>{about.readmeLabel}</span>
          </div>
          <div className={styles.copyBody}>
            {about.readmeBlocks.map((block) => (
              <p key={block} className={styles.readmeBlock}>
                {block}
              </p>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal
          as="div"
          className={styles.commandPanel}
          variant="pop"
          delay={70}
          distance={18}
          aria-label="Technical skills"
        >
          <div className={styles.panelHeader}>
            <span className={styles.fileLabel}>{about.fileLabel}</span>
          </div>
          <div className={styles.commandBody}>
            <div className={styles.commandBar} role="tablist" aria-label="Skill categories">
              {about.commandModes.map((mode, index) => {
                const tabId = `${tabSetId}-${mode.id}-tab`;
                const panelId = `${tabSetId}-${mode.id}-panel`;

                return (
                  <button
                    key={mode.id}
                    type="button"
                    className={mode.id === activeCommand.id ? styles.commandActive : styles.commandButton}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    onClick={() => setActiveMode(mode.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    role="tab"
                    id={tabId}
                    aria-selected={mode.id === activeCommand.id}
                    aria-controls={panelId}
                    tabIndex={mode.id === activeCommand.id ? 0 : -1}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>
            {about.commandModes.map((mode) => {
              const isActive = mode.id === activeCommand.id;

              return (
                <div
                  key={mode.id}
                  className={styles.commandContent}
                  role="tabpanel"
                  id={`${tabSetId}-${mode.id}-panel`}
                  aria-labelledby={`${tabSetId}-${mode.id}-tab`}
                  tabIndex={isActive ? 0 : -1}
                  hidden={!isActive}
                >
                  <div className={styles.outputHeader}>
                    <p className={styles.outputDescription}>{mode.description}</p>
                  </div>
                  <div className={styles.skillDivider} aria-hidden="true" />
                  <div className={styles.skillGrid}>
                    {mode.skills.map((skill) => {
                      const Icon = skillIcons[skill.icon] ?? HiOutlineCodeBracketSquare;
                      const iconClass =
                        skill.icon === 'typescript'
                          ? `${styles.skillIcon} ${styles.skillIconTypescript}`
                          : styles.skillIcon;

                      return (
                        <div key={skill.label} className={styles.skillItem}>
                          <span className={styles.skillInner}>
                            <span className={styles.skillIconFrame}>
                              <Icon className={iconClass} aria-hidden="true" />
                            </span>
                            <span className={styles.skillText}>{skill.label}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
