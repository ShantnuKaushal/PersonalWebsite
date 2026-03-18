import { profile } from '../../../content/profile';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerSocials}>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </div>
      <p>Copyright ©{new Date().getFullYear()} • {profile.name}</p>
    </footer>
  );
}
