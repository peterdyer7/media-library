import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import RegisterContainer from './RegisterContainer';
import Root from '../../../components/Root/Root';
import { COMPANY_LABEL } from '../../../shared/constants/company';
import { deleteUser } from '../../../shared/firebase/auth/auth';

describe('<RegisterContainer />', () => {
  it('renders and submits registration successfully', async () => {
    const { getByTestId, getByText } = render(
      <Root>
        <MemoryRouter initialEntries={['/register']}>
          <RegisterContainer />
        </MemoryRouter>
      </Root>
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
    const validEmail = 'newregister@example.com';
    const password1 = getByTestId('password1Input');
    const password2 = getByTestId('password2Input');
    const validPassword = 'password';
    const agree = getByTestId('agreeInput');

    // update form
    fireEvent.change(firstName, { target: { value: validFirstName } });
    fireEvent.change(lastName, { target: { value: validLastName } });
    fireEvent.change(company, { target: { value: validCompany } });
    fireEvent.change(email, { target: { value: validEmail } });
    fireEvent.change(password1, { target: { value: validPassword } });
    fireEvent.change(password2, { target: { value: validPassword } });
    fireEvent.click(agree);

    // verify and submit
    await wait(() => {
      expect(button).not.toBeDisabled();
      expect(getByTestId('register-form')).toHaveFormValues({
        firstName: validFirstName,
        lastName: validLastName,
        company: validCompany,
        email: validEmail,
        password1: validPassword,
        agree: true
      });
      fireEvent.click(button);
    });

    // submit registration
    await wait(() => {
      expect(getByTestId('userId').textContent).toBeTruthy();
    });

    // cleanup
    await deleteUser();
  });
});
