import React from 'react';
import { render } from 'react-testing-library';

import SettingsList from './SettingsList';

describe('<SettingsList />', () => {
  it('renders with Error', async () => {
    const label = 'a setting!';
    const { getByText } = render(
      <SettingsList
        settingLabel={label}
        setting={''}
        type={''}
        settings={[]}
        allowAdd={false}
        allowDelete={false}
        addSetting={() => {}}
        removeSetting={() => {}}
      />
    );

    expect(getByText(label)).toBeInTheDocument();
  });
});
