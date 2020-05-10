import React from 'react';

import './styles.css';


export default function Logout({ bgcolor, logout }) {
  return (
    <div className="btn-logout">
      <button
        className="logout"
        onClick={logout}
        style={{ backgroundColor: `${bgcolor}` }}
      >
        Logout
      </button>
    </div>
  );
}
