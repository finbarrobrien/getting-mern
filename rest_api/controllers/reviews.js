import mongoDbConn from '../../db';

const Loc = mongoDbConn.model('Location');

const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

const setAverageStars = (location) => {
  const updatedLocation = location;
  if (updatedLocation.reviews && updatedLocation.reviews.length > 0) {
    let total;
    for (let i = 0; i < updatedLocation.reviews.length; i += 1) {
      total += updatedLocation.reviews[i].stars;
    }
    // parse average as a decimal number (base 10)
    updatedLocation.stars = parseInt(total / updatedLocation.reviews.length, 10);
    updatedLocation.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Average rating updated to ${updatedLocation.stars}`);
      }
    });
  }
};

const updateAverageStars = (locationId) => {
  Loc.findById(locationId).select('rating reviews').exec((err, location) => {
    if (err) {
      console.log('Error updating the average Stars');
    } else {
      setAverageStars(location);
    }
  });
};

const doAddReview = (req, res, location) => {
  const updatedLocation = location;
  if (!updatedLocation) {
    sendJsonResponse(res, 404, { message: 'location is missing' });
  } else {
    updatedLocation.reviews.push({
      reviewer: req.body.reviewer,
      stars: req.body.stars,
      comment: req.body.comment,
    });
    updatedLocation.save((err, loc) => {
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        updateAverageStars(loc._id);
        sendJsonResponse(res, 201, loc.reviews[loc.reviews.length - 1]);
      }
    });
  }
};

const reviewsCreate = (req, res) => {
  if (req.params.locationId) {
    Loc.findById(req.params.locationId).select('reviews').exec((err, location) => {
      if (!location) {
        sendJsonResponse(res, 404, { message: 'locationId not found' });
      } else if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        doAddReview(req, res, location);
      }
    });
  } else {
    sendJsonResponse(res, 400, { message: 'locationId is required' });
  }
};

const reviewsUpdateOne = (req, res) => {
  if (!req.params.locationid || !req.params.reviewid) {
    sendJsonResponse(res, 400, { status: 'locationid and reviewid are both required parameters' });
  } else {
    Loc.findById(req.params.locationid).select('reviews').exec((err, location) => {
      if (!err) {
        if (!location) {
          sendJsonResponse(res, 404, { message: 'locationId not found' });
        } else {
          if (location.reviews && location.reviews.length > 0) {
            const reviewEdit = location.reviews.id(req.params.reviewid);
            if (!reviewEdit) {
              sendJsonResponse(res, 404, { message: 'reviewid not found' });
            } else {
              reviewEdit.reviewer = req.body.reviewer;
              reviewEdit.stars = req.body.stars;
              reviewEdit.comment = req.body.comment;
              location.save((err2, location2) => {
                if (!err2) {
                  sendJsonResponse(res, 400, err2);
                } else {
                  updateAverageStars(location2._id);
                  sendJsonResponse(res, 200, reviewEdit);
                }
              });
            }
          } else {
            sendJsonResponse(res, 404, { message: 'reviewid not found' });
          }
        }
      } else {
        sendJsonResponse(res, 400, err);
      }
    });
  }
};

const reviewsReadOne = (req, res) => {
  if (req.params && req.params.locationId && req.params.reviewId) {
    Loc.findById(req.params.locationId).select('name reviews').exec((err, location) => {
      let response;
      let review;
      if (!location) {
        sendJsonResponse(res, 404, { message: 'locationId not found' });
      } else if (err) {
        console.log(err);
        sendJsonResponse(res, 500, err);
      } else if (location.reviews && location.reviews.length > 0) {
        console.log(location.reviews);
        review = location.reviews.id(req.params.reviewId);
        if (!review) {
          sendJsonResponse(res, 404, { message: 'reviewId not found' } );
        } else {
          response = {
            location: {
              name: location.name,
              id: req.params.locationId
            },
            review,
          };
          sendJsonResponse(res, 200, response);
        }
      } else {
        sendJsonResponse(res, 404, { message: 'reviewId not found' });
      }
    });
  } else {
    sendJsonResponse(res, 400, { message: 'missing parameter' });
  }
};


const reviewsDeleteOne = (req, res) => {
  if (!req.params.locationid || !req.params.reviewid) {
    sendJsonResponse(res, 400, { message: 'missing parameter' });
  } else {
    Loc.findById(req.params.locationid).select('reviews').exec((err, location) => {
      if (err) {
        sendJsonResponse(res, 400, err);
      } else if (!location) {
        sendJsonResponse(res, 404, { message: 'locationid not found' });
      } else if (location.reviews && location.reviews.length > 0) {
        if (!location.reviews.id(req.params.reviewid)) {
          location.reviews.id(req.params.reviewid).remove();
          location.save((err2) => {
            if (err2) {
              sendJsonResponse(res, 400, err2);
            } else {
              updateAverageStars(location._id);
              sendJsonResponse(res, 204, null);
            }
          });
        }
      } else {
        sendJsonResponse(res, 404, { message: 'reviewid not found' });
      }
    });
  }
};

export { reviewsDeleteOne, reviewsCreate, reviewsReadOne, reviewsUpdateOne };
