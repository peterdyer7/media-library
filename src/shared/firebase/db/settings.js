import { db, firebase } from '../firebase';

export const fetchSettingsByType = async (doc) => {
  try {
    const getDoc = await db
      .collection('settings')
      .doc(doc)
      .get();
    if (!getDoc.exists) {
      return null;
    } else {
      return getDoc.data();
    }
  } catch (err) {
    throw err;
  }
};

export const addListItem = async (doc, list, item) => {
  try {
    const imageMetadataRef = db.collection('settings').doc(doc);
    await imageMetadataRef.update({
      [list]: firebase.firestore.FieldValue.arrayUnion(item)
    });
  } catch (err) {
    throw err;
  }
};

export const removeListItem = async (doc, list, item) => {
  try {
    const imageMetadataRef = db.collection('settings').doc(doc);
    await imageMetadataRef.update({
      [list]: firebase.firestore.FieldValue.arrayRemove(item)
    });
  } catch (err) {
    throw err;
  }
};
