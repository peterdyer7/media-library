import React from 'react';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import App from './App';
import Root from '../Root/Root';

describe('<App />', () => {
  it('renders when starting on properties', async () => {
    const { getByText } = render(
      <Root>
        <MemoryRouter initialEntries={['/properties']}>
          <App user={{ uid: '123', role: 'user' }} boundAuthCheck={() => {}} />
        </MemoryRouter>
      </Root>
    );
    expect(getByText('Properties')).toBeInTheDocument();
  });
});
