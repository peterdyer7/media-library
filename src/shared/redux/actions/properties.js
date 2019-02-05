import cuid from 'cuid';

import {
  createProperty,
  fetchProperties,
  deleteProperty,
  fetchProperty
} from '../../firebase/db/properties';

export const PROPERTY_CLEAR_MSGS = 'PROPERTY_CLEAR_MSGS';

export const PROPERTY_CREATE_START = 'PROPERTY_CREATE_START';
export const PROPERTY_CREATE_SUCCESS = 'PROPERTY_CREATE_SUCCESS';
export const PROPERTY_CREATE_FAIL = 'PROPERTY_CREATE_FAIL';

export const PROPERTY_DELETE_START = 'PROPERTY_DELETE_START';
export const PROPERTY_DELETE_SUCCESS = 'PROPERTY_DELETE_SUCCESS';
export const PROPERTY_DELETE_FAIL = 'PROPERTY_DELETE_FAIL';

export const PROPERTIES_FETCH_START = 'PROPERTIES_FETCH_START';
export const PROPERTIES_FETCH_SUCCESS = 'PROPERTIES_FETCH_SUCCESS';
export const PROPERTIES_FETCH_FAIL = 'PROPERTIES_FETCH_FAIL';

export const PROPERTY_FETCH_START = 'PROPERTY_FETCH_START';
export const PROPERTY_FETCH_SUCCESS = 'PROPERTY_FETCH_SUCCESS';
export const PROPERTY_FETCH_FAIL = 'PROPERTY_FETCH_FAIL';

export const propertyClearMsgs = () => ({
  type: PROPERTY_CLEAR_MSGS
});

const propertyCreateStart = () => ({
  type: PROPERTY_CREATE_START
});

const propertyCreateSuccess = (property, success) => ({
  type: PROPERTY_CREATE_SUCCESS,
  property,
  success
});

const propertyCreateFail = (error) => ({
  type: PROPERTY_CREATE_FAIL,
  error
});

const propertyDeleteStart = () => ({
  type: PROPERTY_DELETE_START
});

const propertyDeleteSuccess = (id) => ({
  type: PROPERTY_DELETE_SUCCESS,
  id
});

const propertyDeleteFail = (error) => ({
  type: PROPERTY_DELETE_FAIL,
  error
});

export const propertyCreate = (property) => async (dispatch) => {
  dispatch(propertyCreateStart());
  try {
    if (!property.id) {
      property.id = cuid();
    }
    await createProperty(property);
    dispatch(propertyCreateSuccess(property, 'Property created!'));
  } catch (err) {
    dispatch(propertyCreateFail(err.message));
  }
};

export const propertyDelete = (id) => async (dispatch) => {
  dispatch(propertyDeleteStart());
  try {
    await deleteProperty(id);
    dispatch(propertyDeleteSuccess(id));
  } catch (err) {
    dispatch(propertyDeleteFail(err.message));
  }
};

const propertiesFetchStart = () => ({
  type: PROPERTIES_FETCH_START
});

const propertiesFetchSuccess = (properties) => ({
  type: PROPERTIES_FETCH_SUCCESS,
  properties
});

const propertiesFetchFail = (error) => ({
  type: PROPERTIES_FETCH_FAIL,
  error
});

export const propertiesFetch = () => async (dispatch) => {
  dispatch(propertiesFetchStart());
  try {
    const properties = await fetchProperties();
    dispatch(propertiesFetchSuccess(properties));
  } catch (err) {
    dispatch(propertiesFetchFail(err.message));
  }
};

const propertyFetchStart = () => ({
  type: PROPERTY_FETCH_START
});

const propertyFetchSuccess = (property) => ({
  type: PROPERTY_FETCH_SUCCESS,
  property
});

const propertyFetchFail = (error) => ({
  type: PROPERTY_FETCH_FAIL,
  error
});

export const propertyFetch = (propertyId) => async (dispatch) => {
  dispatch(propertyFetchStart());
  try {
    const property = await fetchProperty(propertyId);
    dispatch(propertyFetchSuccess(property));
  } catch (err) {
    dispatch(propertyFetchFail(err.message));
  }
};
