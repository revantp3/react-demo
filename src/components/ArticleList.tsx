import React, { useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { selectFilteredAndSortedArticles } from "../features/states/slice";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";

const ArticleList = () => {
  const filteredAndSortedArticles = useAppSelector(
    selectFilteredAndSortedArticles
  );
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5; // Adjust this value as needed

  // Get current articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredAndSortedArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="card-layout mb-4">
        {currentArticles.map((article) => (
          <ArticleCard key={article.title} article={article} />
        ))}
      </div>
      <Pagination
        itemsPerPage={articlesPerPage}
        totalItems={filteredAndSortedArticles.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default ArticleList;
