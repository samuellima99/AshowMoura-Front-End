import React from 'react';
import './styles.css';


export default function Tbody({ children, color }) {
  return (
    <tbody style={{ backgroundColor: `${color}` }}>
      {children}
    </tbody>
  );
}
