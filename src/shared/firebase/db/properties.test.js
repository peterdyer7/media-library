import {
  createProperty,
  updateProperty,
  deleteProperty,
  fetchProperty,
  fetchProperties
} from './properties';
import { login, logout } from '../auth/auth';
import { fbUser } from '../firebase';

describe('settings.js (Firebase Firestore)', () => {
  beforeAll(async () => {
    await login(fbUser.email, fbUser.password);
  });

  afterAll(async () => {
    await logout();
  });

  it('calls createProperty, updateProperty, fetchProperty and deleteProperty successfully', async () => {
    const property = {
      id: 'propertytest123',
      name: 'propertytest123',
      active: true,
      brand: 'brand',
      region: 'region',
      address1: 'address1',
      address2: 'address2',
      city: 'city',
      state: 'state',
      country: 'country',
      postalCode: 'postal',
      latitude: 'latitude',
      longitude: 'longitude',
      contactPerson: 'John Doe',
      contactPhone: '123-456-7890'
    };
    try {
      await createProperty(property);
      let fetchedProperty = await fetchProperty(property.id);
      expect(fetchedProperty).toMatchObject(property);
      await updateProperty({ id: property.id, name: 'properttest987' });
      fetchedProperty = await fetchProperty(property.id);
      expect(fetchedProperty).not.toMatchObject(property);
      await deleteProperty(property.id);
      const deletedProperty = await fetchProperty(property.id);
      expect(deletedProperty).toBeFalsy();
    } catch (err) {
      expect(err).toBeFalsy(); // should not make it here
    }
  });

  it('calls createProperty and fails when no property is provided', async () => {
    const property = {};
    try {
      await createProperty(property);
      expect(true).toBeFalsy(); // should not make it here
    } catch (err) {
      expect(err).toBeTruthy(); // should always fail
    }
  });

  it('calls fetchProperty and returns null if property is not found', async () => {
    try {
      const fetchedProperty = await fetchProperty('999');
      expect(fetchedProperty).toBeNull();
    } catch (err) {
      expect(err).toBeFalsy(); // should not make it here
    }
  });

  it('calls fetchProperty and fails if no id is provided', async () => {
    try {
      const fetchedProperty = await fetchProperty();
      expect(fetchedProperty).toBeTruthy(); // should not make it here
    } catch (err) {
      expect(err).toBeTruthy(); // should always fail
    }
  });

  it('calls deleteProperty and does not throw an error if no such property exists', async () => {
    try {
      const deletededProperty = await deleteProperty('999');
      expect(deletededProperty).toBeFalsy();
    } catch (err) {
      expect(err).toBeFalsy(); // should not make it here
    }
  });

  it('calls deleteProperty and fails if no id is provided', async () => {
    try {
      const deletededProperty = await deleteProperty();
      expect(deletededProperty).toBeTruthy(); // should not make it here
    } catch (err) {
      expect(err).toBeTruthy(); // should always fail
    }
  });

  it('calls fetchProperties adds a new property calls fetchProperties again then deletes the property', async () => {
    const property = {
      id: 'propertytest123',
      name: 'propertytest123',
      active: true,
      brand: 'brand',
      region: 'region',
      address1: 'address1',
      address2: 'address2',
      city: 'city',
      state: 'state',
      country: 'country',
      postalCode: 'postal',
      latitude: 'latitude',
      longitude: 'longitude',
      contactPerson: 'John Doe',
      contactPhone: '123-456-7890'
    };
    try {
      const fetchedProperties = await fetchProperties();
      const temp = fetchedProperties.length + 1;
      expect(temp).toBeTruthy();
      await createProperty(property);
      const refetchedProperties = await fetchProperties();
      expect(refetchedProperties.length).toBe(temp);
      await deleteProperty(property.id);
      const deletedProperty = await fetchProperty(property.id);
      expect(deletedProperty).toBeFalsy();
    } catch (err) {
      expect(err).toBeFalsy(); // should not make it here
    }
  });
});
