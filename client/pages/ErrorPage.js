import React, { Component } from 'react';
import SPAPage from '../components/SPAPage';

/**
 * todo - get props/state from route location
 */
const ErrorPage = ({ error, errorMessage }) => {

  return (
    <SPAPage bannerTitle="Oops, An Error Occurred">
      <block className="container">
        <pre>{ error }</pre>
        {
          errorMessage ?
            <p>{ errorMessage }</p> :
            null
        }
      </block>
    </SPAPage>
  );
};

export default ErrorPage;
