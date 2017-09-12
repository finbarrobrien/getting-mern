import express from 'express';
import { locationListByDistance, locationCreate, locationReadOne,
  locationUpdateOne, locationDeleteOne, locationRandomData } from '../controllers/locations';
import { reviewsReadOne, reviewsCreate, reviewsUpdateOne, reviewsDeleteOne } from '../controllers/reviews';

const RestRouter = express.Router();

RestRouter.get('/location', locationListByDistance);
RestRouter.post('/location', locationCreate);
RestRouter.get('/location/random', locationRandomData);
RestRouter.get('/location/:locationId', locationReadOne);
RestRouter.put('/location/:locationId', locationUpdateOne);
RestRouter.delete('/location/:locationId', locationDeleteOne);

RestRouter.get('/location/:locationId/reviews/:reviewId', reviewsReadOne);
RestRouter.post('/location/:locationId/reviews', reviewsCreate);
RestRouter.put('/location/:locationId/reviews/:reviewId', reviewsUpdateOne);
RestRouter.delete('/location/:locationId/reviews/:reviewId', reviewsDeleteOne);

export default RestRouter;

