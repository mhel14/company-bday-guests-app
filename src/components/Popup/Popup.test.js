import { render, screen } from "@testing-library/react";
import Popup from "./Popup";

describe("Popup Component", () => {
  const props = {
    displayError: true,
    heading: "Heading",
    content: "Content",
    handlePopupClose: () => {},
  };

  it("Renders Popup component when props displayError is true", () => {
    render(<Popup {...props} />);
    const popupElement = screen.getByTestId("popupWrapper");
    expect(popupElement).toBeInTheDocument();
  });

  it("Hides Popup component when props displayError is false", () => {
    render(<Popup {...props} displayError={false} />);
    const popupElement = screen.queryByTestId("popupWrapper");
    expect(popupElement).not.toBeInTheDocument();
  });

  it("Uses default heading when props heading is null", () => {
    render(<Popup {...props} heading="" />);
    // const popupElement = screen.queryByText("Heading");
    const popupElementHeading = screen.getByText("Oops! Something went wrong!");
    expect(popupElementHeading).toBeInTheDocument();
  });
});
