import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT
} from '../actions/auth';

const INITIAL_STATE = {
  user: {},
  error: '',
  loading: false
};

const start = (state, action) => ({
  ...state,
  error: '',
  loading: true
});

const fail = (state, action) => ({
  ...state,
  user: {},
  error: action.error,
  loading: false
});

const updateUser = (state, action) => ({
  ...state,
  user: action.authUser,
  error: '',
  loading: false
});

const removeUser = (state, action) => ({
  ...state,
  user: {},
  error: '',
  loading: false
});

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_START: {
      return start(state, action);
    }
    case AUTH_SUCCESS: {
      return updateUser(state, action);
    }
    case AUTH_FAIL: {
      return fail(state, action);
    }
    case AUTH_LOGOUT: {
      return removeUser(state, action);
    }
    default:
      return state;
  }
};

export default auth;
