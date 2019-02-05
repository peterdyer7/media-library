import {
  PROPERTY_CLEAR_MSGS,
  PROPERTY_CREATE_START,
  PROPERTY_CREATE_SUCCESS,
  PROPERTY_CREATE_FAIL,
  PROPERTY_DELETE_START,
  PROPERTY_DELETE_SUCCESS,
  PROPERTY_DELETE_FAIL,
  PROPERTIES_FETCH_START,
  PROPERTIES_FETCH_SUCCESS,
  PROPERTIES_FETCH_FAIL,
  PROPERTY_FETCH_START,
  PROPERTY_FETCH_SUCCESS,
  PROPERTY_FETCH_FAIL
} from '../actions/properties';

const INITIAL_STATE = {
  properties: [],
  error: null,
  success: null,
  loading: false
};

const propertyClearMsgs = (state, action) => ({
  ...state,
  error: null,
  success: null
});

const propertyStart = (state, action) => ({
  ...state,
  error: null,
  success: null,
  loading: true
});

const propertyFail = (state, action) => ({
  ...state,
  loading: false,
  success: null,
  error: action.error
});

const propertyCreateSuccess = (state, action) => {
  const properties = [...state.properties, action.property];
  return {
    ...state,
    properties,
    loading: false,
    success: action.success
  };
};

const propertyDeleteSuccess = (state, action) => {
  const properties = state.properties.filter((prop) => prop.id !== action.id);
  return {
    ...state,
    properties,
    loading: false,
    success: null,
    error: null
  };
};

const propertiesFetchSuccess = (state, action) => ({
  ...state,
  loading: false,
  properties: action.properties
});

const propertyFetchSuccess = (state, action) => {
  const properties = [...state.properties, action.property];
  return {
    ...state,
    properties,
    loading: false
  };
};

const properties = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROPERTY_CLEAR_MSGS: {
      return propertyClearMsgs(state, action);
    }
    case PROPERTY_CREATE_START: {
      return propertyStart(state, action);
    }
    case PROPERTY_CREATE_SUCCESS: {
      return propertyCreateSuccess(state, action);
    }
    case PROPERTY_CREATE_FAIL: {
      return propertyFail(state, action);
    }
    case PROPERTY_DELETE_START: {
      return propertyStart(state, action);
    }
    case PROPERTY_DELETE_SUCCESS: {
      return propertyDeleteSuccess(state, action);
    }
    case PROPERTY_DELETE_FAIL: {
      return propertyFail(state, action);
    }
    case PROPERTIES_FETCH_START: {
      return propertyStart(state, action);
    }
    case PROPERTIES_FETCH_SUCCESS: {
      return propertiesFetchSuccess(state, action);
    }
    case PROPERTIES_FETCH_FAIL: {
      return propertyFail(state, action);
    }
    case PROPERTY_FETCH_START: {
      return propertyStart(state, action);
    }
    case PROPERTY_FETCH_SUCCESS: {
      return propertyFetchSuccess(state, action);
    }
    case PROPERTY_FETCH_FAIL: {
      return propertyFail(state, action);
    }
    default:
      return state;
  }
};

export default properties;
