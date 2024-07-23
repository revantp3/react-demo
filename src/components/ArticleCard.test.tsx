import React from "react";
import { render, screen, fireEvent, waitFor, cleanup, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ArticleCard from "./ArticleCard";

const article = {
  image: "/path/to/image.jpg",
  title: "Test Article",
  body: "<p>This is the body of the test article.</p>",
  source: "Test Source",
  date: "2024-07-23",
  url: "https://example.com/test-article",
};

afterEach(cleanup);

test("renders article card with title and body", () => {
  render(<ArticleCard article={article} />);

  const cardTitle = screen.getByRole("heading", { level: 5 });
  const cardBody = screen.getByText("This is the body of the test article.", { selector: "p" });

  expect(cardTitle).toBeInTheDocument();
  expect(cardBody).toBeInTheDocument();
});

test("opens modal on card click", async () => {
  render(<ArticleCard article={article} />);

  const card = screen.getByRole("button");
  
  await act(async () => {
    fireEvent.click(card);
  });

  const modal = await screen.findByTestId("article-modal");
  expect(modal).toBeVisible();
});
