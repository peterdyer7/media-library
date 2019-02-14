import React from 'react';
import { render } from 'react-testing-library';

import AdminSettings from './AdminSettings';

describe('<AdminSettings />', () => {
  it('renders with Error', async () => {
    const error = 'an error!';
    const { getByText } = render(
      <AdminSettings
        settings={{}}
        error={error}
        loading={false}
        boundSettingsFetch={() => {}}
        boundSettingAdd={() => {}}
        boundSettingRemove={() => {}}
      />
    );

    expect(getByText(`Error! ${error}`)).toBeInTheDocument();
  });
});
