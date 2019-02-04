import { createUser, fetchUser, deleteUser } from './users';
import { login, logout } from '../auth/auth';
import { fbUser } from '../firebase';

describe('settings.js (Firebase Firestore)', () => {
  beforeAll(async () => {
    await login(fbUser.email, fbUser.password);
  });

  afterAll(async () => {
    await logout();
  });

  it('calls createUser, fetchUser and deleteUser successfully', async () => {
    const user = {
      uid: '123',
      email: 'auserdbtest@example.com',
      firstName: 'firsty',
      lastName: 'lasty',
      company: 'companyabc',
      agreeToTerms: true,
      role: 'user'
    };
    try {
      await createUser(user);
      const fetchedUser = await fetchUser(user.uid);
      expect(fetchedUser).toMatchObject(user);
      await deleteUser(user.uid);
      const deletedUser = await fetchUser(user.uid);
      expect(deletedUser).toBeFalsy();
    } catch (err) {
      expect(err).toBeFalsy(); // should not make it here
    }
  });

  it('calls createUser and fails when no user is provided', async () => {
    const user = {};
    try {
      await createUser(user);
      expect(true).toBeFalsy(); // should not make it here
    } catch (err) {
      expect(err).toBeTruthy(); // should always fail
    }
  });

  it('calls fetchUser and returns null if user is not found', async () => {
    try {
      const fetchedUser = await fetchUser('999');
      expect(fetchedUser).toBeNull();
    } catch (err) {
      expect(err).toBeFalsy(); // should not make it here
    }
  });

  it('calls fetchUser and fails if no id is provided', async () => {
    try {
      const fetchedUser = await fetchUser();
      expect(fetchedUser).toBeTruthy(); // should not make it here
    } catch (err) {
      expect(err).toBeTruthy(); // should always fail
    }
  });

  it('calls deleteUser and does not throw an error if no such user exists', async () => {
    try {
      const deletededUser = await deleteUser('999');
      expect(deletededUser).toBeFalsy();
    } catch (err) {
      expect(err).toBeFalsy(); // should not make it here
    }
  });

  it('calls deleteUser and fails if no id is provided', async () => {
    try {
      const deletededUser = await deleteUser();
      expect(deletededUser).toBeTruthy(); // should not make it here
    } catch (err) {
      expect(err).toBeTruthy(); // should always fail
    }
  });
});
