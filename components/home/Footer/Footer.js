import { profile } from '../../../content/profile';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.signoff}>status: online</p>
        <p className={styles.attribution}>
          {profile.name} • {currentYear}
        </p>
      </div>
    </footer>
  );
}
