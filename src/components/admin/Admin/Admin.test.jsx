import React from 'react';
import { render } from 'react-testing-library';

import Admin from './Admin';

describe('<Admin />', () => {
  it('renders', async () => {
    const { getByText } = render(<Admin />);

    expect(getByText('Admin')).toBeInTheDocument();
  });
});
