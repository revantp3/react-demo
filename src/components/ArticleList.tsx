import React, { useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { selectFilteredArticles } from "../features/states/slice";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";

const ArticleList = () => {
  const filteredArticles = useAppSelector(selectFilteredArticles);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5; 

  // Get current articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      {currentArticles.map((article) => (
        <ArticleCard key={article.title} article={article} />
      ))}
      <Pagination
        itemsPerPage={articlesPerPage}
        totalItems={filteredArticles.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ArticleList;
