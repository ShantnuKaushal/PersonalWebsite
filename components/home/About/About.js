import { about } from '../../../content/about';
import SectionHeading from '../SectionHeading/SectionHeading';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.section} id="about">
      <SectionHeading title="About" />
      <div className={styles.readmePanel} aria-label="About readme">
        <div className={styles.panelHeader}>
          <span className={styles.fileLabel}>{about.fileLabel}</span>
        </div>
        <div className={styles.panelBody}>
          <div className={styles.copyBlock}>
            {about.intro.map((line) => (
              <p key={line} className={styles.copyLine}>
                {line}
              </p>
            ))}
          </div>
          <div className={styles.skillsBlock}>
            <span className={styles.skillsHeading}>Technical Skills</span>
            <div className={styles.skillsList}>
              {about.skillRows.map((row) => (
                <div key={row.label} className={styles.skillRow}>
                  <span className={styles.skillLabel}>{row.label}</span>
                  <p className={styles.skillValue}>{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
