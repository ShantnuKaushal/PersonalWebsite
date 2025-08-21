import React from 'react';
import unrealLogo       from '../../assets/experience/unreal.svg';
import smithsonianLogo  from '../../assets/experience/smithsonian.svg';
import zooniverseLogo   from '../../assets/experience/zooniverse.svg';
import eyLogo           from '../../assets/experience/ernst.svg';
import './Experience.css';

const experiences = [
  {
    logo: unrealLogo,
    company: 'Unreal Editor (UEFN)',
    role: 'UGC Creator',
    dates: 'July 2023 – Present',
    description: 'Develop interactive gameplay experiences using Verse and visual scripting to enhance level design. Optimize 3D environments to enhance performance across multiple platforms.'
  },
  {
    logo: smithsonianLogo,
    company: 'Smithsonian',
    role: 'Transcriptionist',
    dates: 'January 2023 – December 2023',
    description: 'Transcribed historical documents to improve machine readability and support digitization efforts.'
  },
  {
    logo: zooniverseLogo,
    company: 'Zooniverse',
    role: 'Citizen Scientist',
    dates: 'January 2023 – December 2023',
    description: 'Contributed to large-scale data labeling efforts to identify species for research datasets.'
  },
  {
    logo: eyLogo,
    company: 'Ernst & Young',
    role: 'Job Shadow',
    dates: 'November 2019',
    description: 'Learned about data analysis, communication strategies, and project staging from industry professionals.'
  },
];

export default function Experience() {
  return (
    <>
      <h2>Experience</h2>
      <div className="experience-grid">
        {experiences.map((exp, idx) => (
          <div key={idx} className="experience-card card">
            <img 
              src={exp.logo} 
              alt={`${exp.company} logo`} 
       
              className="experience-logo" 
            />
            <h3>{exp.company}</h3>
            <p className="exp-role">{exp.role}</p>
            <p className="exp-dates">{exp.dates}</p>
            <p className="exp-desc">{exp.description}</p>
          </div>
        ))}
      </div>
    </>
 
  );
}