import React from 'react';
import { render } from 'react-testing-library';

import AdminProperty from './AdminProperty';

describe('<AdminProperty />', () => {
  it('renders', async () => {
    const { getByText } = render(<AdminProperty />);

    expect(getByText(`Admin Property`)).toBeInTheDocument();
  });
});
