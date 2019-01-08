import React from 'react';
import { render } from 'react-testing-library';

import Account from './Account';

describe('<Account />', () => {
  it('renders', async () => {
    const email = 'auser@example.com';
    const { getByText } = render(
      <Account
        user={{ userId: '123', token: 'abc', email: email }}
        loading={false}
        error=""
        boundResetPassword={() => {}}
      />
    );

    expect(getByText('User Settings')).toBeInTheDocument();
    expect(getByText(email)).toBeInTheDocument();
  });
});
