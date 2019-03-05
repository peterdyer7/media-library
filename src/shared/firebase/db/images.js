import { db } from '../firebase';

export const setImage = async (image) => {
  try {
    return await db
      .collection('images')
      .doc(image.id)
      .set(image);
  } catch (err) {
    throw err;
  }
};

export const deleteImage = async (id) => {
  try {
    await db
      .collection('labels')
      .doc(id)
      .delete();
    await db
      .collection('safeSearch')
      .doc(id)
      .delete();
    await db
      .collection('webDetection')
      .doc(id)
      .delete();
    await db
      .collection('exif')
      .doc(id)
      .delete();
    await db
      .collection('images')
      .doc(id)
      .delete();
    return;
  } catch (err) {
    throw err;
  }
};

export const fetchImage = async (imageId) => {
  try {
    const getDoc = await db
      .collection('images')
      .doc(imageId)
      .get();
    if (getDoc.exists) {
      return getDoc.data();
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

export const fetchImagesForProperty = async (propertyId) => {
  try {
    let images = [];
    const snapshots = await db
      .collection('images')
      .where('properties', 'array-contains', propertyId)
      .get();
    snapshots.forEach((doc) => {
      images.push(doc.data());
    });
    return images;
  } catch (err) {
    throw err;
  }
};
