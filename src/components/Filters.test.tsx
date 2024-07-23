import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "./Filters";
import "@testing-library/jest-dom/extend-expect";

describe("Filters Component", () => {
  test("renders correctly with initial props", () => {
    render(
      <Filters
        selectedCategory=""
        selectedAuthor=""
        setSelectedCategory={() => {}}
        setSelectedAuthor={() => {}}
      />
    );

    expect(screen.getByLabelText(/filter by category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by author/i)).toBeInTheDocument();
  });

  test("updates category filter and calls setSelectedCategory", () => {
    const mockSetSelectedCategory = jest.fn();
    render(
      <Filters
        selectedCategory=""
        selectedAuthor=""
        setSelectedCategory={mockSetSelectedCategory}
        setSelectedAuthor={() => {}}
      />
    );

    fireEvent.change(screen.getByLabelText(/filter by category/i), {
      target: { value: "Tech" },
    });

    expect(mockSetSelectedCategory).toHaveBeenCalledWith("Tech");
  });

  test("updates author filter and calls setSelectedAuthor", () => {
    const mockSetSelectedAuthor = jest.fn();
    render(
      <Filters
        selectedCategory=""
        selectedAuthor=""
        setSelectedCategory={() => {}}
        setSelectedAuthor={mockSetSelectedAuthor}
      />
    );

    fireEvent.change(screen.getByLabelText(/filter by author/i), {
      target: { value: "Author A" },
    });

    expect(mockSetSelectedAuthor).toHaveBeenCalledWith("Author A");
  });

  test("displays categories and authors from props", () => {
    render(
      <Filters
        selectedCategory=""
        selectedAuthor=""
        setSelectedCategory={() => {}}
        setSelectedAuthor={() => {}}
      />
    );

    expect(screen.getByText(/all categories/i)).toBeInTheDocument();
    expect(screen.getByText(/all authors/i)).toBeInTheDocument();
  });
});
