import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const reducer = combineReducers({});

const preloadedState = {};

const Store = configureStore({
  reducer,
  devTools: true,
  preloadedState,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});

export default Store;
