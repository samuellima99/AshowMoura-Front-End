import React from 'react';
import './styles.css';

export default function Footer({ description, color }) {
  return (
    <div className="footer-container">
      <p className="footer-description" style={{ color: `${color}` }}>
        {description}
      </p>
    </div>
  );
}
