import express from 'express';
import about from '../controllers/others';
import { locationSearch, locationsList, locationInfo, addReview } from '../controllers/locations';

const AppRouter = express.Router();


/* Locations pages */
AppRouter.get('/', locationSearch);
AppRouter.get('/locations', locationSearch);
AppRouter.get('/location/:locationId', locationInfo);
AppRouter.get('/location/review/new', addReview);

/* Others pages */
AppRouter.get('/about', about);

export default AppRouter;

