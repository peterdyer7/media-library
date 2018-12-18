import React from 'react';
import { mount } from 'enzyme';

import App from './App';

describe('<App />', () => {
  it('renders and contains 1 <Switch>', () => {
    const wrapper = mount(<App />);
    expect(wrapper).toContainExactlyOneMatchingElement('Switch');
  });
});
