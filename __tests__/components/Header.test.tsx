import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import { testIds } from "@/constants";

jest.mock("@/components/Navigation", () => {
  const MockNavigation = () => (
    <nav data-testid={testIds.navigation}>Navigation</nav>
  );
  MockNavigation.displayName = "MockNavigation";
  return MockNavigation;
});

describe("Header", () => {
  it("renders the header container", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders the logo link and text", () => {
    render(<Header />);
    const link = screen.getByRole("link", { name: /zenith flix/i });
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveTextContent("Zenith Flix");
  });

  it("renders the logo image", () => {
    render(<Header />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/icon.webp");
    expect(img).toHaveAttribute("alt", "logo");
  });

  it("renders the Navigation component", () => {
    render(<Header />);
    expect(screen.getByTestId("navigation")).toBeInTheDocument();
  });
});
