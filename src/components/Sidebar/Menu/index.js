import React from 'react';

import './styles.css';

export default function Menu({ children }) {
  return (
    <div className="container-menu">
      {children}
    </div>
  );
}
