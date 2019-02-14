import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';

import LoginForm from './LoginForm';

describe('<LoginForm />', async () => {
  it('renders as expected and submits', async () => {
    const handleSubmit = jest.fn();
    const email = 'email@example.com';
    const password = 'password';
    const { getByText, getByTestId } = render(
      <LoginForm sendAuth={handleSubmit} />
    );

    const loginButton = getByText('Login');
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
    expect(loginButton).toHaveAttribute('type', 'submit');

    expect(getByTestId('login-form')).toHaveFormValues({
      email: '',
      password: ''
    });

    const emailInput = getByTestId('emailInput');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = getByTestId('passwordInput');
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    await wait(() => {
      expect(getByTestId('login-form')).toHaveFormValues({
        email,
        password
      });
      expect(loginButton).not.toBeDisabled();
      fireEvent.click(loginButton);
    });

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('handles input validation', async () => {
    const { getByTestId } = render(<LoginForm sendAuth={() => {}} />);

    const email = getByTestId('emailInput');
    const validEmail = 'tester@example.com';
    const invalidEmail = 'tester';

    const password = getByTestId('passwordInput');
    const validPassword = 'password';
    const invalidPassword = '';

    // email and password initially empty, submit disable
    expect(getByTestId('login-form')).toHaveFormValues({
      email: '',
      password: ''
    });
    expect(getByTestId('submit')).toBeDisabled();

    // update to valid email and password, submit enabled
    fireEvent.change(email, { target: { value: validEmail } });
    fireEvent.change(password, { target: { value: validPassword } });
    await wait(() => {
      expect(getByTestId('submit')).not.toBeDisabled();
      expect(getByTestId('login-form')).toHaveFormValues({
        email: validEmail,
        password: validPassword
      });
    });

    // update to an invalid email, submit disabled
    fireEvent.change(email, { target: { value: invalidEmail } });
    await wait(() => {
      expect(getByTestId('submit')).toBeDisabled();
      expect(getByTestId('login-form')).toHaveFormValues({
        email: invalidEmail,
        password: validPassword
      });
    });

    // update to an invalid password, submit disabled
    fireEvent.change(email, { target: { value: validEmail } });
    fireEvent.change(password, { target: { value: invalidPassword } });
    await wait(() => {
      expect(getByTestId('submit')).toBeDisabled();
      expect(getByTestId('login-form')).toHaveFormValues({
        email: validEmail,
        password: invalidPassword
      });
    });
  });
});
