import React from 'react';
import { shallow } from 'enzyme';
import Search from './';

it('Test example', () => {
  const wrapper = shallow(<Search />);
  expect(wrapper.is('ul')).toBeTruthy();
});
