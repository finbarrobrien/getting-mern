import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { App, AboutPage, HomePage, LocationListPage, LocationInfoPage, LocationReviewFormPage } from './pages';

const routes = [
  <Route exact path="/" component={HomePage} />,
  <Route exact path="/location" component={LocationListPage} />,
  <Route path="/location/:locationId" component={LocationInfoPage} />,
  <Route path="/location/:locationId/review/new" component={LocationReviewFormPage} />,
  <Route exact path="/about" component={AboutPage} />
]


const ReactRouter = () =>
  <BrowserRouter>
    <App>
      { routes }
    </App>
  </BrowserRouter>;

export default ReactRouter;
