import deepFreeze from 'deep-freeze';

import auth from './auth';

describe('auth reducer', () => {
  it('returns the initial state', () => {
    const stateBefore = undefined;
    const action = {};
    const stateAfter = {
      user: {},
      error: '',
      loading: false
    };
    // deepFreeze(stateBefore); cannot deepFreeze undefined
    deepFreeze(stateAfter);
    expect(auth(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles AUTH_START', () => {
    const action = { type: 'AUTH_START' };
    const authUser = {
      userId: '123',
      token: 'abc',
      email: 'auser@example.com'
    };
    const stateBefore = {
      authUser,
      error: '',
      loading: false
    };
    const stateAfter = {
      authUser,
      error: '',
      loading: true
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(auth(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles AUTH_SUCCESS', () => {
    const user1 = {
      userId: '123',
      token: 'abc',
      email: 'auser@example.com'
    };
    let stateBefore = {
      user: {},
      error: '',
      loading: true
    };
    let action = { type: 'AUTH_SUCCESS', authUser: user1 };
    let stateAfter = {
      user: user1,
      error: '',
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(auth(stateBefore, action)).toEqual(stateAfter);

    const user2 = {
      userId: '789',
      token: 'xyz',
      email: 'anotheruser@example.com'
    };
    stateBefore = {
      user: user1,
      error: '',
      loading: true
    };
    action = { type: 'AUTH_SUCCESS', authUser: user2 };
    stateAfter = {
      user: user2,
      error: '',
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
      error: '',
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
      token: 'abc',
      email: 'auser@example.com'
    };
    stateBefore = {
      user,
      error: '',
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
      token: 'abc',
      email: 'auser@example.com'
    };
    const stateBefore = {
      user,
      error: '',
      loading: false
    };
    const action = { type: 'AUTH_LOGOUT' };
    const stateAfter = {
      user: {},
      error: '',
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(auth(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles AUTH_RESETPASSWORD', () => {
    const user = {
      userId: '123',
      token: 'abc',
      email: 'auser@example.com'
    };
    const stateBefore = {
      user,
      error: '',
      loading: true
    };
    const action = { type: 'AUTH_RESETPASSWORD' };
    const stateAfter = {
      user,
      error: '',
      loading: false
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(auth(stateBefore, action)).toEqual(stateAfter);
  });
});
