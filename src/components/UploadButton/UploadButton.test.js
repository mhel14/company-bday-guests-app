import { render, screen } from "@testing-library/react";
import UploadButton from "./UploadButton";

describe("UploadButton Component", () => {
  it("Renders UploadButton component", () => {
    render(<UploadButton />);
    const partnerElement = screen.getByTestId("fileUpload");
    expect(partnerElement).toBeInTheDocument();
  });
});
