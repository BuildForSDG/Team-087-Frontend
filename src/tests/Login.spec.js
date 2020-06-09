import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Login from '../components/auth/Login';

/* const mockData = {
  email: 'hamsaharcourt@gmail.com',
  password: 'eckankar2757101',
}; */

describe('<Login /> component', () => {
  let shallow;

  beforeAll(() => {
    // in Jest, use beforeAll
    shallow = createShallow();
  });

  //it ('should have a login button and two hidden buttons', () => {
  it('should have a login button', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(Button).length).toEqual(1);
  });

  it('should have two inputs fields', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(TextField).length).toEqual(2);
  });

  // Checking for state update by simulating a change in the input field and see if the prop changes
  it('should simulate a change in the email input field', () => {
    const wrapper = shallow(<Login />);
    wrapper.find(TextField).at(0).simulate('change', {
      target: {
        value: 'hamsaharcourt@gmail.com',
      },
    });

    expect(wrapper.find(TextField).at(0).prop('value')).toEqual(
      'hamsaharcourt@gmail.com'
    );
  });

  it('should simulate a change in the password field', () => {
    const wrapper = shallow(<Login />);
    wrapper.find(TextField).at(1).simulate('change', {
      target: {
        value: 'eckankar',
      },
    });

    expect(wrapper.find(TextField).at(1).prop('value')).toEqual(
      'eckankar'
    );
  });
});
