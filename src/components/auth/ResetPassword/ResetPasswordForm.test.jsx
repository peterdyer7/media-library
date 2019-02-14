import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';

import ResetPasswordForm from './ResetPasswordForm';

describe('<ResetPasswordForm />', async () => {
  it('renders as expected and submits', async () => {
    const handleSubmit = jest.fn();
    const handleShow = jest.fn();
    const password = 'password';
    const { getByText, getByTestId } = render(
      <ResetPasswordForm sendResetPassword={handleSubmit} show={handleShow} />
    );

    const updateButton = getByText('Update');
    expect(updateButton).toBeInTheDocument();
    expect(updateButton).toBeDisabled();
    expect(updateButton).toHaveAttribute('type', 'submit');

    expect(getByTestId('resetpassword-form')).toHaveFormValues({
      newPassword: ''
    });

    const newPasswordInput = getByTestId('newPasswordInput');
    expect(newPasswordInput).toBeInTheDocument();

    fireEvent.change(newPasswordInput, { target: { value: password } });

    await wait(() => {
      expect(getByTestId('resetpassword-form')).toHaveFormValues({
        newPassword: password
      });
      expect(updateButton).not.toBeDisabled();
      fireEvent.click(updateButton);
    });

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleShow).toHaveBeenCalledTimes(1);
    });
  });

  it('renders as expected and cancels', async () => {
    const handleSubmit = jest.fn();
    const handleShow = jest.fn();
    const password = 'password';
    const { getByText } = render(
      <ResetPasswordForm sendResetPassword={handleSubmit} show={handleShow} />
    );

    const cancelButton = getByText('Cancel');
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toHaveAttribute('type', 'button');

    fireEvent.click(cancelButton);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(0);
      expect(handleShow).toHaveBeenCalledTimes(1);
    });
  });

  it('handles input validation', async () => {
    const { getByText, getByTestId } = render(
      <ResetPasswordForm sendResetPassword={() => {}} show={() => {}} />
    );

    const newPassword = getByTestId('newPasswordInput');
    const validPassword = 'password';
    const invalidPassword = '';

    // password initially empty, submit disable
    expect(getByTestId('resetpassword-form')).toHaveFormValues({
      newPassword: ''
    });
    expect(getByText('Update')).toBeDisabled();

    // update to valid password, submit enabled
    fireEvent.change(newPassword, { target: { value: validPassword } });
    await wait(() => {
      expect(getByText('Update')).not.toBeDisabled();
      expect(getByTestId('resetpassword-form')).toHaveFormValues({
        newPassword: validPassword
      });
    });

    // update to an invalid password, submit disabled
    fireEvent.change(newPassword, { target: { value: invalidPassword } });
    await wait(() => {
      expect(getByText('Update')).toBeDisabled();
      expect(getByTestId('resetpassword-form')).toHaveFormValues({
        newPassword: invalidPassword
      });
    });
  });
});
