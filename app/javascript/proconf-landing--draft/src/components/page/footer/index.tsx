import React from "react";
import './Footer.css';

const FooterDetails = () => {
  return (
    <div className='footer-details'>
      <div className='footer-details__owners'>
        <div className='footer-details__owners-item'>
          Разработка - Rubizza ProConf Team
        </div>
      </div>
      <div className='footer-details__copy'>&copy; ProConf 2K19</div>
    </div>
  );
};

const Footer = ({ children }: { children: JSX.Element }) => {
  return <div className='footer'>{children}</div>;
};

Footer.Details = FooterDetails;

export {
  Footer as default,
}
