import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader";
import Partners from "./components/Partners/Partners";
import Popup from "./components/Popup/Popup";
import UploadButton from "./components/UploadButton/UploadButton";
import { hasFieldError } from "./helpers/errorHandling";
import {
  calculateDistanceToKM,
  filterPartners,
  sortPartnersASC,
} from "./helpers/helpers";

const DEFAULT_ERROR_MSG = "Oops! Something went wrong. pls try again.";

function App() {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [errorContent, setErrorContent] = useState(DEFAULT_ERROR_MSG);

  useEffect(() => {
    if (partners?.length) {
      const loaderTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => {
        clearTimeout(loaderTimeout);
      };
    }
  }, [partners]);

  const getPartnersWithinGivenDistance = (partners) => {
    let res = [];
    for (const partner of partners) {
      const hasError = hasFieldError(partner);
      if (hasError) {
        errorHandler();
        break;
      }

      const distance = calculateDistanceToKM(
        partner?.latitude,
        partner?.longitude
      ).toFixed(2);
      res = [...res, { ...partner, distance }];
    }
    res = res?.filter(filterPartners);

    return res;
  };

  const parseTextToListOfObject = (text) => {
    let list = text?.split("\n").filter((content) => content);
    return list.map((text) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        errorHandler();
      }
      return null;
    });
  };

  const handleUploadText = (e) => {
    e.preventDefault();
    // Cancel function call when upload is started but cancelled
    if (!e.target.files[0]) return;

    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      let partnersText = e.target.result;
      let partners = parseTextToListOfObject(partnersText);
      partners = sortPartnersASC(getPartnersWithinGivenDistance(partners));

      setPartners(partners);
    };

    reader.readAsText(e.target.files[0]);
  };

  const handleDownloadText = () => {
    let text = Object.values(partners);
    text = JSON.stringify(text);

    const element = document.createElement("a");
    const file = new Blob([text], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "birthday_guests.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handlePopupClose = () => {
    setDisplayError(false);
    setErrorContent(DEFAULT_ERROR_MSG);
  };

  const errorHandler = () => {
    setErrorContent(
      "Make sure fields are complete and your file is in correct format."
    );
    setDisplayError(true);
    setIsLoading(false);
    setPartners([]);
  };

  return (
    <div className="App" data-testid="App">
      <div className="container">
        <h3>
          Display Partners within 100km distance <br /> from Sofia office 🗺🧭🎉
        </h3>
        <UploadButton onUpload={handleUploadText} />
        <Partners partners={partners} handleDownloadText={handleDownloadText} />
        <Loader isLoading={isLoading} />
        <Popup
          displayError={displayError}
          handlePopupClose={handlePopupClose}
          content={errorContent}
        />
      </div>
    </div>
  );
}

export default App;
