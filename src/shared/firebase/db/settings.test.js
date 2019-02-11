import { fetchSettingsByType, addListItem, removeListItem } from './settings';
import { login, logout } from '../auth/auth';
import { fbUser } from '../firebase';

describe('settings.js (Firebase Firestore)', () => {
  beforeAll(async () => {
    await login(fbUser.email, fbUser.password);
  });

  afterAll(async () => {
    await logout();
  });

  it('calls fetchSettings for imageMetadata correctly', async () => {
    const settings = await fetchSettingsByType('imageMetadata');

    expect(settings.primaryCategory).toBeTruthy();
    expect(settings.secondaryCategory).toBeTruthy();
    expect(settings.tags).toBeTruthy();
  });

  it('calls addListItem, removeListItem for imageMetadata correctly', async () => {
    try {
      const item = 'newitem';
      const doc = 'imageMetadata';
      await addListItem(doc, 'primaryCategory', item);
      await addListItem(doc, 'secondaryCategory', item);
      await addListItem(doc, 'tags', item);

      let settings = await fetchSettingsByType(doc);
      expect(settings.primaryCategory).toContain(item);
      expect(settings.secondaryCategory).toContain(item);
      expect(settings.tags).toContain(item);

      await removeListItem(doc, 'primaryCategory', item);
      await removeListItem(doc, 'secondaryCategory', item);
      await removeListItem(doc, 'tags', item);

      settings = await fetchSettingsByType(doc);
      expect(settings.primaryCategory).not.toContain(item);
      expect(settings.secondaryCategory).not.toContain(item);
      expect(settings.tags).not.toContain(item);
    } catch (err) {
      expect(err).toBeFalsy(); // should not reach this
    }
  });
});
