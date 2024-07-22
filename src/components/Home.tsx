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
import SideMenu from "./SideMenu";

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
    <>
      <div className="d-flex h-100 overflow-hidden gap-3 p-3">
        <SideMenu></SideMenu>

        <Container className="main-container d-flex flex-column py-3 py-sm-4 flex-grow-1 gap-4 overflow-hidden">
          <div className="d-flex justify-content-between justify-content-sm-center align-items-center">
            {/* Title */}
            <h1 className="text-primary mb-0 text-center fw-bold">Articles</h1>
            <label
              className="side-menu-toggler d-sm-none"
              htmlFor="sideMenuToggle"
            >
              <span className="bi bi-list"></span>
            </label>
          </div>
          {/* Filters & Sorting */}
          <Row className="gy-3">
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
            <div className="w-100 bg-white rounded shadow-sm">
              <p className="d-flex align-items-center justify-content-center fw-bold text-danger mb-0 py-5">
                No articles found. Please adjust your filters or try again
                later.
              </p>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default Home;
