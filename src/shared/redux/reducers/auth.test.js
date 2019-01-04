import deepFreeze from 'deep-freeze';

import auth from './auth';

describe('auth reducer', () => {
  it('returns the initial state', () => {
    const stateBefore = undefined;
    const action = {};
    const stateAfter = {
      user: {},
      error: null,
      loading: false
    };
    // deepFreeze(stateBefore); cannot deepFreeze undefined
    deepFreeze(stateAfter);
    expect(auth(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles AUTH_START', () => {
    const action = { type: 'AUTH_START' };
    const user = {
      userId: '123',
      token: 'abc'
    };
    const stateBefore = {
      user,
      error: null,
      loading: false
    };
    const stateAfter = {
      user,
      error: null,
      loading: true
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(auth(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles AUTH_SUCCESS', () => {
    const user1 = {
      userId: '123',
      token: 'abc'
    };
    let stateBefore = {
      user: {},
      error: null,
      loading: true
    };
    let action = { type: 'AUTH_SUCCESS', user: user1 };
    let stateAfter = {
      user: user1,
      error: null,
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(auth(stateBefore, action)).toEqual(stateAfter);

    const user2 = {
      userId: '789',
      token: 'xyz'
    };
    stateBefore = {
      user: user1,
      error: null,
      loading: true
    };
    action = { type: 'AUTH_SUCCESS', user: user2 };
    stateAfter = {
      user: user2,
      error: null,
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(auth(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles AUTH_FAIL', () => {
    const error = 'Auth fail';
    let stateBefore = {
      user: {},
      error: null,
      loading: true
    };
    const action = { type: 'AUTH_FAIL', error };
    let stateAfter = {
      user: {},
      error,
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(auth(stateBefore, action)).toEqual(stateAfter);

    const user = {
      userId: '123',
      token: 'abc'
    };
    stateBefore = {
      user,
      error: null,
      loading: true
    };
    stateAfter = {
      user: {},
      error: error,
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(auth(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles AUTH_LOGOUT', () => {
    const user = {
      userId: '123',
      token: 'abc'
    };
    const stateBefore = {
      user,
      error: null,
      loading: false
    };
    const action = { type: 'AUTH_LOGOUT' };
    const stateAfter = {
      user: {},
      error: null,
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(auth(stateBefore, action)).toEqual(stateAfter);
  });
});
