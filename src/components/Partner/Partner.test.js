import { render, screen } from "@testing-library/react";
import Partner from "./Partner";

describe("Partner Component", () => {
  let props = {
    partner_id: 1,
    distance: 1,
    name: "jhon",
  };

  it("Renders Partner Component Correctly", () => {
    render(<Partner partner={props} key={props.partner_id} />);
    const partnerElement = screen.getByTestId("partner");
    expect(partnerElement).toBeInTheDocument();
  });
});
