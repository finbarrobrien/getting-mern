import React from 'react';

const Footer = ({ copyrightHolder, copyrightYear }) =>
  <footer>
    <div className="row">
      <div className="col-xs-12">
        <small>&copy; { `${copyrightHolder} ${copyrightYear}` }</small>
      </div>
    </div>
  </footer>
;

export default Footer;
