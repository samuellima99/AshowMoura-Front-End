import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function MenuItem({ menuicon, title, link }) {
  const [active, setActive] = useState(false);
  const [linkActive, setLinkActive] = useState(false);

  function handleActive() {
    setActive(!active);
    setLinkActive(!linkActive);
  }

  return (
    <div className="container-menu-item">
      <div
        className={active ? "item-active" : "item-disabled"}
        onClick={handleActive}
      >
        <img src={menuicon} alt={title} className="icon" />
        <Link
          to={link}
          className={linkActive ? "link-active" : "link-disabled"}
        >
          {title}
        </Link>
      </div>
    </div>
  );
}
