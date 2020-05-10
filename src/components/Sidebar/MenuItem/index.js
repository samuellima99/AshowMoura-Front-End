import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function MenuItem({ menuicon, title, link }) {

  return (
    <div className="container-menu-item">
      <div className="item">
        {menuicon}
        <Link
          to={`${link}`}
          className="link"
        >
          {title}
        </Link>
      </div>
    </div >
  );
}
