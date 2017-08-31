import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { App, AboutPage, ErrorPage, HomePage, LocationListPage, ReduxLocationInfoPage, LocationReviewFormPage } from './pages';

const routes = [
  <Route key="home" exact path="/" component={HomePage} />,
  <Route key="locations" exact path="/locations" component={LocationListPage} />,
  <Route key="location-info" exact path="/location/:locationId" component={ReduxLocationInfoPage} />,
  <Route
    key="review-form"
    exact
    path="/location/:locationId/review/new"
    component={LocationReviewFormPage}/>,
  <Route key="about" exact path="/about" component={AboutPage} />,
  <Route key="error" path="/error" component={ErrorPage} />,
];

const Loc8rRouter = () =>
  <BrowserRouter>
    <App>
      { routes }
    </App>
  </BrowserRouter>;

export default Loc8rRouter;
