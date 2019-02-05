import React from 'react';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Admin from './Admin';

describe('<Admin />', () => {
  it('renders', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Admin
          match={{ isExact: false, params: {}, path: '/admin', url: '/admin' }}
        />
      </MemoryRouter>
    );

    expect(getByText('Properties')).toBeInTheDocument();
  });
});
