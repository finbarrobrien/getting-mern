var express = require('express');
var router = express.Router();
var apiCtrlLocations = require('../controllers/locations');
var apiCtrlReviews = require('../controllers/reviews');

router.get('/locations', apiCtrlLocations.locationsListByDistance);
router.post('/locations', apiCtrlLocations.locationsCreate);
router.get('/locations/:locationId', apiCtrlLocations.locationsReadOne);
router.put('/locations/:locationId', apiCtrlLocations.locationsUpdateOne);
router.delete('/locations/:locationId', apiCtrlLocations.locationsDeleteOne);

router.get('/locations/:locationId/reviews', apiCtrlReviews.reviewsReadOne);
router.post('/locations/:locationId/reviews/:reviewId', apiCtrlReviews.reviewsCreate);
router.put('/locations/:locationId/reviews/:reviewId', apiCtrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationId/reviews/:reviewId', apiCtrlReviews.reviewsDeleteOne);


