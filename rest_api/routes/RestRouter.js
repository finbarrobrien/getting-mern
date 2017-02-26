import express from 'express';
import { locationsListByDistance, locationsCreate, locationsReadOne,
  locationsUpdateOne, locationsDeleteOne, locationsRandomData } from '../controllers/locations';
import { reviewsReadOne, reviewsCreate, reviewsUpdateOne, reviewsDeleteOne } from '../controllers/reviews';

const RestRouter = express.Router();

RestRouter.get('/locations', locationsListByDistance);
RestRouter.post('/locations', locationsCreate);
RestRouter.get('/location/random', locationsRandomData);
RestRouter.get('/location/:locationId', locationsReadOne);
RestRouter.put('/location/:locationId', locationsUpdateOne);
RestRouter.delete('/location/:locationId', locationsDeleteOne);


RestRouter.get('/location/:locationId/reviews/:reviewId', reviewsReadOne);
RestRouter.post('/location/:locationId/reviews', reviewsCreate);
RestRouter.put('/location/:locationId/reviews/:reviewId', reviewsUpdateOne);
RestRouter.delete('/location/:locationId/reviews/:reviewId', reviewsDeleteOne);

export default RestRouter;

