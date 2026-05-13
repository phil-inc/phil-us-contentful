import React from "react";
import * as classes from "./pagination.module.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={classes.pager} aria-label="Pagination">
      <button
        className={`${classes.btn} ${currentPage === 1 ? classes.disabled : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={`${classes.btn} ${p === currentPage ? classes.active : ""}`}
          onClick={() => onPageChange(p)}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </button>
      ))}
      <button
        className={`${classes.btn} ${currentPage === totalPages ? classes.disabled : ""}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
