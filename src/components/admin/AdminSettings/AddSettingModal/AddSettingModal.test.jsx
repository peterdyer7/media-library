import React from 'react';
import { render } from 'react-testing-library';

import AddSettingModal from './AddSettingModal';

describe('<AddSettingModal />', () => {
  it('renders', async () => {
    const label = 'setting!';
    const { getByText } = render(
      <AddSettingModal
        toggleModal={() => {}}
        modalOpen={true}
        settingLabel={label}
        setting={''}
        type={''}
        addSetting={() => {}}
      />
    );

    expect(getByText(`${label} - Add Setting`)).toBeInTheDocument();
  });
});
