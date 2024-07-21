import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../services/store';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';

const ArticleList = () => {
  const articles = useSelector((state: RootState) => state.articles.articles);

  return (
    <div>
      {articles.map(article => (
        <ArticleCard key={article.title} article={article} />
      ))}
      <Pagination />
    </div>
  );
};

export default ArticleList;
