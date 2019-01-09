import {
  login,
  register,
  getToken,
  logout as fbLogout,
  resetPassword as fbResetPassword,
  deleteUser
} from '../../firebase/auth/auth';
import { createUser, fetchUser } from '../../firebase/db/users';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_RESETPASSWORD = 'AUTH_RESETPASSWORD';

export const authStart = () => ({
  type: AUTH_START
});

/**
 * authUser = { uid, token, email, firstName }
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
  try {
    if (isLogin) {
      authUser = await login(user.email, user.password);
      const fetchedUser = await fetchUser(authUser.uid);
      firstName = fetchedUser.firstName;
    } else {
      authUser = await register(user.email, user.password);
      firstName = user.firstName;
      try {
        await createUser({
          uid: authUser.uid,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          company: user.company,
          agreeToTerms: user.agree,
          role: 'user'
        });
      } catch (err) {
        await deleteUser();
        throw err;
      }
    }
    const token = await getToken();
    dispatch(
      authSuccess({
        uid: authUser.uid,
        token,
        email: user.email,
        firstName
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

export const resetPassword = (newPassword) => async (dispatch) => {
  dispatch(authStart());
  try {
    await fbResetPassword(newPassword);
    dispatch(authResetPassword());
  } catch (err) {
    dispatch(authFail(err.message));
  }
};
