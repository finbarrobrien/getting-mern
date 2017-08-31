import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import Loc8rRouter from './Loc8rRouter';
import Loc8rApp from './reducers';
import initialStore from './redux-store/templateStore';

import registerServiceWorker from './registerServiceWorker';

let store = createStore(Loc8rApp, initialStore, devToolsEnhancer());

render(
  <Provider store={ store }>
    <Loc8rRouter />
  </Provider>, document.getElementById('app')
);
//registerServiceWorker();
