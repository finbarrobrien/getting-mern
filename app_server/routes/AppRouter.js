import express from 'express';
import about from '../controllers/others';
import { locationList, locationInfo, addReviewForm, doAddReview } from '../controllers/locations';

const AppRouter = express.Router();

/* Locations pages */
AppRouter.get('/', locationList);
AppRouter.get('/location', locationList);
AppRouter.get('/location/:locationId', locationInfo);
AppRouter.get('/location/:locationId/review/new', addReviewForm);
AppRouter.post('/location/:locationId/review/new', doAddReview);

/* Others pages */
AppRouter.get('/about', about);

export default AppRouter;

