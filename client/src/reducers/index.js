// file to wire up all the reducers

import {reducer as reduxForm} from 'redux-form';
import {combineReducers} from 'redux';
import authReducer from './authReducer';
// the values being produced by this reducer are available on this very special key

export default combineReducers({
  auth : authReducer,
  form : reduxForm
});
