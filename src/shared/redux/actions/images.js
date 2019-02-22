import cuid from 'cuid';

import {
  setImage,
  deleteImage,
  fetchImage,
  fetchImagesForProperty
} from '../../firebase/db/images';

export const IMAGE_UPLOAD_START = 'IMAGE_UPLOAD_START';
export const IMAGE_UPLOAD_SUCCESS = 'IMAGE_UPLOAD_SUCCESS';
export const IMAGE_UPLOAD_FAIL = 'IMAGE_UPLOAD_FAIL';

export const IMAGE_UPDATE_START = 'IMAGE_UPDATE_START';
export const IMAGE_UPDATE_SUCCESS = 'IMAGE_UPDATE_SUCCESS';
export const IMAGE_UPDATE_FAIL = 'IMAGE_UPDATE_FAIL';

export const IMAGE_DELETE_START = 'IMAGE_DELETE_START';
export const IMAGE_DELETE_SUCCESS = 'IMAGE_DELETE_SUCCESS';
export const IMAGE_DELETE_FAIL = 'IMAGE_DELETE_FAIL';

export const IMAGES_FETCH_START = 'IMAGES_FETCH_START';
export const IMAGES_FETCH_SUCCESS = 'IMAGES_FETCH_SUCCESS';
export const IMAGES_FETCH_FAIL = 'IMAGES_FETCH_FAIL';

export const IMAGE_FETCH_START = 'IMAGE_FETCH_START';
export const IMAGE_FETCH_SUCCESS = 'IMAGE_FETCH_SUCCESS';
export const IMAGE_FETCH_FAIL = 'IMAGE_FETCH_FAIL';

const imageUploadStart = (image) => ({
  type: IMAGE_UPLOAD_START,
  image
});

const imageUploadSuccess = (image) => ({
  type: IMAGE_UPLOAD_SUCCESS,
  image
});

const imageUploadFail = (image) => ({
  type: IMAGE_UPLOAD_FAIL,
  image
});

export const imageUpload = (propertyId, imageId, imageFile, metadata) => async (
  dispatch
) => {
  let image = {
    id: imageId ? imageId : cuid(),
    active: false,
    status: 'loading',
    name: imageFile.name,
    lastModifiedDate: imageFile.lastModifiedDate,
    size: imageFile.size,
    type: imageFile.type,
    ...metadata,
    properties: [propertyId]
  };
  dispatch(imageUploadStart(image));
  try {
    await setImage(image);
    dispatch(imageUploadSuccess(image));
  } catch (err) {
    image = {
      ...image,
      status: err.message
    };
    dispatch(imageUploadFail(image));
  }
};

const imageUpdateStart = (image) => ({
  type: IMAGE_UPDATE_START,
  image
});

const imageUpdateSuccess = (image) => ({
  type: IMAGE_UPDATE_SUCCESS,
  image
});

const imageUpdateFail = (image) => ({
  type: IMAGE_UPDATE_FAIL,
  image
});

export const imageUpdate = (image) => async (dispatch) => {
  dispatch(imageUpdateStart(image));
  try {
    await setImage(image);
    dispatch(imageUpdateSuccess(image));
  } catch (err) {
    dispatch(imageUpdateFail(image));
  }
};

const imageDeleteStart = (image) => ({
  type: IMAGE_DELETE_START,
  image
});

const imageDeleteSuccess = (image) => ({
  type: IMAGE_DELETE_SUCCESS,
  image
});

const imageDeleteFail = (image) => ({
  type: IMAGE_DELETE_FAIL,
  image
});

export const imageDelete = (imageToDelete) => async (dispatch) => {
  let image = {
    ...imageToDelete,
    active: false,
    status: 'deleting'
  };
  dispatch(imageDeleteStart(image));
  try {
    // delete database entries
    await deleteImage(image.id);
    image = { ...image, status: 'deleted' };
    dispatch(imageDeleteSuccess(image));
  } catch (err) {
    dispatch(imageDeleteFail(image));
  }
};

const imagesFetchStart = () => ({
  type: IMAGES_FETCH_START
});

const imagesFetchSuccess = (images) => ({
  type: IMAGES_FETCH_SUCCESS,
  images
});

const imagesFetchFail = (error) => ({
  type: IMAGES_FETCH_FAIL,
  error
});

export const imagesPropertyFetch = (propertyId) => async (dispatch) => {
  dispatch(imagesFetchStart());
  try {
    const images = await fetchImagesForProperty(propertyId);
    dispatch(imagesFetchSuccess(images));
  } catch (err) {
    dispatch(imagesFetchFail(err.message));
  }
};

const imageFetchStart = () => ({
  type: IMAGE_FETCH_START
});

const imageFetchSuccess = (image) => ({
  type: IMAGE_FETCH_SUCCESS,
  image
});

const imageFetchFail = (error) => ({
  type: IMAGE_FETCH_FAIL,
  error
});

export const imageFetch = (imageId) => async (dispatch) => {
  dispatch(imageFetchStart());
  try {
    const image = await fetchImage(imageId);
    dispatch(imageFetchSuccess(image));
  } catch (err) {
    dispatch(imageFetchFail(err.message));
  }
};
