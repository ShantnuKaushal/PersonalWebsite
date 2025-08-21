import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer style={{textAlign:'center', padding:'1rem'}}>
      &copy; {new Date().getFullYear()} Shantnu Kaushal. All rights reserved.
    </footer>
  );
}