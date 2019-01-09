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
      expect(err).toBeFalsy(); // show not make it here
    }
  });
});
