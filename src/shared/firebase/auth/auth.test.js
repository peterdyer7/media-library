import {
  register,
  deleteUser,
  logout,
  login,
  getToken,
  getUser,
  forgotPassword,
  resetPassword
} from './auth';

describe('auth.js (Firebase Auth)', () => {
  describe('register', () => {
    it('succeeds', async () => {
      const email = 'deleteme11@example.com';
      const password = 'password';
      try {
        const user = await register(email, password);
        expect(user.uid).toBeTruthy();
        await deleteUser();
      } catch (err) {
        expect(err).toBeFalsy(); // should not reach this
      }
    });

    it('fails when password < 6 characters', async () => {
      const email = 'deleteme12@example.com';
      const password = 'pass';
      try {
        await register(email, password);
        expect(null).toBeTruthy(); // should not reach this
      } catch (err) {
        expect(err.code).toEqual('auth/weak-password');
        expect(err.message).toEqual('Password should be at least 6 characters');
      }
    });

    it('fails when email already registered', async () => {
      jest.setTimeout(10000);
      const email = 'deleteme13@example.com';
      const password = 'password';
      try {
        const user = await register(email, password);
        expect(user.uid).toBeTruthy();
        await register(email, password);
      } catch (err) {
        expect(err.code).toEqual('auth/email-already-in-use');
        expect(err.message).toEqual(
          'The email address is already in use by another account.'
        );
        await deleteUser();
      }
    });
  });

  describe('login', () => {
    it('succeeds', async () => {
      jest.setTimeout(10000);
      const email = 'deleteme21@example.com';
      const password = 'password';
      try {
        let user = await register(email, password);
        expect(user.uid).toBeTruthy();

        await logout();
        user = getUser();
        expect(user).toBeFalsy();

        user = await login(email, password);
        expect(user.uid).toBeTruthy();

        const token = await getToken(false);
        expect(token).toBeTruthy();

        user = getUser();
        expect(user.uid).toBeTruthy();

        await deleteUser();
      } catch (err) {
        expect(err).toBeFalsy(); // should not reach this
      }
    });

    it('fails when user does not exist', async () => {
      const email = 'deleteme22@example.com';
      const password = 'password';
      try {
        const user = await register(email, password);
        expect(user.uid).toBeTruthy();
        await deleteUser();
        await login(email, password);
        expect(null).toBeTruthy(); // should not reach this
      } catch (err) {
        expect(err.code).toEqual('auth/user-not-found');
        expect(err.message).toEqual(
          'There is no user record corresponding to this identifier. The user may have been deleted.'
        );
      }
    });

    it('fails when the password is incorrect', async () => {
      jest.setTimeout(10000);
      const email = 'deleteme23@example.com';
      const password = 'password';
      const wrongpassword = 'wrongpassword';
      try {
        const user = await register(email, password);
        expect(user.uid).toBeTruthy();
        await logout();
        await login(email, wrongpassword);
        expect(null).toBeTruthy(); // should not reach this
      } catch (err) {
        expect(err.code).toEqual('auth/wrong-password');
        expect(err.message).toEqual(
          'The password is invalid or the user does not have a password.'
        );
        await login(email, password);
        await deleteUser();
      }
    });
  });

  describe('reset password', () => {
    it('succeeds', async () => {
      jest.setTimeout(10000);
      const email = 'deleteme31@example.com';
      const password = 'password';
      const newpassword = 'newpassword';
      try {
        let user = await register(email, password);
        expect(user.uid).toBeTruthy();
        await resetPassword(newpassword);
        await logout();
        user = await login(email, newpassword);
        expect(user.uid).toBeTruthy();
        await deleteUser();
      } catch (err) {
        expect(err).toBeFalsy(); // should not reach this
      }
    });

    it('fails when user not logged in', async () => {
      const email = 'deleteme32@example.com';
      const password = 'password';
      const newpassword = 'newpassword';
      try {
        let user = await register(email, password);
        expect(user.uid).toBeTruthy();
        await logout();
        await resetPassword(newpassword);
        expect(null).toBeTruthy(); // should not reach this
      } catch (err) {
        expect(err).toBeTruthy();
        await login(email, password);
        await deleteUser();
      }
    });
  });

  describe('forgot password', () => {
    it('succeeds', async () => {
      const email = 'deleteme41@example.com';
      const password = 'password';
      try {
        let user = await register(email, password);
        expect(user.uid).toBeTruthy();
        await logout();
        await forgotPassword(email);
        expect(true).toBeTruthy(); // should throw if not successful
        await login(email, password);
        await deleteUser();
      } catch (err) {
        expect(err).toBeFalsy(); // should not reach this
      }
    });

    it('fails if no user record for email address', async () => {
      const email = 'deleteme42@example.com';
      try {
        await forgotPassword(email);
        expect(true).toBeTruthy(); // should throw if not successful
      } catch (err) {
        expect(err.code).toEqual('auth/user-not-found');
        expect(err.message).toEqual(
          'There is no user record corresponding to this identifier. The user may have been deleted.'
        );
      }
    });
  });
});
