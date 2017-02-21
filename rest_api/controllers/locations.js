/**
 * Controller for the locations REST API endpoints
 */
import mongoDbConn from '../../db';

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
};

const locationsCreate = (req, res) => {
  Loc.create({
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
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, location);
    }
  });
};

const locationsListByDistance = (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  if ((!lat && lat !== 0) || (!lng && lng !== 0)) {
    sendJsonResponse(res, 400, { message: 'lat and lng query parameters are required' });
  } else {
    const point = { type: 'Point', coordinates: [lng, lat] };
    const geoOptions = {
      spherical: true,  // Calculate based on a point on a sphere
      num: 10,      // Return only 10 results max
      maxDistance: theEarth.getRadsFromDistance(20), // Limit the search to 20km radius
    };

    Loc.geoNear(point, geoOptions, (err, results) => {
      const locations = [];
      if (err) {
        sendJsonResponse(res, 400, err);
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
        sendJsonResponse(res, 200, locations);
      }
    });
  }
};

const locationsReadOne = (req, res) => {
  if (req.params && req.params.locationId) {
    Loc.findById(req.params.locationId).exec((err, location) => {
      if (!location) {
        sendJsonResponse(res, 404, { message: 'locationId not found' });
      } else if (err) {
        // Could do further analysis of the error to determine the real problem
        sendJsonResponse(res, 500, err);
      } else {
        sendJsonResponse(res, 200, location);
      }
    });
  } else {
    sendJsonResponse(res, 400, { message: 'missing parameter locationId' });
  }
};

const locationsUpdateOne = (req, res) => {
  if (!req.params.locationId) {
    sendJsonResponse(res, 404, { message: 'locationId is required' });
  } else {
    Loc.findById(req.params.locationId).select('-reviews -rating').exec((err, location) => {
      const updateLocation = location;
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
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
            sendJsonResponse(res, 404, err2);
          } else {
            sendJsonResponse(res, 200, loc);
          }
        });
      }
    });
  }
};

const locationsDeleteOne = (req, res) => {
  if (!req.params.locationId) {
    sendJsonResponse(res, 404, { message: 'locationId is required' });
  } else {
    Loc.findByIdAndRemove(req.params.locationId).exec((err) => {
      if (err) {
        sendJsonResponse(res, 404, err);
      } else {
        sendJsonResponse(res, 204, null);
      }
    });
  }
};

export { locationsCreate, locationsDeleteOne,
  locationsUpdateOne, locationsReadOne, locationsListByDistance };
