import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Banner from './Banner';

const SPAPage = ({ bannerTitle, subTitle, copyrightHolder, copyrightYear, children }) =>
  <div>
    <NavBar />
    <div className="container">
      <Banner title={ bannerTitle } subTitle={ subTitle } />
      { children }
      <Footer copyrightHolder={copyrightHolder} copyrightYear={copyrightYear} />
    </div>
  </div>
;

export default SPAPage;
