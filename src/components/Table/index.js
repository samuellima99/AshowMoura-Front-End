import React from 'react';
import './styles.css';


export default function Table({ children }) {
  return (
    <table cellSpacing="0">
      {children}
    </table>
  );
}
