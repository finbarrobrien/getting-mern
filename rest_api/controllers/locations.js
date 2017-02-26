/**
 * Controller for the locations REST API endpoints
 */
import mongoDbConn from '../../db';
import randomData from '../../test/data/dataGenerator';

// Access the global mongoDbConn
const Loc = mongoDbConn.model('Location');

const theEarth = (() => {
  const earthRadius = 6371; // kilometers
  const getDistanceFromRads = rads => parseFloat(rads * earthRadius);
  const getRadsFromDistance = distance => parseFloat(distance / earthRadius);

  return {
    getDistanceFromRads,
    getRadsFromDistance,
  };
})();


const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
  res.end();
};

const createLocation = (location, callback) => {
  Loc.create(location, (err, loc) => {
    if (callback) {
      callback(err, loc);
    } else {
      if (err) {
        console.log(err);
      }
      console.log(`created location: ${location.name}`);
    }
  });
};

const locationsCreate = (req, res) => {
  createLocation({
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
  }, (err, location) => {
    if (err) {
      return sendJsonResponse(res, 400, err);
    } else {
      return sendJsonResponse(res, 201, location);
    }
  });
};

const locationsListByDistance = (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  if ((!lat && lat !== 0) || (!lng && lng !== 0)) {
    return sendJsonResponse(res, 400, { message: 'lat and lng query parameters are required' });
  } else {
    const point = { type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] };
    const geoOptions = {
      spherical: true,
      num: 10,
      maxDistance: theEarth.getRadsFromDistance(req.query.maxDistance),
    };

    Loc.geoNear(point, geoOptions, (err, results) => {
      const locations = [];
      if (err) {
        return sendJsonResponse(res, 400, err);
      } else {
        results.forEach((doc) => {
          locations.push({
            distance: theEarth.getDistanceFromRads(doc.dis),
            name: doc.obj.name,
            address: doc.obj.address,
            stars: doc.obj.stars,
            facilities: doc.obj.facilities,
            _id: doc.obj._id,
          });
        });
        return sendJsonResponse(res, 200, locations);
      }
    });
  }
};

const locationsReadOne = (req, res) => {
  if (req.params && req.params.locationId) {
    return Loc.findById(req.params.locationId).exec((err, location) => {
      if (!location) {
        return sendJsonResponse(res, 404, { message: 'locationId not found' });
      }
      if (err) {
        return sendJsonResponse(res, 500, err);
      }
      return sendJsonResponse(res, 200, location);
    });
  }
  return sendJsonResponse(res, 400, { message: 'missing parameter locationId' });
};

const locationsUpdateOne = (req, res) => {
  if (!req.params.locationId) {
    return sendJsonResponse(res, 404, { message: 'locationId is required' });
  }

  return Loc.findById(req.params.locationId).select('-reviews -rating').exec((err, location) => {
    const updateLocation = location;
    if (err) {
      return sendJsonResponse(res, 400, err);
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

    updateLocation.save((err2, loc) => {
      if (err2) {
        return sendJsonResponse(res, 404, err2);
      }
      return sendJsonResponse(res, 200, loc);
    });
  });
};

const locationsDeleteOne = (req, res) => {
  if (!req.params.locationId) {
    return sendJsonResponse(res, 404, { message: 'locationId is required' });
  }
  return Loc.findByIdAndRemove(req.params.locationId).exec((err) => {
    if (err) {
      return sendJsonResponse(res, 404, err);
    }
    return sendJsonResponse(res, 204, null);
  });
};

const locationsRandomData = (req, res) => {
  const data = randomData();
  data.forEach((current) => {
    console.log(`Added location ${current.name}`)
    createLocation(current);
  });
  return sendJsonResponse(res, 200, data);
};

export { locationsCreate, locationsDeleteOne,
  locationsUpdateOne, locationsReadOne, locationsListByDistance, locationsRandomData };
