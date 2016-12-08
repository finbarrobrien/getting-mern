/**
 * Controller for the locations REST API endpoints
 */

//var mongoose = require('mongoose');
var Loc = mongoDbConn.model('Location');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.locationsCreate = function(req, res){
	sendJsonResponse(res, 200, {"status" : "success"})
};

module.exports.locationsListByDistance = function(req, res){
	sendJsonResponse(res, 200, {"status" : "success"})
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