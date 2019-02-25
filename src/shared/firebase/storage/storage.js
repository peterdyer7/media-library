import { storage } from '../firebase';

export const uploadFile = async (id, file) => {
  try {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`${id}/${file.name}`);
    const metadata = {
      contentDisposition: `attachment; filename=${file.name}`
    };
    const res = await fileRef.put(file, metadata);

    const url = await fileRef.getDownloadURL();
    return { ...res, url };
  } catch (err) {
    throw err;
  }
};

export const deleteFile = async (folder, file) => {
  try {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`${folder}/${file}`);
    const res = await fileRef.delete();
    return res;
  } catch (err) {
    throw err;
  }
};
