import React from 'react';
import { render } from 'react-testing-library';
import App from './App';

describe('<App />', () => {
  it('renders', () => {
    const { getByText } = render(<App />);
    expect(getByText('Login')).toBeInTheDocument();
  });
});
