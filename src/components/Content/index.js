import React from 'react';
import './styles.css';

export default function Content({ children, toggle, bg }) {
  return (
    <div
      style={{ backgroundColor: bg }}
      className={toggle ? "container-content-disabled" : "container-content-active"}
    >
      {children}
    </div>
  );
}
