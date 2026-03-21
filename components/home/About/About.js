import { about } from '../../../content/about';
import SectionHeading from '../SectionHeading/SectionHeading';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.section} id="about">
      <SectionHeading title="About" />
      <div className={styles.aboutLayout}>
        <div className={styles.copyPanel}>
          <p className={styles.headline}>{about.headline}</p>
          <p className={styles.body}>{about.body}</p>
        </div>
        <div className={styles.profilePanel} aria-label="Technical profile">
          <div className={styles.profileHeader}>
            <span className={styles.profileLabel}>profile.ts</span>
            <span className={styles.profileMeta}>technical profile</span>
          </div>
          <div className={styles.profileRows}>
            {about.profileRows.map((row) => (
              <div key={row.label} className={styles.profileRow}>
                <span className={styles.rowLabel}>{row.label}</span>
                <span className={styles.rowValue}>{row.value}</span>
              </div>
            ))}
          </div>
          <div className={styles.profileFooter}>
            <span className={styles.footerLabel}>building</span>
            <p className={styles.footerValue}>{about.profileFooter}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
