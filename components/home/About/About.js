import { about } from '../../../content/about';
import SectionHeading from '../SectionHeading/SectionHeading';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.section} id="about">
      <SectionHeading title="About" />
      <div className={styles.aboutBoard}>
        <div className={styles.introPanel}>
          <p className={styles.headline}>{about.headline}</p>
          <p className={styles.summary}>{about.summary}</p>
          <p className={styles.detail}>{about.detail}</p>
        </div>
        <div className={styles.capabilityPanel} aria-label="Technical capabilities">
          <div className={styles.capabilityHeader}>
            <span className={styles.capabilityEyebrow}>Technical Focus</span>
          </div>
          <div className={styles.capabilityList}>
            {about.capabilityRows.map((row) => (
              <div key={row.label} className={styles.capabilityRow}>
                <span className={styles.capabilityLabel}>{row.label}</span>
                <p className={styles.capabilityValue}>{row.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footerPanel}>
          <p>{about.footer}</p>
        </div>
      </div>
    </section>
  );
}
