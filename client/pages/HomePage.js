import React from 'react';
import { connect } from 'react-redux';
import{ Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';
import SPAPage from '../components/SPAPage';
import Location from '../components/Location';
import ErrorPage from './ErrorPage';
import { getLocationList } from '../actions/async';

const mapStateToProps = (store) => {
  return {
    data: store.locationList.data,
    state: store.locationList.state,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => { dispatch(getLocationList({ lat: 53.343510, lng: -6.260817, distance: 20000 })); },
  };
};

const Page = ({ data, state, onLoad, match }) => {
  switch (state) {
    case 'ERROR':
      return (
        <ErrorPage error={ 123 } errorMessage=' message error ' />
      );
    case 'NO_DATA':
      onLoad();
      return null; // Display laoding spinner until completed
    case 'LOADING':
      return null; // display spinner
    default:
      break;
  }
  return (
    <SPAPage bannerTitle="Loc8r" subTitle="Find places to work with wifi near you!">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <Jumbotron>
              <h1>Welcome to Loc8r</h1>
              <p>Find places to relax and enjoy coffee, bites or simply work with WiFi nearby</p>
              <p><Link to="/about"><Button bsStyle="primary">Learn More</Button></Link></p>
            </Jumbotron>
            <div className="row list-group">
              {
                data.length ? data.map((location) => {
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
};

const HomePage = connect(mapStateToProps, mapDispatchToProps)(Page);

export default HomePage;

