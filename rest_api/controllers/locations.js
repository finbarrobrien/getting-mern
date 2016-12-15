/**
 * Controller for the locations REST API endpoints
 */
// Access the global mongoDbConn
var Loc = mongoDbConn.model('Location');

var theEarth = (function(){
	var earthRadius = 6371; // kilometers
	var getDistanceFromRads = function(rads){
		return parseFloat(rads * earthRadius);
	};
	
	var getRadsFromDistance = function(distance){
		return parseFloat(distance / earthRadius);
	};
	
	return {
		getDistanceFromRads : getDistanceFromRads,
		getRadsFromDistance : getRadsFromDistance
	};
})();


var sendJsonResponse = function(res, status, content){
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
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	if ((!lat && lat !== 0) || (!lng && lng !== 0)){
		sendJsonResponse(res, 400, {"message": "lat and lng query parameters are required"});
	} else{
		var point = { type:"Point", coordinates:[ lng, lat]};
		var geoOptions = { 
				spherical:true,	// Calculate based on a point on a sphere 
				num:10,			// Return only 10 results max
				maxDistance: theEarth.getRadsFromDistance(20) // Limit the search to 20km radius
		};
		
		Loc.geoNear(point, geoOptions, function(err, results, stats){
			var locations = [];
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
	sendJsonResponse(res, 200, {"status" : "success"})
};

module.exports.locationsDeleteOne = function(req, res){
	sendJsonResponse(res, 200, {"status" : "success"})
};