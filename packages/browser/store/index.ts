import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/AuthReducers';
const reducer = combineReducers({
  auth: authReducer,
});

const preloadedState = {};

const Store = configureStore({
  reducer,
  devTools: true,
  preloadedState,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});

export default Store;
