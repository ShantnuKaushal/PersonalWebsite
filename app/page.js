import NavBar from '../components/home/NavBar/NavBar';
import Hero from '../components/home/Hero/Hero';
import About from '../components/home/About/About';
import Experience from '../components/home/Experience/Experience';
import Projects from '../components/home/Projects/Projects';
import SystemStatus from '../components/home/Footer/Footer';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.page}>
      <NavBar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <SystemStatus />
    </main>
  );
}
