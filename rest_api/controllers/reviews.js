var Loc = mongoDbConn.model('Location');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

var setAverageStars = function(location){
	if(location.reviews && location.reviews.length > 0){
		var total;
		for(var i = 0; i < location.reviews.length; i++){
			total = total + location.reviews[i].stars;
		}
		location.stars = parseInt(total / location.reviews.length, 10); // parse average as a decimal number (base 10)
		location.save(function(err){
			if(err){
				console.log(err);
			}else{
				console.log("Average rating updated to ", location.stars)
			}
		})
	}
};

var updateAverageStars = function(locationId){
	Loc.findById(locationId).select("rating reviews").exec(function(err, location){
		if(err){
			console.log("Error updating the average Stars");
		}else{
			setAverageStars(location);
		}
	});
};

var doAddReview = function(req, res, location){
	if(!location){
		sendJsonResponse(res, 404, {"message":"location is missing"})
	}else{
		location.reviews.push({
			reviewer: req.body.reviewer,
			stars: req.body.stars,
			comment: req.body.comment
		});
		location.save(function(err, location){
			if(err){
				sendJsonResponse(res, 400, err);
			}else{
				updateAverageStars(location._id);
				sendJsonResponse(res, 201, location.reviews[location.reviews.length-1]);
			}
		});
	}
};

module.exports.reviewsCreate = function(req, res){
	if(req.params.locationId){
		Loc.findById(req.params.locationId).select("reviews").exec(function(err,location){
			if(!location){
				sendJsonResponse(res, 404, {"message":"locationId not found"})
			} else {
				if(err){
					sendJsonResponse(res, 400, err)
				}else{
					doAddReview(req, res, location);
				}
			}
		});
	}else{
		sendJsonResponse(res, 400, { "message" : "locationId is required"})
	}
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
					console.log(err);
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
