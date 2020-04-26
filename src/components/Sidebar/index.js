import React from 'react';

import './styles.css';

import Logo from './Logo';

export default function Sidebar({ toggle, bgcolor, children }) {
  return (
    <div
      className={toggle ? 'sidebar-active' : 'sidebar-disabled'}
      style={{ backgroundColor: bgcolor }}
    >
      <Logo />
      {children}
      <div className="btn-logout">
        <button className="logout">
          Logout
        </button>
      </div>
    </div>
  );
}
