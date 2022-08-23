import React from "react";
import "./Partner.css";

function Partner({ partner: { partner_id, distance, name } }) {
  return (
    <li className="partner" data-testid="partner">
      <span className="partnerID">{partner_id}</span>
      <span>{name}</span>
      <span className="tooltiptext">Distance: {distance} km</span>
    </li>
  );
}

export default Partner;
