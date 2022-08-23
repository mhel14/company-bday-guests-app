import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Popup from "./components/Popup/Popup";
import UploadButton from "./components/UploadButton/UploadButton";

describe("App Component", () => {
  it("Renders App component", () => {
    render(<App />);
    const popupElement = screen.getByTestId("App");
    expect(popupElement).toBeInTheDocument();
  });

  it("Handles handlePopupClose function correctly", () => {
    const handleClick = jest.fn();
    render(<Popup handlePopupClose={handleClick} displayError={true} />);
    fireEvent.click(screen.queryByTestId("closeIcon"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe("Upload text function", () => {
  const handleUpload = jest.fn();

  it("Handles file upload function correctly", () => {
    render(<UploadButton onUpload={handleUpload} />);
    const fakeFile = new File(["hello"], "hello.txt", { type: "txt" });
    const inputFileUpload = screen.getByTestId(/fileUploadInput/i);
    userEvent.upload(inputFileUpload, fakeFile);

    expect(inputFileUpload.files[0]).toStrictEqual(fakeFile);
  });
});
