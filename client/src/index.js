// add extention if not importing js// webpacking assumes we are importing npm module
// if we don't spesify the relative path // don't need to assign value
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers'


//reducer,  initial state of the application,
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

console.log('s key is ', process.env.REACT_APP_STRIPE_KEY);
console.log('e key is ', process.env.NODE_ENV);
