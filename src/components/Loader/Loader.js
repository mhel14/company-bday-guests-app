import React from "react";
import "./Loader.css";

function Loader({ isLoading }) {
  return (
    !!isLoading && (
      <div className="loaderWrapper" data-testid="loaderWrapper">
        <div className="loader" />
      </div>
    )
  );
}

export default Loader;
