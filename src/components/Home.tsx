import React, { useEffect } from 'react';
import { fetchArticles, selectAllArticles } from '../features/states/slice';
import ArticleList from './ArticleList';
import Filters from './Filters';
import SortControls from './SortControls';
import Pagination from './Pagination';
import Loader from './Loader';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const Home = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(selectAllArticles);
  const status = useAppSelector((state:any) => state.articles.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchArticles());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>US Stock Market Articles</h1>
      <Filters />
      <SortControls />
      {status === 'loading' ? <Loader /> :
        (articles?.length > 0 ? (
          <div>
            <ArticleList />
            {/* <Pagination /> */}
          </div>
        ) : (
          <p>No articles found. Please adjust your filters or try again later.</p>
        ))
      }
    </div>
  );
};

export default Home;
