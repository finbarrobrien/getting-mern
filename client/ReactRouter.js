import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { App, AboutPage, HomePage, LocationListPage, LocationInfoPage, LocationReviewFormPage } from './pages';

const routes = [
  <Route key="home" exact path="/" component={HomePage} />,
  <Route key="locations" exact path="/locations" component={LocationListPage} />,
  <Route key="location-info" path="/location/:locationId" component={LocationInfoPage} />,
  <Route key="review-form" path="/location/:locationId/review/new" component={LocationReviewFormPage} />,
  <Route key="about" exact path="/about" component={AboutPage} />
];

const ReactRouter = () =>
  <BrowserRouter>
    <App>
      { routes }
    </App>
  </BrowserRouter>;

export default ReactRouter;
