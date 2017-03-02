import request from 'request';
import { mapKey } from '~/app';

const apiOptions = {
  server: 'http://localhost:3000',
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'http://pure-castle-77017.herokuapp.com';
}

const _showError = (res, message) => {
  let title;
  let content;
  if (res.statusCode === 404) {
    title = '404, page not found';
    content = 'Looks like we can\'t find that page, sorry.';
  } else {
    title = `${res.statusCode}, something is wrong`;
    content = 'Something went wrong and we couldn\'t complete your request.';
  }
  res.render('error', { title, content, message });
};

const _renderHomePage = (req, res, wifiLocations) => {
  console.log(wifiLocations);
  return res.render('locations-list', {
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
};

const _formatDistance = (distance) => {
  if (distance > 1000) {
    return `${parseFloat(distance / 1000).toFixed(1)}Km`;
  }
  return `${parseInt(distance, 10)}m`;
};

const locationList = (req, res) => {
  const path = '/api/location';
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
  return request(
    requestOptions, (err, response, data) => {
      if (data && data.length) {
        for (let i = 0; i < data.length; i += 1) {
          data[i].distance = _formatDistance(data[i].distance);
        }
      }
      if (err) {
        return _showError(res, err);
      }
      if (response.statusCode !== 200) {
        return _showError(res, `${response.statusCode} - ${response.statusMessage}`);
      }
      return _renderHomePage(req, res, data);
    },
  );
};

const _getLocationInfo = (req, res, callback) => {
  const path = `/api/location/${req.params.locationId}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
  };
  return request(
    requestOptions, (err, response, body) => {
      if (response.statusCode === 200) {
        return callback(body);
      }
      if (err) {
        return _showError(res, err);
      }
      return _showError(res, body);
    },
  );
};

const locationInfo = (req, res) =>
  _getLocationInfo(req, res, (location) => {
    res.render('location-info', { title: 'Location Info', location, mapKey });
  });

const addReviewForm = (req, res) => {
  if (!req.params.locationId) {
    return res.render('error', { message: 'Request query parameter locationId is missing', error: '400 - Bad Request' });
  }
  return _getLocationInfo(req, res, (location) => {
    res.render('location-review-form', { title: 'Add a Review', location });
  });
};

const doAddReview = (req, res) => {
  const locationId = req.params.locationId;
  const path = `/api/location/${locationId}/reviews`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    form: req.body,
  };
  return request(
    requestOptions, (err, response, body) => {
      if (err) {
        return _showError(res, err);
      }
      if (response.statusCode === 201) {
        return res.redirect(`/location/${locationId}`);
      }
      return _showError(res, body);
    },
  );
};

export { locationList, locationInfo, addReviewForm, doAddReview };
