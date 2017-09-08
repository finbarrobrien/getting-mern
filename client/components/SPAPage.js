import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Banner from './Banner';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    owner: state.copyright.owner,
    year: state.copyright.year,
  };
};

const Page = ({ bannerTitle, subTitle, owner, year, children }) =>
  <div>
    <NavBar />
    <div className="container">
      <Banner title={ bannerTitle } subTitle={ subTitle } />
      { children }
      <Footer copyrightHolder={ owner } copyrightYear={ year } />
    </div>
  </div>
;

const SPAPage = connect(mapStateToProps)(Page);

export default SPAPage;
