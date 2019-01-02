import { auth } from '../firebase';

export const register = async (email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    return res.user;
  } catch (err) {
    throw err;
  }
};

export const login = async (email, password) => {
  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
    return res.user;
  } catch (err) {
    throw err;
  }
};

export const logout = async () => await auth.signOut();

export const forgotPassword = async (email) =>
  await auth.sendPasswordResetEmail(email);

export const resetPassword = async (password) =>
  await auth.currentUser.updatePassword(password);

export const deleteUser = async () => await auth.currentUser.delete();

export const getToken = async () => await auth.currentUser.getIdToken(true);

export const getUser = () => {
  const user = auth.currentUser;
  return user;
};
