import React from "react";
import "./Popup.css";

const Popup = ({ displayError, heading, content, handlePopupClose }) => {
  return (
    !!displayError && (
      <div className="popup-box" data-testid="popupWrapper">
        <div className="box">
          <span
            className="close-icon"
            data-testid="closeIcon"
            onClick={handlePopupClose}
          >
            x
          </span>
          <p className="heading">{heading || "Oops! Something went wrong!"}</p>
          <p>{content}</p>
        </div>
      </div>
    )
  );
};

export default Popup;
