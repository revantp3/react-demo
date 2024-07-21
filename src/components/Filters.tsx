import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../services/store";
import { setCategoryFilter, setAuthorFilter } from "../features/states/slice";

const Filters = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.articles.articles);
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);

  useEffect(() => {
    const categorySet = new Set(
      articles?.map((article: any) => article.source)
    );
    const authorSet = new Set(articles?.map((article: any) => article.author));
    setCategories([...categorySet]);
    setAuthors([...authorSet]);
  }, [articles]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setCategoryFilter(event.target.value));
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setAuthorFilter(event.target.value));
  };

  return (
    <div>
      <div>
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          onChange={handleCategoryChange}
          defaultValue=""
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="author-filter">Filter by Author:</label>
        <select
          id="author-filter"
          onChange={handleAuthorChange}
          defaultValue=""
        >
          <option value="">All Authors</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
