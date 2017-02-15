import express from 'express';
import about from '../controllers/others';
import { homeList, locationInfo, addReview } from '../controllers/locations';

const AppRouter = express.Router();


/* Locations pages */
AppRouter.get('/', homeList);
AppRouter.get('/location', locationInfo);
AppRouter.get('/location/review/new', addReview);

/* Others pages */
AppRouter.get('/about', about);

export default AppRouter;

