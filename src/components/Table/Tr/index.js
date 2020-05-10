import React from 'react';
import './styles.css';


export default function Tr({ children, color }) {
  return (
    <tr style={{ backgroundColor: `${color}` }}>
      {children}
    </tr>
  );
}
