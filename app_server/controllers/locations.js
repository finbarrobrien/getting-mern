import request from 'request';
import { mapKey } from '~/app';

const apiOptions = {
  server: 'http://localhost:3000',
}

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'http://pure-castle-77017.herokuapp.com';
}

const renderHomePage = (req, res, wifiLocations) => {
  console.log(wifiLocations);
  if (wifiLocations !== undefined) {
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

const locationsList = function (req, res) {
  if (req.query.lat && req.query.lng) {
    const path = '/api/locations';
    const requestOptions = {
      url: apiOptions.server + path,
      method: 'GET',
      json: {},
      qs: {
        lng: req.query.lng,
        lat: req.query.lat,
        maxDistance: 1000,
      },
    };
    request(
      requestOptions, (err, response, body) => {
        renderHomePage(req, res, body);
      },
    );
  } else {
    // renderMapPage(req, res, body);
  }
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

const locationSearch = function (req, res) {
  const mapInit = () => {
    const showPosition = (position) => {
      console.log(`Geolocation position is: [${position.coords.latitude}, ${position.coords.longitude}]`);
      const currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
      const marker = new google.maps.Marker({
        position: currentLocation,
        map: map,
      });
      map.setCenter(currentLocation);
    }

    const getLocation = () => {
      if (navigator.geolocation) {
        console.log('Geolocation is available');
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log('Geolocation is not available');
      }
    }

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom : 8,
      center : { lat: -25.363, lng: 131.044 },
    });

    getLocation();
  };

  res.render('location-search', { title: 'Loc8r search', mapInit, mapKey });
};

const addReview = function (req, res) {
  res.render('location-review-form', { title: 'Add a Review' });
};

export { locationSearch, locationsList, locationInfo, addReview };
