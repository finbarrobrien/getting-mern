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

  getApiData = () => {
    fetch('http://localhost:3000/api/location?lng=-6.260817&lat=53.343510&distance=20000', {
      mode: 'no-cors',
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return {
        errorCode: resp.status,
        errorMessage: resp.statusText,
      };
    }).then((data) => {
      console.log(data);
      this.setState({ wifiLocations: data });
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.getApiData();
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorPage error={ this.state.error.errorCode } errorMessage={ this.props.error.errorMessage } />
      );
    }
    console.log(this.state);
    return (
      <SPAPage bannerTitle="Loc8r" subTitle="Find places to work with wifi near you!">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8">
              <div className="row list-group">
                {
                  this.state.wifiLocations.length ? this.state.wifiLocations.map((location) => {
                    console.log(location);
                    return (<Location key={ location._id } location={ location } />);
                  }) :
                    null
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

