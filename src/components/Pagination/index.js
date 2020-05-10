import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import './styles.css';

export default function Pagination({ next, prev, total, currentPage, colorText, colorBtn }) {
  return (
    <div className="container-pagination">
      <button type="button" onClick={prev} style={{backgroundColor: `${colorBtn}`}}>
        <BsChevronLeft size={18} color="#ffffff" />
      </button>
      <p className="count-page" style={{color: `${colorText}`}}>
        {currentPage} of {total}
      </p>
      <button type="button" onClick={next} style={{backgroundColor: `${colorBtn}`}}>
        <BsChevronRight size={18} color="#ffffff" />
      </button>
    </div>
  );
}
