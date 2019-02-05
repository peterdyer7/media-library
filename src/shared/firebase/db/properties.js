import { db } from '../firebase';

export const createProperty = async (property) => {
  // check if property exists before creating it
  try {
    const res = await db
      .collection('properties')
      .where('name', '==', property.name)
      .get();
    if (res.empty) {
      return await db
        .collection('properties')
        .doc(property.id)
        .set(property);
    } else {
      throw new Error('Property already exists!');
    }
  } catch (err) {
    throw err;
  }
};

export const updateProperty = async (property) => {
  try {
    return await db
      .collection('properties')
      .doc(property.id)
      .update(property);
  } catch (err) {
    throw err;
  }
};

export const deleteProperty = async (id) => {
  try {
    return await db
      .collection('properties')
      .doc(id)
      .delete();
  } catch (err) {
    throw err;
  }
};

export const fetchProperty = async (id) => {
  try {
    const getDoc = await db
      .collection('properties')
      .doc(id)
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

export const fetchProperties = async () => {
  try {
    let properties = [];
    const snapshots = await db.collection('properties').get();
    snapshots.forEach((doc) => {
      properties.push(doc.data());
    });
    return properties;
  } catch (err) {
    throw err;
  }
};
