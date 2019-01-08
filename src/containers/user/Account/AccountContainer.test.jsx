import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import AccountContainer from './AccountContainer';
import Root from '../../../components/Root/Root';

describe('<AccountContainer />', () => {
  it('renders and prepares form for submission', async () => {
    const { getByTestId } = render(
      <Root>
        <MemoryRouter initialEntries={['/register']}>
          <AccountContainer />
        </MemoryRouter>
      </Root>
    );

    // need to show form
    const showButton = getByTestId('show');
    expect(showButton).toHaveAttribute('type', 'button');
    fireEvent.click(showButton);

    // form now available
    await wait(() => {
      expect(getByTestId('resetpassword-form')).toHaveFormValues({
        newPassword: ''
      });
      expect(getByTestId('submit')).toBeDisabled();
    });

    // update form
    fireEvent.change(getByTestId('newPasswordInput'), {
      target: { value: 'password' }
    });

    // verify
    await wait(() => {
      expect(getByTestId('submit')).not.toBeDisabled();
      expect(getByTestId('resetpassword-form')).toHaveFormValues({
        newPassword: 'password'
      });
    });
  });
});
