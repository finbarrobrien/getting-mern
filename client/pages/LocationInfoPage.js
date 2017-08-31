import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SPAPage from '../components/SPAPage';
import StarRating from '../components/StarRating';
import Facility from '../components/Facility';
import Review from '../components/Review';
import { connect } from 'react-redux';
import { setDataAction } from '../actions';

const getApiData = (dispatch, url) => {
  console.log('get data');
  console.log(url);
  fetch(`http://localhost:3000/api/${url}`, {
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
    dispatch(setDataAction({ data }));
  }).catch((err) => {
    console.log(err);
  });
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => { getApiData(dispatch, ownProps.match.url); },
  };
};

const LocationInfoPage = ({ data, onClick, match }) => {
  console.log(this);
  if (!data) {
    return (
      <SPAPage>
        <button onClick={ onClick }>Hit me!</button>
      </SPAPage>
    );
  }
  const { name, _id, stars, distance, address, facilities, openingTimes, latLng, reviews } = data;
  return (
    <SPAPage bannerTitle={ name }>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-9">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <StarRating stars={ stars } />
                <p>{ address }</p>
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h2 className="panel-title">Opening Hours</h2>
                  </div>
                  <div className="panel-body">
                    {
                      openingTimes && openingTimes.length ?
                        openingTimes.map((time, index) => {
                          return (time.closed ?
                            <p key={ index }>{ `${time.days}: Closed` }</p> :
                            <p key={ index }>{ `${time.days}: ${time.open}-${time.close}` }</p>);
                        }) :
                        null
                    }
                  </div>
                </div>
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h2 className="panel-title">Facilities</h2>
                  </div>
                  <div className="panel-body">
                    {
                      facilities && facilities.length ?
                        facilities.map((facility) => {
                          return (<Facility key={ facility } name={ facility } />);
                        })
                        : null
                    }
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 location-map">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h2 className="panel-title">Where To Find Us</h2>
                  </div>
                  <div className="panel-body">
                    <img alt={ `asdfasdfas` }
                      className="img-responsive img-rounded"
                      src={ `http://maps.googleapis.com/maps/api/staticmap?key=AIzaSyC0MnlTnNRj8IA7n0vf922f96Js-KMPF5o&center=${latLng[1]},${latLng[0]}&zoom=14&size=400x350&sensor=false&markers=${latLng[1]},${latLng[0]}&scale=2` } />
                  </div>
                </div>
              </div>
            </div>
            <div className="row" >
              <div className="col-xs-12">
                <div className="panel panel-primary review-panel">
                  <div className="panel-heading">
                    <Link className="btn btn-default pull-right" to={{
                      pathname: `/location/${_id}/review/new`,
                      state: {
                        locationId: _id,
                        name,
                      }
                    }}>Add review</Link>
                    <h2 className="panel-title">Customer reviews</h2>
                  </div>
                  <div className="panel-body review-container">
                    {
                      reviews.map((review, index) => {
                        return (<Review key={ index } review={ review } />);
                      })
                    }
                  </div>
                </div>
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
