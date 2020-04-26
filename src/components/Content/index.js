import React from 'react';
import './styles.css';

export default function Content({ children, toggle }) {
  return (
    <div className={toggle ? "container-content-disabled" : "container-content-active"}>
      {children}
    </div>
  );
}
