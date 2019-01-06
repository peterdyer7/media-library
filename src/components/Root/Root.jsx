import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import auth from '../../shared/redux/reducers/auth';

const rootReducer = combineReducers({
  auth
});

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);

export default function Root({ children, initialState = {} }) {
  const store = createStore(rootReducer, initialState, composeEnhancers);
  return <Provider store={store}>{children}</Provider>;
}
