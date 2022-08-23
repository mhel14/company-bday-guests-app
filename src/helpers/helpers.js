// Sofia office coordinates
const GIVEN_LAT = 42.6665921;
const GIVEN_LON = 23.351723;

const GIVEN_DISTANCE_KM = 100;
const RADIUS_OF_EARTH = 6371e3;

export const convertMeterToKM = (meter) => meter / 1000;

export const getCoorRadian = (coordinate) => (coordinate * Math.PI) / 180;

export const calculateDistanceToKM = (lat, long) => {
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

export const sortPartnersASC = (partners) => {
  if (!partners) return;
  return partners.sort((a, b) => {
    return a.partner_id - b.partner_id;
  });
};

export const filterPartners = ({ latitude, longitude }) => {
  const distance = calculateDistanceToKM(latitude, longitude);
  if (distance <= GIVEN_DISTANCE_KM) {
    return true;
  }
  return false;
};
