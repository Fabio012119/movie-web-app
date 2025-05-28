import { render, screen } from "@testing-library/react";

jest.mock("@/helpers/general", () => ({
  useVisibleCards: jest.fn(),
}));

import { useVisibleCards } from "@/helpers/general";
import ContentRowSkeleton from "@/components/ContentRowSkeleton";
import { testIds } from "@/constants";

describe("ContentRowSkeleton", () => {
  it("returns null when visibleCards is null", () => {
    (useVisibleCards as jest.Mock).mockReturnValue(null);

    const { container } = render(<ContentRowSkeleton />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the correct number of skeleton cards", () => {
    (useVisibleCards as jest.Mock).mockReturnValue(5);

    render(<ContentRowSkeleton />);
    const skeletons = screen.getAllByTestId(testIds.skeletonRow);
    expect(skeletons).toHaveLength(5);
  });

  it("renders zero skeletons if visibleCards is 0", () => {
    (useVisibleCards as jest.Mock).mockReturnValue(0);

    render(<ContentRowSkeleton />);
    const skeletons = screen.queryAllByTestId(testIds.skeletonRow);
    expect(skeletons).toHaveLength(0);
  });
});
