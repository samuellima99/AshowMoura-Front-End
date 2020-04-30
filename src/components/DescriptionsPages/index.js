import React from 'react';
import './styles.css';

export default function Descriptions({ description, tip }) {
  return (
    <div className='description-page'>
      <h6 className='description'>{description}</h6>
      <p className='tip'>{tip}</p>
    </div>
  );
}
