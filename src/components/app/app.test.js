import React from 'react';
import { shallow } from 'enzyme';
import App from './app';


describe('HTML(static)', () => {
  const app = shallow(<App />);
  it('has a textarea', () => {
   expect(app.find('h2').exists()).toBe(true)
 })
})
