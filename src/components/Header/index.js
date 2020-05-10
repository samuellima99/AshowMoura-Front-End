import React from 'react';
import { FiUser } from 'react-icons/fi';

import './styles.css';

export default function Header({ children, toggle, color }) {
  const user = localStorage.getItem('@User');

  return (
    <header className={toggle ? 'header-disabled' : 'header-active'}>

      <div className="btn-toggle">
        {children}
      </div>

      <div className="user-menu">
        <FiUser
          size={24}
          color={`${color}`}
        />
        <p className="user" style={{ color: `${color}` }}>
          {user}
        </p>
      </div>

    </header>
  );
}
