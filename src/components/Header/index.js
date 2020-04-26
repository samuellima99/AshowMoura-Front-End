import React from 'react';
import { FiUser } from 'react-icons/fi';

import './styles.css';

export default function Header({ children, toggle }) {
  const user = localStorage.getItem('@User');

  return (
    <header className={toggle ? 'header-active' : 'header-disabled'}>
      <div className="btn-toggle">
        {children}
      </div>
      <div className="user-menu">
        <FiUser size={24} color="#FFF" />
        <p className="user">
          {user}
        </p>
      </div>
    </header>
  );
}
