import React from 'react';
import './styles.css';

export default function Descriptions({ description, tip, color }) {
  return (
    <div className='description-page'>
      <h6
        className='description'
        style={{ color: `${color}` }}
      >
        {description}
      </h6>
      <p
        className='tip'
        style={{ color: `${color}` }}
      >
        {tip}
      </p>
    </div>
  );
}
