import React from "react";
import * as classes from "./pagination.module.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /**
   * When set, pages render as <a href> links to this URL instead of buttons.
   * Crawlers follow hrefs but never click buttons, so a paginated listing needs
   * this for its later pages to be found. A plain click still goes through
   * onPageChange; modified clicks (new tab, etc.) are left to the browser.
   */
  getPageHref?: (page: number) => string;
};

type PageControlProps = {
  page: number;
  className: string;
  disabled?: boolean;
  onPageChange: (page: number) => void;
  getPageHref?: (page: number) => string;
  children: React.ReactNode;
} & Pick<React.AriaAttributes, "aria-label" | "aria-current">;

function PageControl({ page, className, disabled, onPageChange, getPageHref, children, ...aria }: PageControlProps) {
  if (!getPageHref) {
    return (
      <button className={className} onClick={() => onPageChange(page)} disabled={disabled} {...aria}>
        {children}
      </button>
    );
  }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onPageChange(page);
  };

  // An unreachable previous/next gets no href, so it is not a link. The inline
  // style rather than a new CSS rule: this site inlines each page's CSS, and a
  // rule missing after a client-side navigation is what broke MRTG-1457.
  return (
    <a
      className={className}
      href={disabled ? undefined : getPageHref(page)}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      style={{ textDecoration: "none" }}
      {...aria}
    >
      {children}
    </a>
  );
}

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
  getPageHref,
}) => {
  const pages = getPageRange(currentPage, totalPages);
  const control = { onPageChange, getPageHref };

  return (
    <nav className={classes.pager} aria-label="Pagination">
      <PageControl
        {...control}
        page={currentPage - 1}
        className={`${classes.btn} ${currentPage === 1 ? classes.disabled : ""}`}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </PageControl>
      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className={classes.ellipsis}>…</span>
        ) : (
          <PageControl
            {...control}
            key={p}
            page={p}
            className={`${classes.btn} ${p === currentPage ? classes.active : ""}`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </PageControl>
        )
      )}
      <PageControl
        {...control}
        page={currentPage + 1}
        className={`${classes.btn} ${currentPage === totalPages ? classes.disabled : ""}`}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </PageControl>
    </nav>
  );
};

export default Pagination;
