import React from "react";
import * as classes from "./pagination.module.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPageRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("ellipsis");

  pages.push(total);
  return pages;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = getPageRange(currentPage, totalPages);

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
      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className={classes.ellipsis}>…</span>
        ) : (
          <button
            key={p}
            className={`${classes.btn} ${p === currentPage ? classes.active : ""}`}
            onClick={() => onPageChange(p)}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}
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
