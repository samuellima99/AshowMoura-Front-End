import React from 'react';
import './styles.css';


export default function Td({ children, color }) {
  return (
    <td style={{ color: `${color}` }}>
       {children}
    </td>
  );
}
