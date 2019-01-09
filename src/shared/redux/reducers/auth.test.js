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
      uid: '123',
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
      uid: '123',
      token: 'abc',
      email: 'auser@example.com',
      firstName: 'firsty'
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
      uid: '789',
      token: 'xyz',
      email: 'anotheruser@example.com',
      firstName: 'secondy'
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
      uid: '123',
      token: 'abc',
      email: 'auser@example.com',
      firstName: 'firsty'
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
      uid: '123',
      token: 'abc',
      email: 'auser@example.com',
      firstName: 'firsty'
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
      uid: '123',
      token: 'abc',
      email: 'auser@example.com',
      firstName: 'firsty'
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
