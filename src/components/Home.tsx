import { useCallback, useEffect, useState } from "react";
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
import { Button, Collapse } from "react-bootstrap";
import ToggleView from "./ToggleView";

const Home = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(selectAllArticles);
  const status = useAppSelector((state: any) => state.articles.status);

  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true);
  const [isSortControlsCollapsed, setIsSortControlsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<
    "date_desc" | "date_asc" | "title_asc" | "title_desc"
  >("date_desc");

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArticles());
    }
  }, [status, dispatch]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <>
      <div className="d-flex h-100 overflow-hidden gap-3 p-3">
        <SideMenu />
        <Container className="main-container d-flex flex-column py-3 py-sm-4 flex-grow-1 gap-3 gap-sm-4 overflow-hidden">
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
          {isMobile && (
            <div className="d-flex justify-content-end align-items-center gap-3">
              <Button
                variant="outline-primary"
                onClick={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
                aria-controls="filters-collapse"
                aria-expanded={!isFiltersCollapsed}
              >
                <span className="bi bi-funnel-fill"></span>
              </Button>

              <Button
                variant="outline-primary"
                onClick={() =>
                  setIsSortControlsCollapsed(!isSortControlsCollapsed)
                }
                aria-controls="sort-controls-collapse"
                aria-expanded={!isSortControlsCollapsed}
              >
                <span className="bi bi-filter-square-fill"></span>
              </Button>
            </div>
          )}
          <Row className="gy-3">
            {!isMobile || !isFiltersCollapsed ? (
              <Col md={8}>
                {isMobile ? (
                  <Collapse in={!isFiltersCollapsed}>
                    <div id="filters-collapse">
                      <Filters
                        selectedCategory={selectedCategory}
                        selectedAuthor={selectedAuthor}
                        setSelectedCategory={setSelectedCategory}
                        setSelectedAuthor={setSelectedAuthor}
                      />
                    </div>
                  </Collapse>
                ) : (
                  <Filters
                    selectedCategory={selectedCategory}
                    selectedAuthor={selectedAuthor}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedAuthor={setSelectedAuthor}
                  />
                )}
              </Col>
            ) : null}
            {!isMobile || !isSortControlsCollapsed ? (
              <Col md={4}>
                {isMobile ? (
                  <Collapse in={!isSortControlsCollapsed}>
                    <div id="sort-controls-collapse">
                      <SortControls
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort}
                      />
                    </div>
                  </Collapse>
                ) : (
                  <SortControls
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort}
                  />
                )}
              </Col>
            ) : null}
          </Row>

          {/* End: Filters & Sorting */}

          {status === "loading" ? (
            <Loader />
          ) : articles?.length > 0 ? (
            <ArticleList />
          ) : (
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
