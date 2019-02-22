import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fbUser } from '../../firebase/firebase';
import {
  authenticate,
  logout,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from './auth';
import {
  imageUpload,
  imageUpdate,
  imageDelete,
  imagesPropertyFetch,
  imageFetch,
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
} from './images';

describe('images actions (async)', () => {
  let middlewares;
  let mockStore;
  let initialState;
  let store;
  beforeAll(() => {
    middlewares = [thunk];
    mockStore = configureStore(middlewares);
  });

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  it('dispatchs imageUpload and fails when not logged in', async () => {
    const propertyId = 'testProperty';
    const imageId = 'testImage';
    const imageFile = {
      name: 'imageFilename.jpg',
      lastModifiedDate: '2019-1-1T12:00:00.001Z',
      size: 1024,
      type: 'image/jepg'
    };
    const imageMetadata = {
      caption: 'caption',
      primaryCategory: 'primaryCategory',
      secondaryCategory: 'secondaryCategoroy',
      tags: ['tag1', 'tag2']
    };

    await store.dispatch(
      imageUpload(propertyId, imageId, imageFile, imageMetadata)
    );
    let actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toMatchObject({ type: IMAGE_UPLOAD_START });
    expect(actions[1]).toMatchObject({ type: IMAGE_UPLOAD_FAIL });
  });

  it('dispatchs imageUpload, imageFetch, imageUpdate and imageDelete successfully', async () => {
    const user = {
      email: fbUser.email,
      password: fbUser.password
    };
    await store.dispatch(authenticate(user, true));
    let actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toMatchObject({ type: AUTH_START });
    expect(actions[1]).toMatchObject({ type: AUTH_SUCCESS });

    const propertyId = 'testProperty';
    const imageId = 'testImage';
    const imageFile = {
      name: 'imageFilename.jpg',
      lastModifiedDate: '2019-1-1T12:00:00.001Z',
      size: 1024,
      type: 'image/jepg'
    };
    const imageMetadata = {
      caption: 'caption',
      primaryCategory: 'primaryCategory',
      secondaryCategory: 'secondaryCategoroy',
      tags: ['tag1', 'tag2']
    };

    await store.dispatch(
      imageUpload(propertyId, imageId, imageFile, imageMetadata)
    );
    actions = store.getActions();
    expect(actions).toHaveLength(4);
    expect(actions[2]).toMatchObject({ type: IMAGE_UPLOAD_START });
    expect(actions[3]).toMatchObject({ type: IMAGE_UPLOAD_SUCCESS });

    await store.dispatch(imageFetch(imageId));
    actions = store.getActions();
    expect(actions).toHaveLength(6);
    expect(actions[4]).toMatchObject({ type: IMAGE_FETCH_START });
    expect(actions[5]).toMatchObject({ type: IMAGE_FETCH_SUCCESS });

    await store.dispatch(
      imageUpdate({ id: imageId, ...imageFile, ...imageMetadata })
    );
    actions = store.getActions();
    expect(actions).toHaveLength(8);
    expect(actions[6]).toMatchObject({ type: IMAGE_UPDATE_START });
    expect(actions[7]).toMatchObject({ type: IMAGE_UPDATE_SUCCESS });

    await store.dispatch(
      imageDelete({ id: imageId, ...imageFile, ...imageMetadata })
    );
    actions = store.getActions();
    expect(actions).toHaveLength(10);
    expect(actions[8]).toMatchObject({ type: IMAGE_DELETE_START });
    expect(actions[9]).toMatchObject({ type: IMAGE_DELETE_SUCCESS });
  });

  it('dispatchs imageFetch, imageUpdate, imageDelete and fails with no ID', async () => {
    const user = {
      email: fbUser.email,
      password: fbUser.password
    };
    await store.dispatch(authenticate(user, true));
    let actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toMatchObject({ type: AUTH_START });
    expect(actions[1]).toMatchObject({ type: AUTH_SUCCESS });

    await store.dispatch(imageFetch());
    actions = store.getActions();
    expect(actions).toHaveLength(4);
    expect(actions[2]).toMatchObject({ type: IMAGE_FETCH_START });
    expect(actions[3]).toMatchObject({ type: IMAGE_FETCH_FAIL });

    await store.dispatch(imageUpdate());
    actions = store.getActions();
    expect(actions).toHaveLength(6);
    expect(actions[4]).toMatchObject({ type: IMAGE_UPDATE_START });
    expect(actions[5]).toMatchObject({ type: IMAGE_UPDATE_FAIL });

    await store.dispatch(imageDelete());
    actions = store.getActions();
    expect(actions).toHaveLength(8);
    expect(actions[6]).toMatchObject({ type: IMAGE_DELETE_START });
    expect(actions[7]).toMatchObject({ type: IMAGE_DELETE_FAIL });
  });

  it('dispatchs imagesPropertyFetch and fails when not logged in', async () => {
    await store.dispatch(logout());
    let actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toMatchObject({ type: AUTH_LOGOUT });

    await store.dispatch(imagesPropertyFetch());
    actions = store.getActions();
    expect(actions).toHaveLength(3);
    expect(actions[1]).toMatchObject({ type: IMAGES_FETCH_START });
    expect(actions[2]).toMatchObject({ type: IMAGES_FETCH_FAIL });
  });
});
