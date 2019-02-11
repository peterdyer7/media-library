import React from 'react';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Admin from './Admin';
import Root from '../../Root/Root';

describe('<Admin />', () => {
  it('renders', async () => {
    const { getByText } = render(
      <Root>
        <MemoryRouter>
          <Admin
            match={{
              isExact: false,
              params: {},
              path: '/admin',
              url: '/admin'
            }}
          />
        </MemoryRouter>
      </Root>
    );

    expect(getByText('Properties')).toBeInTheDocument();
  });
});
