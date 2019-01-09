import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import LoginContainer from './LoginContainer';
import Root from '../../../components/Root/Root';
import { COMPANY_LABEL } from '../../../shared/constants/company';
import { fbUser } from '../../../shared/firebase/firebase';

describe('<LoginContainer />', () => {
  it('renders and contains header', () => {
    const { getByText } = render(
      <Root>
        <MemoryRouter initialEntries={['/login']}>
          <LoginContainer />
        </MemoryRouter>
      </Root>
    );
    expect(getByText(COMPANY_LABEL)).toBeInTheDocument();
  });

  it('renders and end-to-end login successful', async () => {
    const { getByTestId } = render(
      <Root>
        <MemoryRouter initialEntries={['/login']}>
          <LoginContainer />
        </MemoryRouter>
      </Root>
    );

    const email = getByTestId('emailInput');
    const validEmail = fbUser.email;
    const password = getByTestId('passwordInput');
    const validPassword = fbUser.password;

    // email and password initially empty, submit disable
    expect(getByTestId('login-form')).toHaveFormValues({
      email: '',
      password: ''
    });
    expect(getByTestId('submit')).toBeDisabled();
    expect(getByTestId('userId').textContent).toBeFalsy();

    // update to valid email and password, submit enabled
    fireEvent.change(email, { target: { value: validEmail } });
    fireEvent.change(password, { target: { value: validPassword } });
    await wait(() => {
      expect(getByTestId('submit')).not.toBeDisabled();
      expect(getByTestId('login-form')).toHaveFormValues({
        email: validEmail,
        password: validPassword
      });
      fireEvent.click(getByTestId('submit'));
    });
    await wait(() => {
      expect(getByTestId('userId').textContent).toBeTruthy();
    });
  });
});
