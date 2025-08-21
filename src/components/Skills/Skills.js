import React, { useEffect, useRef } from 'react';
import javaLogo     from '../../assets/skills/java.svg';
import sqlLogo      from '../../assets/skills/sql.svg';
import htmlcssLogo  from '../../assets/skills/htmlcss.svg';
import jsLogo       from '../../assets/skills/javascript.svg';
import pythonLogo   from '../../assets/skills/python.svg';
import pandasLogo   from '../../assets/skills/pandas.svg';
import numpyLogo    from '../../assets/skills/numpy.svg';
import scikitLogo   from '../../assets/skills/scikit.svg';
import './Skills.css';

const skills = [
  { name: 'Java',         icon: javaLogo    },
  { name: 'SQL',          icon: sqlLogo     },
  { name: 'HTML/CSS',     icon: htmlcssLogo },
  { name: 'JavaScript',   icon: jsLogo      },
  { name: 'Python',       icon: pythonLogo  },
  { name: 'Pandas',       icon: pandasLogo  },
  { name: 'NumPy',  
       icon: numpyLogo   },
  { name: 'scikit-learn', icon: scikitLogo  }
];
export default function Skills() {
  const scrollerRef = useRef(null);
  const innerRef    = useRef(null);
  useEffect(() => {
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const scroller = scrollerRef.current;
    const inner    = innerRef.current;

    
    const isPhone = window.innerWidth <= 480;
    scroller.setAttribute('data-speed', isPhone ? 'fast' : 'slow');

    scroller.setAttribute('data-animated', 'true');

    
    Array.from(inner.children).forEach(child => {
      const clone = child.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      inner.appendChild(clone);
 
    });
  }, []);

  return (
    <section id="skills">
      <h2>Skills</h2>
      <div
        ref={scrollerRef}
        className="scroller"
        data-direction="left"
        // data-speed is set in useEffect
      >
        <div ref={innerRef} className="scroller__inner">
          {skills.map((s, i) => (
         
            <div className="skill-card" key={i}>
              <img src={s.icon} alt={s.name} className="skill-icon" />
              <p className="skill-label">{s.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}