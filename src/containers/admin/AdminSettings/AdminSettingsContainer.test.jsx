import React from 'react';
import { render } from 'react-testing-library';

import Root from '../../../components/Root/Root';
import AdminSettingsContainer from './AdminSettingsContainer';

describe('<AdminSettingsContainer />', async () => {
  it('renders', async () => {
    const error = 'an error!';
    const { getByText } = render(
      <Root>
        <AdminSettingsContainer />
      </Root>
    );
    expect(true).toBeTruthy();
  });
});
