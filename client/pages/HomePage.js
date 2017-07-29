import React, { Component } from 'react';
import SPAPage from '../components/SPAPage';
import Location from '../components/Location';
import ErrorPage from './ErrorPage';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wifiLocations: [],
      error: null,
    };
  }

  componentWillMount() {

  }

  render() {
    if (this.state.error) {
      return (
        <ErrorPage error={ this.state.error.errorCode } errorMessage={ this.props.error.message } />
      );
    }
    return (
      <SPAPage bannerTitle="Loc8r" subTitle="Find places to work with wifi near you!">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8">
              <div className="row list-group">
                {
                  this.state.wifiLocations.map((location) => {
                    <Location key={ location._id } location={ location } />
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </SPAPage>
    );
  }

}

export default HomePage;

