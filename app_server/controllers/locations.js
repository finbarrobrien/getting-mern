import request from 'request';
import { mapKey } from '~/app';

const apiOptions = {
  server: 'http://localhost:3000',
}

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'http://pure-castle-77017.herokuapp.com';
}

const _renderHomePAge = (req, res, wifiLocations) => {
  console.log(wifiLocations);
  if (wifiLocations) {
    res.render('locations-list', {
      title: 'Loc8r - find a place to work with wifi',
      pageHeader: {
        title: 'Loc8r',
        strapline: 'Find places to work with wifi near you!',
      },
      sidebar: 'Looking for wifi and a seat? Loc8r helps you find places to' +
      'work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r' +
      'help you find the place you\'re looking for.',
      wifiLocations,
    });
  }
}

const _formatDistance = (distance) => {
  if (distance > 1000) {
    return `${parseFloat(distance / 1000).toFixed(1)}Km`;
  }
  return `${parseInt(distance, 10)}m`;
};

const locationsList = function (req, res) {
  const path = '/api/locations';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: {
      lng: req.query.lng,
      lat: req.query.lat,
      distance: req.query.distance,
    },
  };
  request(
    requestOptions, (err, response, data) => {
      if (data && data.length) {
        for (let i = 0; i < data.length; i += 1) {
          data[i].distance = _formatDistance(data[i].distance);
        }
      }
      if (err) {
        return res.render('error', { message: 'Error requesting location list', error: err });
      }
      if (response.statusCode !== 200) {
        return res.render('error', { message: 'Error requesting location list', error: `${response.statusCode} - ${response.statusMessage}` });
      }
      return _renderHomePAge(req, res, data);
    },
  );
};

const locationInfo = function (req, res) {
  const path = `/api/location/${req.params.locationId}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
  };
  request(
    requestOptions, (err, response, location) => {
      console.log(location);
      if (err) {
        console.log(err);
      }
      console.log(mapKey);
      res.render('location-info', { title: 'Location Info', location, mapKey });
    },
  );
};

const addReview = function (req, res) {
  res.render('location-review-form', { title: 'Add a Review' });
};

export { locationsList, locationInfo, addReview };
