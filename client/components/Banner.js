import React from 'react';

const Banner = props =>
  <div id="banner" className="page-header">
    <div className="row">
      <div className="col-md-6.col-sm-12">
        <h1>{ props.title }  { props.subTitle ? <small>&nbsp; { props.subTitle }</small> : null }</h1>
      </div>
    </div>
  </div>
;

export default Banner;
