import React from 'react';

const Footer = props =>
  <footer>
    <div className="row">
      <div className="col-xs-12">
        <small>&copy; { `${props.copyrightHolder} ${props.copyrightYear}` }</small>
      </div>
    </div>
  </footer>
;

export default Footer;
