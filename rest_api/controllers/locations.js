/**
 * Controller for the locations REST API endpoints
 */
// Access the global mongoDbConn
const Loc = mongoDbConn.model('Location');

const theEarth = (function(){
  let earthRadius = 6371; // kilometers
  let getDistanceFromRads = function(rads){
    return parseFloat(rads * earthRadius);
  };

  let getRadsFromDistance = function(distance){
    return parseFloat(distance / earthRadius);
  };

  return {
    getDistanceFromRads : getDistanceFromRads,
    getRadsFromDistance : getRadsFromDistance
  };
})();


let sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.locationsCreate = function(req, res){
  Loc.create({
      name: req.body.name,
      address: req.body.address,
      facilities: req.body.facilities.split(","),
      latLng: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
      openingTimes: [{
        days: req.body.days1,
        open: req.body.opening1,
        close: req.body.closing1,
        closed: req.body.closed1
      } , {
        days: req.body.days2,
        open: req.body.opening2,
        close: req.body.closing2,
        closed: req.body.closed2
      }]
    }, function(err, location){
      if(err){
        sendJsonResponse(res, 400, err);
      }else{
        sendJsonResponse(res, 201, location);
      }
  });
};

module.exports.locationsListByDistance = function(req, res){
  let lng = parseFloat(req.query.lng);
  let lat = parseFloat(req.query.lat);
  if ((!lat && lat !== 0) || (!lng && lng !== 0)){
    sendJsonResponse(res, 400, {"message": "lat and lng query parameters are required"});
  } else{
    let point = { type:"Point", coordinates:[ lng, lat]};
    let geoOptions = {
        spherical:true,  // Calculate based on a point on a sphere
        num:10,      // Return only 10 results max
        maxDistance: theEarth.getRadsFromDistance(20) // Limit the search to 20km radius
    };

    Loc.geoNear(point, geoOptions, function(err, results, stats){
      let locations = [];
      if(err){
        sendJsonResponse(res, 400, err);
      }else {
        results.forEach(function(doc){
          locations.push({
            distance: theEarth.getDistanceFromRads(doc.dis),
            name: doc.obj.name,
            address: doc.obj.address,
            stars: doc.obj.stars,
            facilities: doc.obj.facilities,
            _id: doc.obj._id
          });
        });
      }
    });
    sendJsonResponse(res, 200, location);
  }
};

module.exports.locationsReadOne = function(req, res){
  if (req.params && req.params.locationId){
    Loc.findById(req.params.locationId).exec(function(err, location){
      if(!location){
        sendJsonResponse(res,404, { "message" : "locationId not found"});
        return;
      }else{
        if(err){
          // Could do further analysis of the error to determine the real problem
          sendJsonResponse(res, 500, err);
          return;
        }else{
          sendJsonResponse(res, 200, location);
        }
      }

    });
  } else {
    sendJsonResponse(res, 400, { "message" : "missing parameter locationId"});
  }
};

module.exports.locationsUpdateOne = function(req, res){
  if(!req.params.locationId){
    sendJsonResponse(res, 404, {"message":"locationId is required"});
  }else{
    Loc.findById(locationId).select("-reviews -rating").exec(function(err, location){
      if(err){
        sendJsonResponse(res, 400, err);
      }else{
        location.name = req.body.name;
        location.address = req.body.address;
        location.facilities = req.body.facilities.split(",");
        location.latLng = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        location.openingTimes = [{
          days: req.body.days1,
          open: req.body.opening1,
          close: req.body.closing1,
          closed: req.body.closed1
        } , {
          days: req.body.days2,
          open: req.body.opening2,
          close: req.body.closing2,
          closed: req.body.closed2
        }];

        location.save(function(err, location){
          if(err){
            sendJsonResponse(res, 404, err);
          } else{
            sendJsonResponse(res, 200, location);
          }
        });
      }
    });
  }
};

module.exports.locationsDeleteOne = function(req, res){
  if(!req.params.locationId){
    sendJsonResponse(res, 404, {"message":"locationId is required"});
  }else{
    Log.findByIdAndRemove(req.params.locationId).exec(function(err, location){
      if(err){
        sendJsonResponse(res, 404, err);
      } else{
        sendJsonResponse(res, 204, null);
      }
    });
  }
};
