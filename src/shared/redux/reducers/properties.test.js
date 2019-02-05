import deepFreeze from 'deep-freeze';

import properties from './properties';

describe('properties reducer', () => {
  it('returns the initial state', () => {
    const stateBefore = undefined;
    const action = {};
    const stateAfter = {
      properties: [],
      error: null,
      success: null,
      loading: false
    };
    // deepFreeze(stateBefore); cannot deepFreeze undefined
    deepFreeze(stateAfter);
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles PROPERTY_CLEAR_MSGS', () => {
    const action = { type: 'PROPERTY_CLEAR_MSGS' };
    const stateBefore = {
      properties: [],
      error: 'error',
      success: 'success',
      loading: false
    };
    const stateAfter = {
      properties: [],
      error: null,
      success: null,
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles PROPERTY_CREATE_START', () => {
    const action = { type: 'PROPERTY_CREATE_START' };
    const stateBefore = {
      properties: [],
      error: null,
      success: null,
      loading: false
    };
    const stateAfter = {
      properties: [],
      error: null,
      success: null,
      loading: true
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles PROPERTY_CREATE_SUCCESS', () => {
    const property = {
      id: 'propertytest123',
      name: 'propertytest123',
      active: true,
      brand: 'brand',
      region: 'region',
      address1: 'address1',
      address2: 'address2',
      city: 'city',
      state: 'state',
      country: 'country',
      postalCode: 'postal',
      latitude: 'latitude',
      longitude: 'longitude',
      contactPerson: 'John Doe',
      contactPhone: '123-456-7890'
    };
    const action = {
      type: 'PROPERTY_CREATE_SUCCESS',
      property,
      success: 'Property created!'
    };
    const stateBefore = {
      properties: [],
      error: null,
      success: null,
      loading: true
    };
    const stateAfter = {
      properties: [property],
      error: null,
      success: 'Property created!',
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles PROPERTY_CREATE_FAIL', () => {
    const action = { type: 'PROPERTY_CREATE_FAIL', error: 'Error!' };
    const stateBefore = {
      properties: [],
      error: null,
      success: null,
      loading: true
    };
    const stateAfter = {
      properties: [],
      error: 'Error!',
      success: null,
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles PROPERTY_DELETE_START', () => {
    const property = {
      id: 'propertytest123',
      name: 'propertytest123',
      active: true,
      brand: 'brand',
      region: 'region',
      address1: 'address1',
      address2: 'address2',
      city: 'city',
      state: 'state',
      country: 'country',
      postalCode: 'postal',
      latitude: 'latitude',
      longitude: 'longitude',
      contactPerson: 'John Doe',
      contactPhone: '123-456-7890'
    };
    const action = { type: 'PROPERTY_DELETE_START' };
    const stateBefore = {
      properties: [property],
      error: null,
      success: null,
      loading: false
    };
    const stateAfter = {
      properties: [property],
      error: null,
      success: null,
      loading: true
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles PROPERTY_DELETE_SUCCESS', () => {
    const property = {
      id: 'propertytest123',
      name: 'propertytest123',
      active: true,
      brand: 'brand',
      region: 'region',
      address1: 'address1',
      address2: 'address2',
      city: 'city',
      state: 'state',
      country: 'country',
      postalCode: 'postal',
      latitude: 'latitude',
      longitude: 'longitude',
      contactPerson: 'John Doe',
      contactPhone: '123-456-7890'
    };
    const action = {
      type: 'PROPERTY_DELETE_SUCCESS',
      id: property.id
    };
    const stateBefore = {
      properties: [property],
      error: null,
      success: null,
      loading: true
    };
    const stateAfter = {
      properties: [],
      error: null,
      success: null,
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles PROPERTY_DELETE_FAIL', () => {
    const property = {
      id: 'propertytest123',
      name: 'propertytest123',
      active: true,
      brand: 'brand',
      region: 'region',
      address1: 'address1',
      address2: 'address2',
      city: 'city',
      state: 'state',
      country: 'country',
      postalCode: 'postal',
      latitude: 'latitude',
      longitude: 'longitude',
      contactPerson: 'John Doe',
      contactPhone: '123-456-7890'
    };
    const action = { type: 'PROPERTY_DELETE_FAIL', error: 'Error!' };
    const stateBefore = {
      properties: [property],
      error: null,
      success: null,
      loading: true
    };
    const stateAfter = {
      properties: [property],
      error: 'Error!',
      success: null,
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles PROPERTY_FETCH_START', () => {
    const action = { type: 'PROPERTY_FETCH_START' };
    const stateBefore = {
      properties: [],
      error: null,
      success: null,
      loading: false
    };
    const stateAfter = {
      properties: [],
      error: null,
      success: null,
      loading: true
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles PROPERTY_FETCH_SUCCESS', () => {
    const property = {
      id: 'propertytest123',
      name: 'propertytest123',
      active: true,
      brand: 'brand',
      region: 'region',
      address1: 'address1',
      address2: 'address2',
      city: 'city',
      state: 'state',
      country: 'country',
      postalCode: 'postal',
      latitude: 'latitude',
      longitude: 'longitude',
      contactPerson: 'John Doe',
      contactPhone: '123-456-7890'
    };
    const action = {
      type: 'PROPERTY_FETCH_SUCCESS',
      property
    };
    const stateBefore = {
      properties: [],
      error: null,
      success: null,
      loading: true
    };
    const stateAfter = {
      properties: [property],
      error: null,
      success: null,
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles PROPERTY_FETCH_FAIL', () => {
    const action = { type: 'PROPERTY_FETCH_FAIL', error: 'Error!' };
    const stateBefore = {
      properties: [],
      error: null,
      success: null,
      loading: true
    };
    const stateAfter = {
      properties: [],
      error: 'Error!',
      success: null,
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles PROPERTIES_FETCH_START', () => {
    const action = { type: 'PROPERTIES_FETCH_START' };
    const stateBefore = {
      properties: [],
      error: null,
      success: null,
      loading: false
    };
    const stateAfter = {
      properties: [],
      error: null,
      success: null,
      loading: true
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles PROPERTIES_FETCH_SUCCESS', () => {
    const property = {
      id: 'propertytest123',
      name: 'propertytest123',
      active: true,
      brand: 'brand',
      region: 'region',
      address1: 'address1',
      address2: 'address2',
      city: 'city',
      state: 'state',
      country: 'country',
      postalCode: 'postal',
      latitude: 'latitude',
      longitude: 'longitude',
      contactPerson: 'John Doe',
      contactPhone: '123-456-7890'
    };
    const action = {
      type: 'PROPERTIES_FETCH_SUCCESS',
      properties: [property]
    };
    const stateBefore = {
      properties: [],
      error: null,
      success: null,
      loading: true
    };
    const stateAfter = {
      properties: [property],
      error: null,
      success: null,
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles PROPERTIES_FETCH_FAIL', () => {
    const action = { type: 'PROPERTIES_FETCH_FAIL', error: 'Error!' };
    const stateBefore = {
      properties: [],
      error: null,
      success: null,
      loading: true
    };
    const stateAfter = {
      properties: [],
      error: 'Error!',
      success: null,
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });
});
