import React from 'react';
import { render } from 'react-testing-library';
import AppContainer from './AppContainer';
import Root from '../../components/Root/Root';

describe('<AppContainer />', () => {
  it('renders', () => {
    const { getByText } = render(
      <Root>
        <AppContainer />
      </Root>
    );
    expect(getByText('Login')).toBeInTheDocument();
  });
});
