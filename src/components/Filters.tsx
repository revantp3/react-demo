import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorFilter, setCategoryFilter } from "../features/states/slice";
import { RootState } from "../services/store";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
    <>
      <Row>
        <Col md={6}>
          <Form.Label htmlFor="category-filter">Filter by Category:</Form.Label>
          <Form.Select
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
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Label htmlFor="author-filter">Filter by Author:</Form.Label>
          <Form.Select
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
          </Form.Select>
        </Col>
      </Row>
    </>
  );
};

export default Filters;
