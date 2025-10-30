import React from 'react';
import profilePic   from '../../assets/profile.jpg';
import githubIcon   from '../../assets/github.svg';
import linkedinIcon from '../../assets/linkedin.svg';
import resumePdf    from '../../assets/shantnu-kaushal-resume.pdf';
import './Intro.css';

export default function Intro() {
  return (
    <div className="intro">
      <div className="intro-left">
        <div className="profile-container">
          <img
            src={profilePic}
            alt="Shantnu Kaushal"
            className="profile-pic"
          />
        </div>
       
        <div className="social-icons">
          <a
            href="https://github.com/ShantnuKaushal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={githubIcon}
              alt="GitHub"
 
              className="social-icon github-icon"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/shantnu-kaushal/"
            target="_blank"
            rel="noopener noreferrer"
          >
       
            <img
              src={linkedinIcon}
              alt="LinkedIn"
              className="social-icon"
            />
          </a>
        </div>
      </div>
      <div className="intro-text">
        <h1>Shantnu Kaushal</h1>
 
        <p className="subtitle">Software Engineer</p>
        <div className="btn-group">
          <a href={resumePdf} target="_blank" rel="noreferrer">
            <button className="btn">Download Resume</button>
          </a>
          <a
            href="mailto:shntnkaushal@gmail.com"
            target="_blank"
           
            rel="noreferrer"
          >
            <button className="btn">Contact Me</button>
          </a>
        </div>
      </div>
    </div>
  );
}