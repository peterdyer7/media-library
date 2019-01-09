import { db } from '../firebase';

export const createUser = async (user) => {
  try {
    await db
      .collection('users')
      .doc(user.uid)
      .set(user);
  } catch (err) {
    throw err;
  }
};

export const fetchUser = async (id) => {
  try {
    const getDoc = await db
      .collection('users')
      .doc(id)
      .get();
    if (getDoc) {
      return getDoc.data();
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (id) => {
  try {
    return await db
      .collection('users')
      .doc(id)
      .delete();
  } catch (err) {
    throw err;
  }
};
