import React, { useState, useEffect } from 'react';
import webDevIcon from '../assets/carousel/webdev.svg';
import dataIcon   from '../assets/carousel/data.svg';
import mlIcon     from '../assets/carousel/ml.svg';

export default function About() {
  const details = [
    "I am a computer science student with a strong passion for artificial intelligence, databases, and web development. I thrive on tackling new challenges, especially those that require me to stretch my knowledge and skills.",
    "I enjoy working with databases, machine learning models, and web development frameworks. Whether it's building predictive models, designing databases or creating functional websites, I enjoy leveraging my skills to contribute to impactful projects and develop innovative solutions.",
    "My experience labeling large datasets for machine learning on platforms like Zooniverse and transcribing historical documents for Smithsonian's digitization efforts has sharpened my attention to detail and appreciation for data integrity."
    ];

  const slides = [webDevIcon, dataIcon, mlIcon];
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent(i => (i + 1) % slides.length);
        setVisible(true);
      }, 600); // match the CSS fade duration
    }, 3000);
    return () => clearInterval(iv);
  }, [slides.length]);

  return (
    <>
      <h2 id = "about-heading">About Me</h2>
      <div className="about-container">
        <div className="about-list">
          {details.map((text, i) => (
            <div key={i} className="about-item card">
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="about-carousel">
          <img
            src={slides[current]}
            alt=""
            className={`carousel-img ${visible ? 'fade-in' : 'fade-out'}`}
          />
        </div>
      </div>
    </>
  );
}
