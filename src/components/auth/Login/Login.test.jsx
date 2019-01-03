import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Login from './Login';
import { COMPANY_LABEL } from '../../../shared/constants/company';

describe('<Login />', () => {
  it('renders and contains header', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );
    expect(getByText(COMPANY_LABEL)).toBeInTheDocument();
  });

  it('renders and contains form fields', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );

    expect(getByTestId('emailInput')).toBeInTheDocument();
    expect(getByTestId('passwordInput')).toBeInTheDocument();
  });

  it('renders and contains submit button, initially disabled', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );

    const button = getByTestId('submit');

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).not.toHaveAttribute('type', 'button');
  });

  it('renders and contains form, initially empty', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );

    expect(getByTestId('login-form')).toHaveFormValues({
      email: '',
      password: ''
    });
  });

  it('renders and inputs must be valid to enable submit', async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );

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
    await wait(() => expect(getByTestId('submit')).not.toBeDisabled());
    expect(getByTestId('login-form')).toHaveFormValues({
      email: validEmail,
      password: validPassword
    });

    // update to an invalid email, submit disabled
    fireEvent.change(email, { target: { value: invalidEmail } });
    await wait(() => expect(getByTestId('submit')).toBeDisabled());
    expect(getByTestId('login-form')).toHaveFormValues({
      email: invalidEmail,
      password: validPassword
    });

    // update to an invalid password, submit disabled
    fireEvent.change(email, { target: { value: validEmail } });
    fireEvent.change(password, { target: { value: invalidPassword } });
    await wait(() => expect(getByTestId('submit')).toBeDisabled());
    expect(getByTestId('login-form')).toHaveFormValues({
      email: validEmail,
      password: invalidPassword
    });
  });
});
