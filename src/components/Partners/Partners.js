import React from 'react'
import DownloadButton from '../DownloadButton/DownloadButton'
import Partner from '../Partner/Partner'
import './Partners.css'

function Partners({partners, handleDownloadText}) {
  return !!partners.length && (
    <div className="partnersWrapper" data-testid="partnersWrapper">
      <ul className="partners">
        <li className="partnerHeading" key={"heading"}>
          <span className="partnerID">ID</span>
          <span>Name</span>
          <DownloadButton handleDownloadText={handleDownloadText} />
        </li>

        {partners.map((partner) => (
          <Partner partner={partner} key={partner.partner_id}/>
        ))}
      </ul>
    </div>
  )
}

export default Partners