import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fbUser } from '../../firebase/firebase';

import {
  authenticate,
  logout,
  resetPassword,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_RESETPASSWORD
} from './auth';

// import { deleteUser as authDelete } from '../../firebase/auth/auth';
// import { deleteUser as dbDelete } from '../../firebase/db/users';

describe('auth actions (async)', () => {
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

  it('dispatchs authenticate (login) and logout actions (success)', async () => {
    const user = {
      email: fbUser.email,
      password: fbUser.password
    };
    await store.dispatch(authenticate(user, true));
    let actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toMatchObject({ type: AUTH_START });
    expect(actions[1]).toMatchObject({ type: AUTH_SUCCESS });

    await store.dispatch(logout());
    actions = store.getActions();
    expect(actions).toHaveLength(3);
    expect(actions[2]).toMatchObject({ type: AUTH_LOGOUT });
  });

  it('dispatchs auth (login) action (fail)', async () => {
    const user = {
      email: 'idonotexist@example.com',
      password: 'password'
    };
    await store.dispatch(authenticate(user, true));
    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toMatchObject({ type: AUTH_START });
    expect(actions[1]).toMatchObject({ type: AUTH_FAIL });
  });

  // eliminating this test for now, no way to retrieve uid and cleanup database
  // it('dispatchs authenticate (register) action (success)', async () => {
  //   const user = {
  //     email: 'asuccessregister@example.com',
  //     password: 'password',
  //     firstName: 'firsty',
  //     lastName: 'lasty',
  //     company: 'company',
  //     agree: true
  //   };
  //   await store.dispatch(authenticate(user, false));
  //   const actions = store.getActions();
  //   expect(actions).toHaveLength(2);
  //   expect(actions[0]).toMatchObject({ type: AUTH_START });
  //   expect(actions[1]).toMatchObject({ type: AUTH_SUCCESS });

  //   // cleanup
  //   // await dbDelete()
  //   await authDelete();
  // });

  it('dispatchs authenticate (register) action (fail)', async () => {
    const user = {
      email: 'afailregister@example.com',
      password: 'pass'
    };
    await store.dispatch(authenticate(user, false));
    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toMatchObject({ type: AUTH_START });
    expect(actions[1]).toMatchObject({ type: AUTH_FAIL });
  });

  it('dispatches logout', async () => {
    await store.dispatch(logout());
    let actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toMatchObject({ type: AUTH_LOGOUT });
  });

  it('dispatchs authenicate (login) and resetPassword actions (success)', async () => {
    const user = {
      email: fbUser.email,
      password: fbUser.password
    };
    await store.dispatch(authenticate(user, true));
    let actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toMatchObject({ type: AUTH_START });
    expect(actions[1]).toMatchObject({ type: AUTH_SUCCESS });

    await store.dispatch(resetPassword(user.password));
    actions = store.getActions();
    expect(actions).toHaveLength(4);
    expect(actions[2]).toMatchObject({ type: AUTH_START });
    expect(actions[3]).toMatchObject({ type: AUTH_RESETPASSWORD });
  });
});
