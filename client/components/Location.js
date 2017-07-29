import React from 'react';
import StarRating from './StarRating';
import Facility from './Facility';

const _formatDistance = (distance) => {
  if (distance > 1000) {
    return `${parseFloat(distance / 1000).toFixed(1)}Km`;
  }
  return `${parseInt(distance, 10)}m`;
};

const Location = (props) => {
  const { name, stars, distance, address, facilities, _id } = props.location;
  return (
    <div className="col-xs-12 list-group-item">
      <h4>
        <a href={ `/location/${_id}` }>{ name }</a>
        <small>&nbsp; <StarRating stars={ stars } /></small>
        <span className="badge pull-right badge-default">{ _formatDistance(distance) }</span>
      </h4>
      <p className="address">{ address }</p>
      <p>
        {
          facilities && facilities.length ?
          facilities.map((facility) => {
            return (<Facility key={ facility } name={ facility } />);
          })
          : null
        }
      </p>
    </div>
  );
};

export default Location;

/*
mixin location(location)
  div.col-xs-12.list-group-item
    h4
      a(href="/location/"+location._id)=location.name
      small &nbsp;
        +starRating(location.stars)
      span.badge.pull-right.badge-default=location.distance
    p.address=location.address
    p
      if location.facilities
      each facility in location.facilities
        +facility(facility)
        | &nbsp;
 */
