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
        <p className="user" style={{ color: `${color}` }}>
          Bem-vindo{`${'(a)'}`}, {user}
        </p>
      </div>

    </header>
  );
}
