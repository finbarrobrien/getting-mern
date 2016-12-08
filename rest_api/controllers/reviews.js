var Loc = mongoDbConn.model('Location');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};


module.exports.reviewsCreate = function(req, res){
	sendJsonResponse(res, 200, {"status" : "success"})
};

module.exports.reviewsUpdateOne = function(req, res){
	sendJsonResponse(res, 200, {"status" : "success"})
};

module.exports.reviewsReadOne = function(req, res){
	if (req.params && req.params.locationId && req.params.reviewId){
		Loc.findById(req.params.locationId).select('name reviews').exec(function(err, location){
			var response, review;
			if(!location){
				sendJsonResponse(res,404, { "message" : "locationId not found"});
				return;
			}else{
				if(err){
					// Could do further analysis of the error to determine the real problem
					sendJsonResponse(res, 500, err);
					return;
				}else{
					if(location.reviews && location.reviews.length > 0){
						console.log(location.reviews);
						review = location.reviews.id(req.params.reviewId);
						if(!review){
							sendJsonResponse(res, 404, {"message":"reviewId not found"});
						} else{
							response = {
								location : { 
									name: location.name,
									id: req.params.locationId
								}, 
								review : review
							};
							sendJsonResponse(res, 200, response);
						}
					} else{
						sendJsonResponse(res, 404, {"message":"reviewId not found"});
					}
				}
			}
			
		});
	} else {
		sendJsonResponse(res, 400, { "message" : "missing parameter"});
	}
};


module.exports.reviewsDeleteOne = function(req, res){
	sendJsonResponse(res, 200, {"status" : "success"})
};
