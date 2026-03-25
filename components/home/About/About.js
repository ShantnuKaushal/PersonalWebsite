'use client';

import { useState } from 'react';
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
} from 'react-icons/si';
import { about } from '../../../content/about';
import SectionHeading from '../SectionHeading/SectionHeading';
import styles from './About.module.css';

const skillIcons = {
  python: SiPython,
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
  const [activeMode, setActiveMode] = useState(about.defaultMode);
  const activeCommand =
    about.commandModes.find((mode) => mode.id === activeMode) ?? about.commandModes[0];

  return (
    <section className={styles.section} id="about">
      <SectionHeading title="About" />
      <div className={styles.aboutLayout}>
        <div className={styles.copyPanel}>
          <div className={styles.copyHeader}>
            <span className={styles.fileLabel}>{about.readmeLabel}</span>
          </div>
          <div className={styles.copyBody}>
            {about.readmeBlocks.map((block) => (
              <p key={block} className={styles.readmeBlock}>
                {block}
              </p>
            ))}
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
                {activeCommand.skills.map((skill) => {
                  const Icon = skillIcons[skill.icon] ?? HiOutlineCodeBracketSquare;

                  return (
                    <div key={skill.label} className={styles.skillItem}>
                      <span className={styles.skillIconFrame}>
                        <Icon className={styles.skillIcon} aria-hidden="true" />
                      </span>
                      <span className={styles.skillText}>{skill.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
