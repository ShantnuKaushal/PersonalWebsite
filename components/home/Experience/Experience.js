import Image from 'next/image';
import { experiences } from '../../../content/experience';
import SectionHeading from '../SectionHeading/SectionHeading';
import styles from './Experience.module.css';

function ExperienceLogo({ company, logoSrc, logoAlt }) {
  if (logoSrc) {
    return (
      <div className={styles.logoBadge}>
        <Image
          src={logoSrc}
          alt={logoAlt || `${company} logo`}
          width={64}
          height={64}
          className={styles.logoImage}
        />
      </div>
    );
  }

  const initials = company
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

  return (
    <div className={`${styles.logoBadge} ${styles.logoFallback}`} aria-label={`${company} monogram`}>
      <span>{initials}</span>
    </div>
  );
}

export default function Experience() {
  return (
    <section className={styles.section} id="experience">
      <SectionHeading eyebrow="Professional Experience" title="Experience built on shipped work." />
      <div className={styles.experienceList}>
        {experiences.map((experience) => (
          <article key={`${experience.company}-${experience.role}`} className={styles.experienceRow}>
            <div className={styles.experienceHeader}>
              <div className={styles.experienceIdentity}>
                <ExperienceLogo
                  company={experience.company}
                  logoSrc={experience.logoSrc}
                  logoAlt={experience.logoAlt}
                />
                <div>
                  <span className={styles.company}>{experience.company}</span>
                  <h3>{experience.role}</h3>
                </div>
              </div>
              <span className={styles.dates}>{experience.dates}</span>
            </div>
            <div className={styles.experienceBody}>
              <ul className={styles.experienceHighlights}>
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className={styles.tagList}>
                {experience.tech.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
