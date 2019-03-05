import {
  IMAGE_UPLOAD_START,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
  IMAGE_UPDATE_START,
  IMAGE_UPDATE_SUCCESS,
  IMAGE_UPDATE_FAIL,
  IMAGE_DELETE_START,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAIL,
  IMAGES_FETCH_START,
  IMAGES_FETCH_SUCCESS,
  IMAGES_FETCH_FAIL,
  IMAGE_FETCH_START,
  IMAGE_FETCH_SUCCESS,
  IMAGE_FETCH_FAIL
} from '../actions/images';

const INITIAL_STATE = {
  images: [],
  selectedImage: {},
  error: '',
  loading: false
};

const imageAdd = (state, action) => {
  const images = [action.image, ...state.images];
  return { ...state, images };
};

const imageUpdate = (state, action) => {
  const images = state.images.map((image) => {
    if (image.id !== action.image.id) {
      return image;
    } else {
      return action.image;
    }
  });
  return { ...state, images };
};

const imageDelete = (state, action) => {
  const images = state.images.filter((image) => image.id !== action.image.id);
  return { ...state, images };
};

const imagesFetchStart = (state, action) => ({
  ...state,
  error: '',
  loading: true
});

const fetchFail = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
});

const imagesFetchSuccess = (state, action) => ({
  ...state,
  images: action.images,
  loading: false
});

const imageFetchStart = (state, action) => ({
  ...state,
  selectedImage: {},
  error: '',
  loading: true
});

const imageFetchSuccess = (state, action) => {
  return { ...state, selectedImage: action.image, loading: false };
};

export const images = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_START: {
      return imageAdd(state, action);
    }
    case IMAGE_UPLOAD_SUCCESS: {
      return imageUpdate(state, action);
    }
    case IMAGE_UPLOAD_FAIL: {
      return imageUpdate(state, action);
    }
    case IMAGE_UPDATE_START: {
      return imageUpdate(state, action);
    }
    case IMAGE_UPDATE_SUCCESS: {
      return imageUpdate(state, action);
    }
    case IMAGE_UPDATE_FAIL: {
      return imageUpdate(state, action);
    }
    case IMAGE_DELETE_START: {
      return imageUpdate(state, action);
    }
    case IMAGE_DELETE_SUCCESS: {
      return imageDelete(state, action);
    }
    case IMAGE_DELETE_FAIL: {
      return imageUpdate(state, action);
    }
    case IMAGES_FETCH_START: {
      return imagesFetchStart(state, action);
    }
    case IMAGES_FETCH_SUCCESS: {
      return imagesFetchSuccess(state, action);
    }
    case IMAGES_FETCH_FAIL: {
      return fetchFail(state, action);
    }
    case IMAGE_FETCH_START: {
      return imageFetchStart(state, action);
    }
    case IMAGE_FETCH_SUCCESS: {
      return imageFetchSuccess(state, action);
    }
    case IMAGE_FETCH_FAIL: {
      return fetchFail(state, action);
    }
    default:
      return state;
  }
};

export default images;
