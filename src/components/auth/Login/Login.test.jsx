import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Login from './Login';
import { COMPANY_LABEL } from '../../../shared/constants/company';

describe('<Login />', () => {
  it('renders and contains header and form fields', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={['/login']}>
        <Login
          error=""
          loading={false}
          user={{}}
          boundAuthenticate={() => {}}
        />
      </MemoryRouter>
    );
    expect(getByText(COMPANY_LABEL)).toBeInTheDocument();

    expect(getByTestId('emailInput')).toBeInTheDocument();
    expect(getByTestId('passwordInput')).toBeInTheDocument();
  });
});
