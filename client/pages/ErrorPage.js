import React, { Component } from 'react';
import SPAPage from '../components/SPAPage';

export default class ErrorPage extends Component {

  constructor(props){
    super(props);
  }
  render() {
    console.log(props);
    return (
      <SPAPage bannerTitle="Oops, An Error Occurred">
        <block className="container">
          <pre>{ props.error }</pre>
          {
            props.errorMessage ?
              <p>{ props.errorMessage }</p> :
              null
          }
        </block>
      </SPAPage>
    );
  }
}


