import React from 'react';
import { render } from 'react-testing-library';
import App from './App';
import Root from '../Root/Root';

describe('<App />', () => {
  it('renders', () => {
    const { getByText } = render(
      <Root>
        <App />
      </Root>
    );
    expect(getByText('Login')).toBeInTheDocument();
  });
});
