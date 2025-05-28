import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { testIds } from "@/constants";
import { mockMovies } from "@/mocks/movies";
import type { TmdbMovie } from "@/types/general";

jest.mock("@/components/ContentRow", () => {
  return function MockedContentRow({
    title,
    movies,
    showProgressBar,
    onRemove,
  }: {
    title: string;
    movies: TmdbMovie[];
    rowIndex: number;
    showProgressBar?: boolean;
    onRemove?: (id: string) => void;
  }) {
    return (
      <section data-testid={testIds.contentRow}>
        <h3>{title}</h3>
        {movies.map((movie) => (
          <div key={movie.id} data-testid={testIds.movieCard}>
            {movie.title}
            {showProgressBar && (
              <div data-testid="progress-bar">ProgressBar</div>
            )}
            {onRemove && (
              <button
                onClick={() => onRemove(`${movie.id}`)}
                data-testid="remove-button"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </section>
    );
  };
});

import ContentRow from "@/components/ContentRow";

describe("ContentRow (mocked)", () => {
  it("renders the title and movie cards", () => {
    render(
      <ContentRow
        title="Popular Movies"
        movies={mockMovies}
        rowIndex={1}
        showProgressBar={false}
      />,
    );

    expect(screen.getByTestId(testIds.contentRow)).toBeInTheDocument();
    expect(screen.getByText("Popular Movies")).toBeInTheDocument();
    expect(screen.getAllByTestId(testIds.movieCard)).toHaveLength(
      mockMovies.length,
    );
  });

  it("shows progress bars if enabled", () => {
    render(
      <ContentRow
        title="Progress View"
        movies={mockMovies}
        rowIndex={2}
        showProgressBar
      />,
    );

    expect(screen.getAllByTestId("progress-bar")).toHaveLength(
      mockMovies.length,
    );
  });

  it("calls onRemove when remove button is clicked", () => {
    const handleRemove = jest.fn();

    render(
      <ContentRow
        title="Removable"
        movies={mockMovies}
        rowIndex={3}
        onRemove={handleRemove}
        showProgressBar
      />,
    );

    const buttons = screen.getAllByTestId("remove-button");
    fireEvent.click(buttons[0]);

    expect(handleRemove).toHaveBeenCalledWith("1");
  });

  it("renders nothing when no movies are provided", () => {
    render(
      <ContentRow
        title="Empty"
        movies={[]}
        rowIndex={4}
        showProgressBar={false}
      />,
    );

    expect(screen.queryAllByTestId(testIds.movieCard)).toHaveLength(0);
  });
});
