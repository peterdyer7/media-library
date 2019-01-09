import React from 'react';
import { render } from 'react-testing-library';

import Account from './Account';

describe('<Account />', () => {
  it('renders', async () => {
    const email = 'auser@example.com';
    const { getByText } = render(
      <Account
        user={{ uid: '123', email: email }}
        loading={false}
        error=""
        boundResetPassword={() => {}}
      />
    );

    expect(getByText('User Settings')).toBeInTheDocument();
    expect(getByText(email)).toBeInTheDocument();
  });
});
