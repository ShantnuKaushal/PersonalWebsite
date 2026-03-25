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
      <SectionHeading title="Experience" />
      <div className={styles.experienceList}>
        {experiences.map((experience) => {
          const stateClass = experience.isActive ? styles.statusActive : styles.statusInactive;
          const dotClass = experience.isActive ? styles.orbActive : styles.orbInactive;
          const stateLabel = experience.isActive ? 'active' : 'inactive';

          return (
            <article key={`${experience.company}-${experience.role}`} className={styles.experienceRow}>
              <div className={styles.entryBar}>
                <span className={styles.entryLabel}>{experience.entryLabel}</span>
                <span className={`${styles.entryStatus} ${stateClass}`}>
                  <span className={`${styles.statusOrb} ${dotClass}`} aria-hidden="true" />
                  {stateLabel}
                </span>
              </div>
              <div className={styles.entryBody}>
                <ExperienceLogo
                  company={experience.company}
                  logoSrc={experience.logoSrc}
                  logoAlt={experience.logoAlt}
                />
                <div className={styles.experienceContent}>
                  <div className={styles.experienceTopline}>
                    <div className={styles.identityBlock}>
                      <span className={styles.company}>{experience.company}</span>
                      <h3>{experience.role}</h3>
                    </div>
                    <span className={styles.dates}>{experience.dates}</span>
                  </div>

                  <p className={styles.summary}>{experience.summary}</p>

                  <div className={styles.tagList}>
                    {experience.tech.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
