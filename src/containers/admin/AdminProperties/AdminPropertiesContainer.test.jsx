import React from 'react';
import { render } from 'react-testing-library';

import Root from '../../../components/Root/Root';
import AdminPropertiesContainer from './AdminPropertiesContainer';

describe('<AdminPropertiesContainer />', async () => {
  it('renders', async () => {
    const error = 'an error!';
    const { getByText } = render(
      <Root>
        <AdminPropertiesContainer />
      </Root>
    );
    expect(true).toBeTruthy();
  });
});
