import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader";
import Partners from "./components/Partners/Partners";
import Popup from "./components/Popup/Popup";
import UploadButton from "./components/UploadButton/UploadButton";

// Sofia office coordinates
const GIVEN_LAT = 42.6665921;
const GIVEN_LON = 23.351723;

const GIVEN_DISTANCE_KM = 100;
const RADIUS_OF_EARTH = 6371e3;
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

  const sortPartnersASC = (partners) => {
    if (!partners) return;
    return partners.sort((a, b) => {
      return a.partner_id - b.partner_id;
    });
  };

  const filterPartners = ({ latitude, longitude }) => {
    const distance = calculateDistanceToKM(latitude, longitude);
    if (distance <= GIVEN_DISTANCE_KM) {
      return true;
    }
    return false;
  };

  const hasFieldError = (partner) => {
    if(!partner) return
    const keys = Object.keys(partner);
    if (
      !keys.includes("latitude") ||
      !keys.includes("longitude") ||
      !keys.includes("name") ||
      !keys.includes("partner_id")
    ) {
      return true;
    }
    return false;
  };

  const getPartnersWithinGivenDistance = (partners) => {
    let res = [];
    for (const partner of partners) {
      const hasError = hasFieldError(partner);
      if (hasError) {
        errorHandler("missing field");
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

  const calculateDistanceToKM = (lat, long) => {
    const targetCoorLat = getCoorRadian(GIVEN_LAT);
    const givenCoorLat = getCoorRadian(lat);
    const Δφ = getCoorRadian(lat - GIVEN_LAT);
    const Δλ = getCoorRadian(long - GIVEN_LON);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(targetCoorLat) *
        Math.cos(givenCoorLat) *
        Math.sin(Δλ / 2) *
        Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = RADIUS_OF_EARTH * c;

    return convertMeterToKM(d);
  };

  const convertMeterToKM = (meter) => meter / 1000;

  const getCoorRadian = (coordinate) => (coordinate * Math.PI) / 180;

  const doesErrorIncludes = (err, msg) => {
    return `${err}`.includes(msg);
  };

  const errorHandler = (err) => {
    if (
      doesErrorIncludes(err, "Expected double-quoted property name in JSON") ||
      doesErrorIncludes(err, "Unexpected token")
    ) {
      setErrorContent("Make sure your file is in correct format.");
    } else if (
      doesErrorIncludes(err, "Expected property name") 
      // doesErrorIncludes(err, "missing field")
    ) {
      setErrorContent("Some fields are missing.");
    }
    setDisplayError(true);
    setIsLoading(false);
    setPartners([]);
  };

  const parseTextToListOfObject = (text) => {
    let list = text?.split("\n").filter((content) => content);
    return list.map((text) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        errorHandler(e);
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

  function handleDownloadText() {
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
  }

  const handlePopupClose = () => {
    setDisplayError(false);
    setErrorContent(DEFAULT_ERROR_MSG);
  };

  return (
    <div className="App" data-testid="App">
      <div className="container">
        <h3>
          Birthday guests within 100km distance <br /> from Sofia office 🗺🧭🎉
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
