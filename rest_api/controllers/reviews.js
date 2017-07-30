import { mongoDbConn } from '../../db';

const Loc = mongoDbConn.model('Location');

const _sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

const _setAverageStars = (location) => {
  const updatedLocation = location;

  if (updatedLocation.reviews && updatedLocation.reviews.length > 0) {
    let total = 0;
    for (let i = 0; i < updatedLocation.reviews.length; i += 1) {
      total += updatedLocation.reviews[i].stars;
    }
    // parse average as a decimal number (base 10)
    console.log(`${total} / ${updatedLocation.reviews.length}`);
    updatedLocation.stars = parseInt(total / updatedLocation.reviews.length, 10);
    console.log(updatedLocation);
    updatedLocation.save((saveErr) => {
      if (saveErr) {
        console.log(saveErr);
        return saveErr;
      }
      console.log(`Average rating updated to ${updatedLocation.stars}`);
      return null;
    });
  }
  return null;
};

const _updateAverageStars = (locationId, callback) =>
  Loc.findById(locationId).select('stars reviews').exec((findErr, location) => {
    if (findErr) {
      callback(findErr);
    } else {
      callback(_setAverageStars(location));
    }
  });


const _doAddReview = (req, res, location) => {
  console.log(location);
  const updatedLocation = location;
  if (!updatedLocation) {
    return _sendJsonResponse(res, 404, { message: 'location is missing' });
  }
  console.log(req.body);
  updatedLocation.reviews.push({
    reviewer: req.body.reviewer,
    stars: parseInt(req.body.stars, 10),
    comment: req.body.comment,
  });
  return updatedLocation.save((saveErr, loc) => {
    if (saveErr) {
      return _sendJsonResponse(res, 400, saveErr);
    }
    return _updateAverageStars(loc._id, (updateErr) => {
      if (updateErr) {
        _sendJsonResponse(res, 500, updateErr);
      }
      _sendJsonResponse(res, 201, loc.reviews[loc.reviews.length - 1]);
    });
  });
};

const reviewsCreate = (req, res) => {
  console.log('hello');
  if (req.params.locationId) {
    return Loc.findById(req.params.locationId).select('reviews').exec((findErr, location) => {
      if (!location) {
        return _sendJsonResponse(res, 404, { message: 'locationId not found' });
      } else if (findErr) {
        return _sendJsonResponse(res, 400, findErr);
      }
      return _doAddReview(req, res, location);
    });
  }
  return _sendJsonResponse(res, 400, { message: 'locationId is required' });
};

const reviewsUpdateOne = (req, res) => {
  if (!req.params.locationid || !req.params.reviewid) {
    return _sendJsonResponse(res, 400, { status: 'locationid and reviewid are both required parameters' });
  }
  return Loc.findById(req.params.locationid).select('reviews').exec((findErr, location) => {
    if (findErr) {
      return _sendJsonResponse(res, 400, findErr);
    }
    if (!location) {
      return _sendJsonResponse(res, 404, { message: 'locationId not found' });
    }
    if (location.reviews && location.reviews.length > 0) {
      const reviewEdit = location.reviews.id(req.params.reviewid);
      if (!reviewEdit) {
        return _sendJsonResponse(res, 404, { message: 'reviewid not found' });
      }
      reviewEdit.reviewer = req.body.reviewer;
      reviewEdit.stars = req.body.stars;
      reviewEdit.comment = req.body.comment;
      location.save((saveErr, location2) => {
        if (!saveErr) {
          return _sendJsonResponse(res, 400, saveErr);
        }
        _updateAverageStars(location2._id);
        return _sendJsonResponse(res, 200, reviewEdit);
      });
    }
    return _sendJsonResponse(res, 404, { message: 'reviewid not found' });
  });
};

const reviewsReadOne = (req, res) => {
  if (req.params && req.params.locationId && req.params.reviewId) {
    return Loc.findById(req.params.locationId).select('name reviews').exec((findErr, location) => {
      let response;
      let review;
      if (!location) {
        return _sendJsonResponse(res, 404, { message: 'locationId not found' });
      }
      if (findErr) {
        console.log(findErr);
        return _sendJsonResponse(res, 500, findErr);
      }
      if (location.reviews && location.reviews.length > 0) {
        console.log(location.reviews);
        review = location.reviews.id(req.params.reviewId);
        if (!review) {
          return _sendJsonResponse(res, 404, { message: 'reviewId not found' });
        }
        response = {
          location: {
            name: location.name,
            id: req.params.locationId,
          },
          review,
        };
        return _sendJsonResponse(res, 200, response);
      }
      return _sendJsonResponse(res, 404, { message: 'reviewId not found' });
    });
  }
  return _sendJsonResponse(res, 400, { message: 'missing parameter' });
};


const reviewsDeleteOne = (req, res) => {
  if (!req.params.locationid || !req.params.reviewid) {
    return _sendJsonResponse(res, 400, { message: 'missing parameter' });
  }
  return Loc.findById(req.params.locationid).select('reviews').exec((findErr, location) => {
    if (findErr) {
      return _sendJsonResponse(res, 400, findErr);
    }
    if (!location) {
      return _sendJsonResponse(res, 404, { message: 'locationid not found' });
    }
    if (location.reviews && location.reviews.length > 0) {
      if (!location.reviews.id(req.params.reviewid)) {
        location.reviews.id(req.params.reviewid).remove();
        location.save((saveErr) => {
          if (saveErr) {
            return _sendJsonResponse(res, 400, saveErr);
          }
          _updateAverageStars(location._id);
          return _sendJsonResponse(res, 204, null);
        });
      }
    }
    return _sendJsonResponse(res, 404, { message: 'reviewid not found' });
  });
};

export { reviewsDeleteOne, reviewsCreate, reviewsReadOne, reviewsUpdateOne };
