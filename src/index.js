import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import registerServiceWorker from './registerServiceWorker';

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { store, persistor } from './store'
import createHistory from "history/createBrowserHistory";
import App from './containers/App'
import { PersistGate } from 'redux-persist/lib/integration/react'

import './index.css'
// nucleo icons
import './icons.css'

const target = document.querySelector('#root')

const history = createHistory()

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  target
)

registerServiceWorker();
