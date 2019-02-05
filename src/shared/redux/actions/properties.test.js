import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fbUser } from '../../firebase/firebase';
import {
  authenticate,
  logout,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from './auth';
import {
  propertyClearMsgs,
  propertyCreate,
  propertyDelete,
  propertyFetch,
  propertiesFetch,
  PROPERTY_CLEAR_MSGS,
  PROPERTY_CREATE_START,
  PROPERTY_CREATE_SUCCESS,
  PROPERTY_CREATE_FAIL,
  PROPERTY_DELETE_START,
  PROPERTY_DELETE_SUCCESS,
  PROPERTY_DELETE_FAIL,
  PROPERTY_FETCH_START,
  PROPERTY_FETCH_SUCCESS,
  PROPERTY_FETCH_FAIL,
  PROPERTIES_FETCH_START,
  PROPERTIES_FETCH_SUCCESS,
  PROPERTIES_FETCH_FAIL
} from './properties';

describe('properties actions (async)', () => {
  let middlewares;
  let mockStore;
  let initialState;
  let store;
  beforeAll(() => {
    middlewares = [thunk];
    mockStore = configureStore(middlewares);
  });

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  it('dispatchs propertyClearMsgs', async () => {
    await store.dispatch(propertyClearMsgs());
    let actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toMatchObject({ type: PROPERTY_CLEAR_MSGS });
  });

  it('dispatchs propertyCreate and fails when not logged in', async () => {
    const property = {
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

    await store.dispatch(propertyCreate(property));
    let actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toMatchObject({ type: PROPERTY_CREATE_START });
    expect(actions[1]).toMatchObject({ type: PROPERTY_CREATE_FAIL });
  });

  it('dispatchs propertyCreate, propertyFetch and propertyDelete successfully', async () => {
    const user = {
      email: fbUser.email,
      password: fbUser.password
    };
    await store.dispatch(authenticate(user, true));
    let actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toMatchObject({ type: AUTH_START });
    expect(actions[1]).toMatchObject({ type: AUTH_SUCCESS });

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

    await store.dispatch(propertyCreate(property));
    actions = store.getActions();
    expect(actions).toHaveLength(4);
    expect(actions[2]).toMatchObject({ type: PROPERTY_CREATE_START });
    expect(actions[3]).toMatchObject({ type: PROPERTY_CREATE_SUCCESS });

    await store.dispatch(propertyFetch(property.id));
    actions = store.getActions();
    expect(actions).toHaveLength(6);
    expect(actions[4]).toMatchObject({ type: PROPERTY_FETCH_START });
    expect(actions[5]).toMatchObject({ type: PROPERTY_FETCH_SUCCESS });

    await store.dispatch(propertyDelete(property.id));
    actions = store.getActions();
    expect(actions).toHaveLength(8);
    expect(actions[6]).toMatchObject({ type: PROPERTY_DELETE_START });
    expect(actions[7]).toMatchObject({ type: PROPERTY_DELETE_SUCCESS });
  });

  it('dispatchs propertyFetch and fails with no ID', async () => {
    const user = {
      email: fbUser.email,
      password: fbUser.password
    };
    await store.dispatch(authenticate(user, true));
    let actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toMatchObject({ type: AUTH_START });
    expect(actions[1]).toMatchObject({ type: AUTH_SUCCESS });

    await store.dispatch(propertyFetch());
    actions = store.getActions();
    expect(actions).toHaveLength(4);
    expect(actions[2]).toMatchObject({ type: PROPERTY_FETCH_START });
    expect(actions[3]).toMatchObject({ type: PROPERTY_FETCH_FAIL });

    await store.dispatch(propertyDelete());
    actions = store.getActions();
    expect(actions).toHaveLength(6);
    expect(actions[4]).toMatchObject({ type: PROPERTY_DELETE_START });
    expect(actions[5]).toMatchObject({ type: PROPERTY_DELETE_FAIL });
  });

  it('dispatchs propertiesFetch successfully', async () => {
    const user = {
      email: fbUser.email,
      password: fbUser.password
    };
    await store.dispatch(authenticate(user, true));
    let actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toMatchObject({ type: AUTH_START });
    expect(actions[1]).toMatchObject({ type: AUTH_SUCCESS });

    await store.dispatch(propertiesFetch());
    actions = store.getActions();
    expect(actions).toHaveLength(4);
    expect(actions[2]).toMatchObject({ type: PROPERTIES_FETCH_START });
    expect(actions[3]).toMatchObject({ type: PROPERTIES_FETCH_SUCCESS });
  });

  it('dispatchs propertiesFetch and fails when not logged in', async () => {
    await store.dispatch(logout());
    let actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toMatchObject({ type: AUTH_LOGOUT });

    await store.dispatch(propertiesFetch());
    actions = store.getActions();
    expect(actions).toHaveLength(3);
    expect(actions[1]).toMatchObject({ type: PROPERTIES_FETCH_START });
    expect(actions[2]).toMatchObject({ type: PROPERTIES_FETCH_FAIL });
  });
});
