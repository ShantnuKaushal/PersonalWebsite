import { about } from '../../../content/about';
import SectionHeading from '../SectionHeading/SectionHeading';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.section} id="about">
      <SectionHeading eyebrow="About" title="What I like working on." />
      <div className={styles.aboutGrid}>
        <div className={styles.aboutCard}>
          <p>{about.intro}</p>
        </div>
        <div className={styles.aboutSplit}>
          <div className={styles.infoCard}>
            <h3>Focus</h3>
            <ul>
              {about.focusAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h3>Approach</h3>
            <ul>
              {about.principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
