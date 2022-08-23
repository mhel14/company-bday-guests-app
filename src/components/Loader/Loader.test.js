import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader Component", () => {
  it("Renders Loader Component when props isLoading is true", () => {
    render(<Loader isLoading={true} />);
    const loaderElement = screen.getByTestId("loaderWrapper");
    expect(loaderElement).toBeInTheDocument();
  });

  it("Hides Loader Component when props isLoading is false", () => {
    render(<Loader isLoading={false} />);
    const loaderElement = screen.queryByTestId("loaderWrapper");
    expect(loaderElement).not.toBeInTheDocument();
  });
});
