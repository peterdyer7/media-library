import React from 'react';
import { render } from 'react-testing-library';

import AdminProperties from './AdminProperties';

describe('<AdminProperties />', () => {
  it('renders with Error', async () => {
    const error = 'an error!';
    const { getByText } = render(
      <AdminProperties
        properties={[]}
        error={error}
        success={''}
        loading={false}
        boundPropertiesFetch={() => {}}
        boundPropertyCreate={() => {}}
        boundPropertyDelete={() => {}}
        boundPropertyClearMsgs={() => {}}
        history={{}}
      />
    );

    expect(getByText(`Error! ${error}`)).toBeInTheDocument();
  });
});
