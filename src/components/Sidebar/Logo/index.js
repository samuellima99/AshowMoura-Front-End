import React from 'react';

import './styles.css';

import LogoAshow from '../../../assets/Ashow-logo.png';

export default function Logo() {
  return (
    <div className="logo-dashboard">
      <img src={LogoAshow} alt="AshowMoura" style={{width: '90%'}}/>
    </div>
  );
}
