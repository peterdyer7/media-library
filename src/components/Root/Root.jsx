import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import auth from '../../shared/redux/reducers/auth';
import properties from '../../shared/redux/reducers/properties';
import settings from '../../shared/redux/reducers/settings';
import images from '../../shared/redux/reducers/images';

const rootReducer = combineReducers({
  auth,
  properties,
  settings,
  images
});

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);

export default function Root({ children, initialState = {} }) {
  const store = createStore(rootReducer, initialState, composeEnhancers);
  return <Provider store={store}>{children}</Provider>;
}

Root.propTypes = {
  children: PropTypes.element.isRequired,
  initialState: PropTypes.object
};
