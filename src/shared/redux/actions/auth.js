import {
  login,
  register,
  getToken,
  logout as fbLogout
} from '../../firebase/auth/auth';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authStart = () => ({
  type: AUTH_START
});

/**
 * authUser = { userId, token }
 */
const authSuccess = (authUser) => ({
  type: AUTH_SUCCESS,
  authUser
});

const authFail = (error) => ({
  type: AUTH_FAIL,
  error
});

const authLogout = () => {
  return {
    type: AUTH_LOGOUT
  };
};

/**
 * user = { email, password }
 * isLogin = true for login : false for register
 */
export const authenticate = (user, isLogin) => async (dispatch) => {
  dispatch(authStart());
  let authUser;
  try {
    if (isLogin) {
      authUser = await login(user.email, user.password);
    } else {
      authUser = await register(user.email, user.password);
    }
    const token = await getToken();
    dispatch(
      authSuccess({
        userId: authUser.uid,
        token
      })
    );
  } catch (err) {
    dispatch(authFail(err.message));
  }
};

export const logout = () => async (dispatch) => {
  await fbLogout();
  dispatch(authLogout());
};
