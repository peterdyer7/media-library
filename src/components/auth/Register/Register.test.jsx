import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Register from './Register';
import { COMPANY_LABEL } from '../../../shared/constants/company';

describe('<Register />', () => {
  it('renders and inputs must be valid to enable submit', async () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={['/register']}>
        <Register />
      </MemoryRouter>
    );

    expect(getByText(COMPANY_LABEL)).toBeInTheDocument();

    expect(getByTestId('register-form')).toHaveFormValues({
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      password1: '',
      password2: '',
      agree: false
    });

    const button = getByTestId('submit');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).not.toHaveAttribute('type', 'button');

    const firstName = getByTestId('firstNameInput');
    const validFirstName = 'firsty';

    const lastName = getByTestId('lastNameInput');
    const validLastName = 'lasty';

    const company = getByTestId('companyInput');
    const validCompany = 'company';

    const email = getByTestId('emailInput');
    const validEmail = 'tester@example.com';
    const invalidEmail = 'tester';

    const password1 = getByTestId('password1Input');
    const password2 = getByTestId('password2Input');
    const validPassword = 'password';

    const agree = getByTestId('agreeInput');

    // inputs initially empty, submit disable
    expect(firstName.value).toBe('');
    expect(lastName.value).toBe('');
    expect(company.value).toBe('');
    expect(email.value).toBe('');
    expect(password1.value).toBe('');
    expect(password2.value).toBe('');
    expect(agree.checked).toBe(false);
    expect(button).toBeDisabled();

    // update to valid inputs, submit enabled
    fireEvent.change(firstName, { target: { value: validFirstName } });
    fireEvent.change(lastName, { target: { value: validLastName } });
    fireEvent.change(company, { target: { value: validCompany } });
    fireEvent.change(email, { target: { value: validEmail } });
    fireEvent.change(password1, { target: { value: validPassword } });
    fireEvent.change(password2, { target: { value: validPassword } });
    fireEvent.change(agree, { target: { checked: true } });
    expect(firstName.value).toBe(validFirstName);
    expect(lastName.value).toBe(validLastName);
    expect(company.value).toBe(validCompany);
    expect(email.value).toBe(validEmail);
    expect(password1.value).toBe(validPassword);
    expect(password2.value).toBe(validPassword);
    expect(agree.checked).toBe(true);
    expect(button).not.toBeDisabled();

    // update to an invalid email, submit disabled
    fireEvent.change(email, { target: { value: invalidEmail } });
    expect(email.value).toBe(invalidEmail);
    await wait(() => expect(button).toBeDisabled());
  });
});
