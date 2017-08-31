import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Banner from './Banner';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    copyrightHolder: state.copyrightHolder,
    copyrightYear: state.copyrightYear,
  };
};

const Page = ({ bannerTitle, subTitle, copyrightHolder, copyrightYear, children }) =>
  <div>
    <NavBar />
    <div className="container">
      <Banner title={ bannerTitle } subTitle={ subTitle } />
      { children }
      <Footer copyrightHolder={copyrightHolder} copyrightYear={copyrightYear} />
    </div>
  </div>
;

const SPAPage = connect(mapStateToProps)(Page);

export default SPAPage;
