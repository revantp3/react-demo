import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../services/store";
import { setCurrentPage } from "../features/states/slice";

const Pagination = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.articles.articles);
  const currentPage = useSelector(
    (state: RootState) => state.articles.currentPage
  );
  const articlesPerPage = 5; 

  const pageCount = Math.ceil(articles.length / articlesPerPage);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <button
              onClick={() => handlePageChange(number)}
              className="page-link"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
