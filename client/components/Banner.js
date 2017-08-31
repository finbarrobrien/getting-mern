import React from 'react';

const Banner = ({ title, subTitle }) => {
  return (
    <div id="banner" className="page-header">
      <div className="row">
        <div className="col-md-6.col-sm-12">
          <h1>{ title } { subTitle ? <small>&nbsp; { subTitle }</small> : null }</h1>
        </div>
      </div>
    </div>);
};

export default Banner;
