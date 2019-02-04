import React from 'react';
import { render } from 'react-testing-library';

import Properties from './Properties';

describe('<Properties />', () => {
  it('renders', async () => {
    const { getByText } = render(<Properties />);

    expect(getByText('Properties')).toBeInTheDocument();
  });
});
