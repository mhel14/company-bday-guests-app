import { render, screen } from "@testing-library/react";
import Partners from "./Partners";

describe("Partners Component", () => {
  let props = [
    {
      partner_id: 1,
      distance: 1,
      name: "jhon",
    },
  ];

  it("Renders Partners component when partner list is supplied", () => {
    render(<Partners partners={props} />);
    const partnerElement = screen.getByTestId("partnersWrapper");
    expect(partnerElement).toBeInTheDocument();
  });

  it("Hides Partners component when partner list is empty", () => {
    render(<Partners partners={[]} />);
    const partnerElement = screen.queryByTestId("partnersWrapper");
    expect(partnerElement).not.toBeInTheDocument();
  });
});
