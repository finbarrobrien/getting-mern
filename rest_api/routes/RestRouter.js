import express from 'express';
import { locationsListByDistance, locationsCreate, locationsReadOne,
  locationsUpdateOne, locationsDeleteOne, locationsRandomData } from '../controllers/locations';
import { reviewsReadOne, reviewsCreate, reviewsUpdateOne, reviewsDeleteOne } from '../controllers/reviews';

const RestRouter = express.Router();

RestRouter.get('/locations', locationsListByDistance);
RestRouter.post('/locations', locationsCreate);
RestRouter.get('/locations/random', locationsRandomData);
RestRouter.get('/locations/:locationId', locationsReadOne);
RestRouter.put('/locations/:locationId', locationsUpdateOne);
RestRouter.delete('/locations/:locationId', locationsDeleteOne);


RestRouter.get('/locations/:locationId/reviews/:reviewId', reviewsReadOne);
RestRouter.post('/locations/:locationId/reviews', reviewsCreate);
RestRouter.put('/locations/:locationId/reviews/:reviewId', reviewsUpdateOne);
RestRouter.delete('/locations/:locationId/reviews/:reviewId', reviewsDeleteOne);

export default RestRouter;

