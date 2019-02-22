import {
  setImage,
  deleteImage,
  fetchImage,
  fetchImagesForProperty
} from './images';
import { login, logout } from '../auth/auth';
import { fbUser } from '../firebase';

describe('settings.js (Firebase Firestore)', () => {
  beforeAll(async () => {
    await login(fbUser.email, fbUser.password);
  });

  afterAll(async () => {
    await logout();
  });

  it('calls setImage, fetchImage, fetchImagesForProperty and deleteImage successfully', async () => {
    const image = {
      id: 'testimage123',
      active: false,
      status: 'loading',
      name: 'imageFilename.jpg',
      lastModifiedDate: '2019-1-1T12:00:00.001Z',
      size: 1024,
      type: 'image/jepg',
      caption: 'caption',
      primaryCategory: 'primaryCategory',
      secondaryCategory: 'secondaryCategoroy',
      tags: ['tag1', 'tag2'],
      properties: ['notarealproperty']
    };
    try {
      await setImage(image);
      let fetchedImage = await fetchImage(image.id);
      expect(fetchedImage).toMatchObject(image);
      let fetchedImagesForProperty = await fetchImagesForProperty(
        image.properties[0]
      );
      expect(fetchedImagesForProperty[0]).toMatchObject(image);
      await deleteImage(image.id);
      const deletedImage = await fetchImage(image.id);
      expect(deletedImage).toBeFalsy();
    } catch (err) {
      expect(err).toBeFalsy(); // should not make it here
    }
  });

  it('calls setImage and fails when no image is provided', async () => {
    const image = {};
    try {
      await setImage(image);
      expect(true).toBeFalsy(); // should not make it here
    } catch (err) {
      expect(err).toBeTruthy(); // should always fail
    }
  });

  it('calls fetchImage and returns null if image is not found', async () => {
    try {
      const fetchedImage = await fetchImage('999');
      expect(fetchedImage).toBeNull();
    } catch (err) {
      expect(err).toBeFalsy(); // should not make it here
    }
  });

  it('calls fetchImage and fails if no id is provided', async () => {
    try {
      const fetchedImage = await fetchImage();
      expect(fetchedImage).toBeTruthy(); // should not make it here
    } catch (err) {
      expect(err).toBeTruthy(); // should always fail
    }
  });

  it('calls fetchImagesForProperty and fails if property is not found', async () => {
    try {
      const fetchedImages = await fetchImagesForProperty('999');
      expect(fetchedImages).toBeTruthy();
    } catch (err) {
      expect(err).toBeTruthy(); // should not make it here
    }
  });

  it('calls fetchImagesForProperty and fails if no property is provided', async () => {
    try {
      const fetchedImages = await fetchImagesForProperty();
      expect(fetchedImages).toBeTruthy(); // should not make it here
    } catch (err) {
      expect(err).toBeTruthy(); // should always fail
    }
  });

  it('calls deleteImage and does not throw an error if no such image exists', async () => {
    try {
      const deletededImage = await deleteImage('999');
      expect(deletededImage).toBeFalsy();
    } catch (err) {
      expect(err).toBeFalsy(); // should not make it here
    }
  });

  it('calls deleteImage and fails if no id is provided', async () => {
    try {
      const deletededImage = await deleteImage();
      expect(deletededImage).toBeTruthy(); // should not make it here
    } catch (err) {
      expect(err).toBeTruthy(); // should always fail
    }
  });
});
