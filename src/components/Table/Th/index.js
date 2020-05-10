import React from 'react';
import './styles.css';


export default function Th({ children, color }) {
  return (
    <th style={{ backgroundColor: `${color}` }}>
      {children}
    </th>
  );
}
