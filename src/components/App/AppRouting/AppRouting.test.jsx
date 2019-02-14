import React from 'react';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import AppRouting from './AppRouting';
import Root from '../../Root/Root';

describe('<AppRouting />', () => {
  it('renders', async () => {
    const { getByText } = render(
      <Root>
        <MemoryRouter>
          <AppRouting user={{}} />
        </MemoryRouter>
      </Root>
    );

    expect(getByText('Login')).toBeInTheDocument();
  });
});
