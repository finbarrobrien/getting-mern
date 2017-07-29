import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Banner from './Banner';

const SPAPage = props =>
  <div>
    <NavBar />
    <div className="container">
      <Banner title={ props.bannerTitle } subTitle={ props.subTitle } />
      { props.children }
      <Footer copyrightHolder="Finbarr O'Brien" copyrightYear="2017" />
    </div>
  </div>
;

export default SPAPage;
