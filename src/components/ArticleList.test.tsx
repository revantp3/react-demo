import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ArticleList from "./ArticleList";
import { rootReducer } from "../services/store";


const articles = [
  {
    image: "/path/to/image1.jpg",
    title: "Test Article 1",
    body: "<p>Body 1</p>",
    source: "Source 1",
    date: "2024-07-23",
    url: "https://example.com/1",
  },
  {
    image: "/path/to/image2.jpg",
    title: "Test Article 2",
    body: "<p>Body 2</p>",
    source: "Source 2",
    date: "2024-07-24",
    url: "https://example.com/2",
  },
  {
    image: "/path/to/image3.jpg",
    title: "Test Article 3",
    body: "<p>Body 3</p>",
    source: "Source 3",
    date: "2024-07-25",
    url: "https://example.com/3",
  },
  {
    image: "/path/to/image4.jpg",
    title: "Test Article 4",
    body: "<p>Body 4</p>",
    source: "Source 4",
    date: "2024-07-26",
    url: "https://example.com/4",
  },
  {
    image: "/path/to/image5.jpg",
    title: "Test Article 5",
    body: "<p>Body 5</p>",
    source: "Source 5",
    date: "2024-07-27",
    url: "https://example.com/5",
  },
  {
    image: "/path/to/image6.jpg",
    title: "Test Article 6",
    body: "<p>Body 6</p>",
    source: "Source 6",
    date: "2024-07-28",
    url: "https://example.com/6",
  },
];

const initialState = {
  articles: {
    filteredAndSortedArticles: articles,
  },
};

const mockStore = configureStore({
  reducer: rootReducer
});

const renderComponent = (store:any) => {
  render(
    <Provider store={store}>
      <ArticleList />
    </Provider>
  );
};

test("renders article list and paginates correctly", () => {
  renderComponent(mockStore);

  const articleCards = screen.getAllByRole("button");
  expect(articleCards).toHaveLength(5); // Only 5 articles should be displayed per page

  const nextPageButton = screen.getByText("Next");
  fireEvent.click(nextPageButton);

  const articleCardsNextPage = screen.getAllByRole("button");
  expect(articleCardsNextPage).toHaveLength(1); // Only 1 article should be displayed on the next page
});

test("renders correct articles on pagination", () => {
  renderComponent(mockStore);

  // Check first page articles
  expect(screen.getByText("Test Article 1")).toBeInTheDocument();
  expect(screen.getByText("Test Article 2")).toBeInTheDocument();
  expect(screen.getByText("Test Article 3")).toBeInTheDocument();
  expect(screen.getByText("Test Article 4")).toBeInTheDocument();
  expect(screen.getByText("Test Article 5")).toBeInTheDocument();

  const nextPageButton = screen.getByText("Next");
  fireEvent.click(nextPageButton);

  // Check second page articles
  expect(screen.getByText("Test Article 6")).toBeInTheDocument();
});

test("paginates to previous page correctly", () => {
  renderComponent(mockStore);

  const nextPageButton = screen.getByText("Next");
  fireEvent.click(nextPageButton);

  const prevPageButton = screen.getByText("Previous");
  fireEvent.click(prevPageButton);

  // Check first page articles again
  expect(screen.getByText("Test Article 1")).toBeInTheDocument();
  expect(screen.getByText("Test Article 2")).toBeInTheDocument();
  expect(screen.getByText("Test Article 3")).toBeInTheDocument();
  expect(screen.getByText("Test Article 4")).toBeInTheDocument();
  expect(screen.getByText("Test Article 5")).toBeInTheDocument();
});
