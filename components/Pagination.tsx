"use client";

import Button from "@/components/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const visiblePages = pages.filter(
    (p) =>
      p === 1 ||
      p === totalPages ||
      (p >= currentPage - 1 && p <= currentPage + 1)
  );

  return (
    <nav
      className="flex items-center justify-center gap-1.5 py-6"
      role="navigation"
      aria-label="Posts pagination"
    >
      {/* Prev */}
      <Button
        id="pagination-prev-btn"
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="gap-1"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Prev
      </Button>

      {/* Pages */}
      {visiblePages.map((page, idx) => {
        const prevPage = visiblePages[idx - 1];
        const showEllipsis = prevPage && page - prevPage > 1;
        return (
          <span key={page} className="flex items-center gap-1.5">
            {showEllipsis && (
              <span className="w-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                …
              </span>
            )}
            <button
              id={`pagination-page-${page}-btn`}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={[
                "w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                currentPage === page
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100",
              ].join(" ")}
            >
              {page}
            </button>
          </span>
        );
      })}

      {/* Next */}
      <Button
        id="pagination-next-btn"
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="gap-1"
      >
        Next
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </Button>
    </nav>
  );
}
