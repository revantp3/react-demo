import React from 'react';
import { useDispatch } from 'react-redux';
import { sortArticles } from '../features/states/slice';

const SortControls = () => {
  const dispatch = useDispatch();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortArticles(event.target.value as 'date_desc' | 'date_asc' | 'title_asc' | 'title_desc'));
  };

  return (
    <div>
      <label htmlFor="sort-select">Sort Articles:</label>
      <select id="sort-select" onChange={handleSortChange} defaultValue="date_desc">
        <option value="date_desc">Date - Newest to Oldest</option>
        <option value="date_asc">Date - Oldest to Newest</option>
        <option value="title_asc">Title - A to Z</option>
        <option value="title_desc">Title - Z to A</option>
      </select>
    </div>
  );
};

export default SortControls;
