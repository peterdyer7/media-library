import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import ForgotPassword from './ForgotPassword';
import { COMPANY_LABEL } from '../../../shared/constants/company';

describe('<ForgotPassword />', () => {
  it('renders and inputs must be valid to enable submit', async () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={['/forgotpassword']}>
        <ForgotPassword />
      </MemoryRouter>
    );

    expect(getByText(COMPANY_LABEL)).toBeInTheDocument();

    expect(getByTestId('forgotpassword-form')).toHaveFormValues({
      email: ''
    });

    const button = getByTestId('submit');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).not.toHaveAttribute('type', 'button');

    const email = getByTestId('emailInput');
    const validEmail = 'tester@example.com';
    const invalidEmail = 'tester';

    // inputs initially empty, submit disable
    expect(email.value).toBe('');
    expect(button).toBeDisabled();

    // update to valid inputs, submit enabled
    fireEvent.change(email, { target: { value: validEmail } });
    expect(email.value).toBe(validEmail);
    await wait(() => expect(button).not.toBeDisabled());

    // update to an invalid email, submit disabled
    fireEvent.change(email, { target: { value: invalidEmail } });
    expect(email.value).toBe(invalidEmail);
    await wait(() => expect(button).toBeDisabled());
  });

  it('renders and submits successfully - failed case', async () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={['/forgotpassword']}>
        <ForgotPassword />
      </MemoryRouter>
    );

    expect(getByTestId('forgotpassword-form')).toHaveFormValues({
      email: ''
    });

    const button = getByTestId('submit');

    const email = getByTestId('emailInput');
    const validEmailDoesNotExist = 'tester1234567890@example.com';

    // inputs initially empty, submit disable
    expect(email.value).toBe('');
    expect(button).toBeDisabled();

    // update to valid inputs, submit enabled
    fireEvent.change(email, { target: { value: validEmailDoesNotExist } });
    expect(email.value).toBe(validEmailDoesNotExist);
    await wait(() => expect(button).not.toBeDisabled());

    // send update and check response
    fireEvent.click(button);
    await wait(() => {
      const expected =
        'There is no user record corresponding to this identifier. The user may have been deleted.';
      expect(getByTestId('message').textContent).toBe(expected);
    });
  });
});
