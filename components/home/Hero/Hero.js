import Image from 'next/image';
import { profile } from '../../../content/profile';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.heroVisual}>
        <div className={styles.portraitRing}>
          <Image
            src={profile.profileImage}
            alt="Shantnu Kaushal portfolio image"
            width={430}
            height={430}
            priority
            className={styles.portrait}
          />
        </div>
      </div>

      <div className={styles.heroCopy}>
        <h1>{profile.name}</h1>
        <p className={styles.heroRole}>{profile.role}</p>
        <div className={styles.heroActions}>
          <a href={profile.resumeHref} target="_blank" rel="noreferrer" className={styles.primaryButton}>
            Download Resume
          </a>
          <a href={`mailto:${profile.email}`} className={styles.secondaryButton}>
            Contact Me
          </a>
        </div>
        <div className={styles.heroLinks}>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.resumeHref} target="_blank" rel="noreferrer">
            Resume
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>
    </section>
  );
}
