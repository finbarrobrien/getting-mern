import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import Loc8rRouter from './Loc8rRouter';
import loc8r from './reducers';
import initialStore from './redux-store/templateStore';

import registerServiceWorker from './registerServiceWorker';

const loggerMiddleware = createLogger();

const store = createStore(loc8r, initialStore, applyMiddleware(thunkMiddleware, loggerMiddleware));

render(
  <Provider store={ store }>
    <Loc8rRouter />
  </Provider>, document.getElementById('app'));
registerServiceWorker();
