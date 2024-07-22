import React from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pageCount) {
      paginate(newPage);
    }
  };

  return (
    <nav aria-label="Article Pagination">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="page-link"
            aria-label="Previous Page"
          >
            Previous
          </button>
        </li>
        {[...Array(pageCount).keys()].map((i) => {
          const pageNumber = i + 1;
          return (
            <li
              key={pageNumber}
              className={`page-item ${pageNumber === currentPage ? "active" : ""}`}
            >
              <button
                onClick={() => handlePageChange(pageNumber)}
                className="page-link"
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li className={`page-item ${currentPage === pageCount ? "disabled" : ""}`}>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="page-link"
            aria-label="Next Page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
