import React from 'react';

import './styles.css';

import Logo from './Logo';

import BtnLogout from '../BtnLogout';

export default function Sidebar({ toggle, bgcolor, children, logout }) {
  return (
    <div
      className={toggle ? 'sidebar-active' : 'sidebar-disabled'}
      style={{ backgroundColor: bgcolor }}
    >
      <Logo />
      {children}
      <BtnLogout bgcolor="#E2E3D8" />
    </div>
  );
}
