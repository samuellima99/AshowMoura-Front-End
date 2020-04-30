import React from 'react';
import './styles.css';

export default function Footer({ description }) {
  return (
    <div className="footer-container">
      <p className="footer-description">
        {description}
      </p>
    </div>
  );
}
