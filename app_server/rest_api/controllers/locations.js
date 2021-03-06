/**
 * Controller for the location REST API endpoints
 */
import moment from 'moment';
import { mongoDbConn } from '../../db';
import randomData from '../../test/data/dataGenerator';

// Access the global mongoDbConn
const Loc = mongoDbConn.model('Location');

const _sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
  res.end();
};

const _createLocation = (location, callback) =>
  Loc.create(location, callback);

const locationCreate = (req, res) => {
  const newLocation = {
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(','),
    latLng: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingTimes: [{
      days: req.body.days1,
      open: req.body.opening1,
      close: req.body.closing1,
      closed: req.body.closed1,
    }, {
      days: req.body.days2,
      open: req.body.opening2,
      close: req.body.closing2,
      closed: req.body.closed2,
    }],
  };

  const callback = (err, loc) => {
    if (err) {
      return _sendJsonResponse(res, 400, err);
    }
    return _sendJsonResponse(res, 201, loc);
  };

  return _createLocation(newLocation, callback);
};

const locationListByDistance = (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  if ((!lat && lat !== 0) || (!lng && lng !== 0)) {
    return _sendJsonResponse(res, 400, { message: 'lat and lng query parameters are required' });
  }

  const point = { type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] };
  const geoOptions = {
    spherical: true,
    num: 3000,
    maxDistance: parseInt(req.query.distance, 10),
  };

  return Loc.geoNear(point, geoOptions, (err, results) => {
    const locations = [];
    if (err) {
      return _sendJsonResponse(res, 400, err);
    }
    results.forEach((doc) => {
      locations.push({
        distance: doc.dis,
        name: doc.obj.name,
        address: doc.obj.address,
        stars: doc.obj.stars,
        facilities: doc.obj.facilities,
        latLng: doc.obj.latLng,
        _id: doc.obj._id,
      });
    });
    return _sendJsonResponse(res, 200, locations);
  });
};

const locationReadOne = (req, res) => {
  if (req.params && req.params.locationId) {
    return Loc.findById(req.params.locationId).exec((err, location) => {
      if (!location) {
        return _sendJsonResponse(res, 404, { message: 'locationId not found' });
      }
      if (err) {
        return _sendJsonResponse(res, 500, err);
      }
      for (let i = 0; i < location.reviews.length; i += 1) {
        location.reviews[i].date = moment(location.reviews[i].date).format('DD MMM YYYY');
      }
      return _sendJsonResponse(res, 200, location);
    });
  }
  return _sendJsonResponse(res, 400, { message: 'missing parameter locationId' });
};

const locationUpdateOne = (req, res) => {
  if (!req.params.locationId) {
    return _sendJsonResponse(res, 404, { message: 'locationId is required' });
  }

  return Loc.findById(req.params.locationId).select('-reviews -rating').exec((err, location) => {
    const updateLocation = location;
    if (err) {
      return _sendJsonResponse(res, 400, err);
    }
    updateLocation.name = req.body.name;
    updateLocation.address = req.body.address;
    updateLocation.facilities = req.body.facilities.split(',');
    updateLocation.latLng = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    updateLocation.openingTimes = [{
      days: req.body.days1,
      open: req.body.opening1,
      close: req.body.closing1,
      closed: req.body.closed1,
    }, {
      days: req.body.days2,
      open: req.body.opening2,
      close: req.body.closing2,
      closed: req.body.closed2,
    }];

    return updateLocation.save((err2, loc) => {
      if (err2) {
        return _sendJsonResponse(res, 400, err2);
      }
      return _sendJsonResponse(res, 200, loc);
    });
  });
};

const locationDeleteOne = (req, res) => {
  if (!req.params.locationId) {
    return _sendJsonResponse(res, 400, { message: 'locationId is required' });
  }
  return Loc.findByIdAndRemove(req.params.locationId).exec((err) => {
    if (err) {
      return _sendJsonResponse(res, 400, err);
    }
    return _sendJsonResponse(res, 204, null);
  });
};

const locationRandomData = (req, res) => {
  const data = randomData();
  const errors = [];
  const callback = (err) => {
    if (err) {
      errors.push({ err });
    }
  };
  data.forEach((current) => {
    _createLocation(current, callback);
  });
  if (errors.length) {
    return _sendJsonResponse(res, 400, errors);
  }
  return _sendJsonResponse(res, 200, data);
};

export { locationCreate, locationDeleteOne,
  locationUpdateOne, locationReadOne, locationListByDistance, locationRandomData };
