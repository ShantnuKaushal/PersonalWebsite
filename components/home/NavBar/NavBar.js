import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <header className={styles.siteHeader}>
      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <a href="#top">Home</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
        </div>
        <div className={styles.navToggle}>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
