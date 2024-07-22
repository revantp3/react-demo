import { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { fetchArticles, selectAllArticles } from "../features/states/slice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import ArticleList from "./ArticleList";
import Filters from "./Filters";
import Loader from "./Loader";
import SortControls from "./SortControls";

const Home = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(selectAllArticles);
  const status = useAppSelector((state: any) => state.articles.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArticles());
    }
  }, [status, dispatch]);

  return (
    <Container className="py-4">
      <h1 className="text-primary text-center mb-4 fw-bold">Articles</h1>

      {/* Filters & Sorting */}
      <Row className="mb-4">
        <Col md={8}>
          <Filters />
        </Col>
        <Col md={4}>
          <SortControls />
        </Col>
      </Row>
      {status === "loading" ? (
        <Loader />
      ) : articles?.length > 0 ? (
        <ArticleList />
      ) : (
        // {/* <Pagination /> */}
        <p>No articles found. Please adjust your filters or try again later.</p>
      )}
    </Container>
  );
};

export default Home;
