import React from 'react';
import SPAPage from '../components/SPAPage';

const ErrorPage = props =>
  <SPAPage bannerTitle="Oops, An Error Occurred">
    <block className="container">
      <pre>{ props.error }</pre>
      <p>{ props.errorMessage }</p>
    </block>
  </SPAPage>
;

export default ErrorPage;

