import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import './styles.css';

export default function Pagination({ next, prev, total, currentPage }) {
  return (
    <div className="container-pagination">
      <button type="button" onClick={prev}>
        <BsChevronLeft size={18} color="#ffffff" />
      </button>
      <p className="count-page">
        {currentPage} of {total}
      </p>
      <button type="button" onClick={next}>
        <BsChevronRight size={18} color="#ffffff" />
      </button>
    </div>
  );
}
