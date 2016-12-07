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
	console.log("hello");
	Loc.findById(req.params.locationId).exec(function(err,location){
		sendJsonResponse(res, 200, location);
	});
};

module.exports.locationsUpdateOne = function(req, res){
	sendJsonResponse(res, 200, {"status" : "success"})
};

module.exports.locationsDeleteOne = function(req, res){
	sendJsonResponse(res, 200, {"status" : "success"})
};