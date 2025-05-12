

import React from 'react';
import mailIcon     from '../assets/contact/mail.svg';
import linkedinIcon from '../assets/contact/linkedin.svg';
import githubIcon   from '../assets/contact/github.svg';

export default function Contact() {
  return (
    <div id="contact" className="contact-section">
      <h2>Contact Me</h2>
      <div className="contact-buttons">
        <button
          className="btn"
          onClick={() => window.open('mailto:shntnkaushal@gmail.com', '_blank')}
        >
          <img src={mailIcon} alt="Email" className="btn-icon" />
          <span>Send An Email</span>
        </button>
        <button
          className="btn"
          onClick={() =>
            window.open('https://www.linkedin.com/in/shantnu-kaushal/', '_blank')
          }
        >
          <img src={linkedinIcon} alt="LinkedIn" className="btn-icon" />
          <span>Connect On LinkedIn</span>
        </button>
        <button
          className="btn"
          onClick={() =>
            window.open('https://github.com/ShantnuKaushal', '_blank')
          }
        >
          <img src={githubIcon} alt="GitHub" className="btn-icon" />
          <span>Follow On GitHub</span>
        </button>
      </div>
    </div>
  );
}
