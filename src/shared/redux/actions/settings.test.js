import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as settings from './settings';
import { login, logout } from '../../firebase/auth/auth';
import { fbUser } from '../../firebase/firebase';

describe('settings async actions - create and dispatch', () => {
  let middlewares;
  let mockStore;
  let initialState;
  let store;
  beforeAll(async () => {
    middlewares = [thunk];
    mockStore = configureStore(middlewares);
    await login(fbUser.email, fbUser.password);
  });

  afterAll(async () => {
    await logout();
  });

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  it('dispatchs fetchSettings action successfully', async () => {
    await store.dispatch(settings.fetchSettings('imageMetadata'));
    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toMatchObject({ type: settings.FETCH_SETTINGS_START });
    expect(actions[1]).toMatchObject({ type: settings.FETCH_SETTINGS_SUCCESS });
  });

  it('dispatchs fetchSettings, addSetting, and removeSetting actions successfully', async () => {
    await store.dispatch(settings.fetchSettings('imageMetadata'));
    await store.dispatch(
      settings.addSetting('imageMetadata', 'tags', 'testing')
    );
    await store.dispatch(
      settings.removeSetting('imageMetadata', 'tags', 'testing')
    );

    const actions = store.getActions();
    expect(actions).toHaveLength(6);
    expect(actions[0]).toMatchObject({ type: settings.FETCH_SETTINGS_START });
    expect(actions[1]).toMatchObject({ type: settings.FETCH_SETTINGS_SUCCESS });
    expect(actions[2]).toMatchObject({ type: settings.ADD_SETTING_START });
    expect(actions[3]).toMatchObject({ type: settings.ADD_SETTING_SUCCESS });
    expect(actions[4]).toMatchObject({ type: settings.REMOVE_SETTING_START });
    expect(actions[5]).toMatchObject({ type: settings.REMOVE_SETTING_SUCCESS });
  });
});
