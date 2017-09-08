import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Panel, Button } from 'react-bootstrap';
import SPAPage from '../components/SPAPage';
import MapImage from '../components/MapImage';
import StarRating from '../components/StarRating';
import Facility from '../components/Facility';
import Review from '../components/Review';
import { getLocationInfo } from '../actions/async';

const mapStateToProps = (store) => {
  return {
    data: store.locationInfo.data,
    state: store.locationInfo.state,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => { dispatch(getLocationInfo(ownProps.match.url)); },
  };
};

const LocationInfoPage = ({ data, state, onLoad, match }) => {
  console.log(this);
  console.log(state);
  switch (state) {
    case 'NO_DATA':
      onLoad();
      return (
        <SPAPage>
          <div>No data yet</div>
        </SPAPage>
      );
    case 'LOADING':
      return (
        <SPAPage>
          <div>Loading</div>
        </SPAPage>
      );
    case 'ERROR':
      return (
        <SPAPage>
          <div>Error</div>
        </SPAPage>
      );
    default:
      break;
  }
  const { name, _id, stars, address, facilities, openingTimes, latLng, reviews } = data;
  const ReviewPanelHeader = (
    <div>Customer Reviews
      <Link
        to={ { pathname: `/location/${_id}/review/new`,
          state: {
            locationId: _id,
            name,
          } } }>
        <Button bsStyle="default pull-right">Add review</Button>
      </Link>
    </div>);
  return (
    <SPAPage bannerTitle={ name }>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-9">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <StarRating stars={ stars } />
                <p>{ address }</p>
                <Panel header="Opening Hours" bsStyle="primary">
                  {
                    openingTimes && openingTimes.length ?
                      openingTimes.map((time, index) => {
                        return (time.closed ?
                          <p key={ index }>{ `${time.days}: Closed` }</p> :
                          <p key={ index }>{ `${time.days}: ${time.open}-${time.close}` }</p>);
                      }) :
                      null
                  }
                </Panel>
                <Panel header="Facilities" bsStyle="primary">
                  {
                    facilities && facilities.length ?
                      facilities.map((facility) => {
                        return (<Facility key={ facility } name={ facility } />);
                      })
                      : null
                  }
                </Panel>
              </div>
              <div className="col-xs-12 col-sm-6 location-map">
                <Panel header="Where To Find Us" bsStyle="primary">
                  <MapImage
                    name={ name }
                    latitude={ latLng[1] }
                    longitude={ latLng[0] }
                    zoom={ 14 }
                    width={ 400 }
                    height={ 350 }/>
                </Panel>
              </div>
            </div>
            <div className="row" >
              <div className="col-xs-12">

                <Panel header={ ReviewPanelHeader } bsStyle="primary">
                  {
                    reviews.map((review, index) => {
                      return (<Review key={ index } review={ review } />);
                    })
                  }
                </Panel>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-3">
            <p className="lead">
              { `${name} is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done` }
            </p>
            <p>{ "If you've been and you like it - or if you don't - please leave a review to help other people just like you." }</p>
          </div>
        </div>
      </div>
    </SPAPage>
  );
};

const ReduxLocationInfoPage = connect(mapStateToProps, mapDispatchToProps)(LocationInfoPage);

export default ReduxLocationInfoPage;
