import React, { Component } from 'react';
import SPAPage from '../components/SPAPage';
import StarRating from './StarRating';
import Facility from './Facility';

export default class LocationInfoPage extends Component {

  render() {
    const {name, _id, stars, distance, address, facilities, openingTimes, latLng } = props.location;
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
                      // opening times loop
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
                      <h2 className="panel-title">Opening Hours</h2>
                    </div>
                    <div className="panel-body">
                      <img alt={ `asdfasdfas` }
                        className="img-responsive img-rounded"
                        src={ `http://maps.googleapis.com/maps/api/staticmap?key=${mapKey}&center=${latLng[1]},${latLng[0]}&zoom=14&size=400x350&sensor=false&markers=${latLng[1]},${latLng[0]}&scale=2` } />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" >
                <div className="col-xs-12">
                  <div className="panel panel-primary review-panel">
                    <div className="panel-heading">
                      <a className="btn btn-default pull-right" href={ `/location/${_id}/review/new` }>Add review</a>
                      <h2 className="panel-title">Customer reviews</h2>
                    </div>
                    <div className="panel-body review-container">
                      // reviews
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
  }

}
