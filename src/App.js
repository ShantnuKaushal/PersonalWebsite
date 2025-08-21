import React from 'react';
import Navbar from './components/Navbar/Navbar.js';
import Intro from './components/Intro/Intro.js';
import About from './components/About/About.js';
import Experience from './components/Experience/Experience.js';
import Skills from './components/Skills/Skills.js';
import Contact from './components/Contact/Contact.js';
import Footer from './components/Footer/Footer.js';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home">
          <Intro />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;