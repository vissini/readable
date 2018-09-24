import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const middleware = applyMiddleware(thunk, createLogger())
const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
  	<BrowserRouter>
  		<App />
  	</BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);

registerServiceWorker();

