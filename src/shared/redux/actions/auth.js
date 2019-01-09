import {
  login,
  register,
  getToken,
  logout as fbLogout,
  resetPassword as fbResetPassword,
  deleteUser,
  getUser
} from '../../firebase/auth/auth';
import { createUser, fetchUser } from '../../firebase/db/users';
import * as errors from '../../constants/errors';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_RESETPASSWORD = 'AUTH_RESETPASSWORD';

export const authStart = () => ({
  type: AUTH_START
});

/**
 * authUser = { uid, email, firstName }
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

const authResetPassword = () => {
  return {
    type: AUTH_RESETPASSWORD
  };
};

/**
 * user = { email, password, firstName, lastName, company, agree }
 * isLogin = true for login : false for register
 */
export const authenticate = (user, isLogin) => async (dispatch) => {
  dispatch(authStart());
  let authUser;
  let firstName;
  let role;
  try {
    if (isLogin) {
      authUser = await login(user.email, user.password);
      const fetchedUser = await fetchUser(authUser.uid);
      firstName = fetchedUser.firstName;
      role = fetchedUser.role;
    } else {
      authUser = await register(user.email, user.password);
      firstName = user.firstName;
      role = 'user';
      try {
        await createUser({
          uid: authUser.uid,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          company: user.company,
          agreeToTerms: user.agree,
          role
        });
      } catch (err) {
        await deleteUser();
        throw err;
      }
    }
    localStorage.setItem('ml-uid', authUser.uid);

    await handleToken();

    dispatch(
      authSuccess({
        uid: authUser.uid,
        email: user.email,
        firstName,
        role
      })
    );
  } catch (err) {
    dispatch(authFail(err.message));
  }
};

// timeout default = 59 minutes * 60 seconds/minute * 1000 milliseconds/second
const handleToken = async (timeout = 3540000) => {
  if (getUser()) {
    const token = await getToken(true);
    const tokenCreated = Date.now();
    const tokenExpiry = tokenCreated + timeout;
    localStorage.setItem('ml-token', token);
    localStorage.setItem('ml-expiry', tokenExpiry);
    setExpiryTimer(timeout);
  }
};

let TIMER;
const setExpiryTimer = (timeout) => {
  TIMER = setTimeout(async () => {
    await handleToken();
  }, timeout);
};

export const authCheck = () => async (dispatch) => {
  dispatch(authStart());
  try {
    // retrieve token from Local Storage
    const token = localStorage.getItem('ml-token');
    if (!token) {
      // if there is no token, log as a failed auth and logout to cleanup auth store
      dispatch(authFail(errors.NO_TOKEN));
      dispatch(logout());
    } else {
      const expiry = localStorage.getItem('ml-expiry');
      const now = Date.now();
      if (now > expiry) {
        // if there is a token but the current time is greater than the expriry,
        // log as a failed auth and logout to cleanup auth store
        dispatch(authFail(errors.TOKEN_EXPIRED));
        dispatch(logout());
      } else {
        // retrieve user from db based on what is in local storage
        const uid = localStorage.getItem('ml-uid');
        const dbUser = await fetchUser(uid);
        const curToken = await getToken(false);
        if (token !== curToken) {
          // if token in local storage does not match what Firebase Authentication has,
          // log as a failed auth and logout to cleanup auth store
          dispatch(authFail(errors.TOKEN_NOTVALID));
          dispatch(logout());
        } else {
          // if there is a token and it is not expired,
          // write user info to the store, handle token expiry
          dispatch(
            authSuccess({
              uid,
              role: dbUser.role,
              firstName: dbUser.firstName,
              email: dbUser.email
            })
          );
          handleToken();
        }
      }
    }
  } catch (err) {
    dispatch(authFail(err.message));
    dispatch(logout());
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('ml-uid');
  localStorage.removeItem('ml-token');
  localStorage.removeItem('ml-expiry');
  clearTimeout(TIMER);
  await fbLogout();
  dispatch(authLogout());
};

export const resetPassword = (newPassword) => async (dispatch) => {
  dispatch(authStart());
  try {
    await fbResetPassword(newPassword);
    dispatch(authResetPassword());
  } catch (err) {
    dispatch(authFail(err.message));
  }
};
