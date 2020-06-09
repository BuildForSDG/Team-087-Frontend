import {createShallow} from '@material-ui/core/test-utils';
import Signup from '../components/auth/Signup';
import React from 'react';
import {RadioGroup, TextField} from '@material-ui/core';

describe ('<Signup /> component', () => {
  let shallow;

  beforeAll (() => {
    shallow = createShallow ();
  });

  it ('should have 5 input fields', () => {
    const wrapper = shallow (<Signup />);
    expect (wrapper.find (TextField).length).toEqual (5);
  });

  it ('should have 2 radio-group fields', () => {
    const wrapper = shallow (<Signup />);
    expect (wrapper.find (RadioGroup).length).toEqual (2);
  });

  /* it ('should have 4 radio-button form-control fields', () => {
    const wrapper = shallow (<Signup />);
    expect (wrapper.find (FormControl).length).toEqual (4);
  }); */

  // Checking for state update by simulating a change in the input field and see if the prop changes
  it ('should check for prop changes when an onChange event happens', () => {
    const wrapper = shallow (<Signup />);

    // Simulate a change in the first name field
    wrapper.find (TextField).at (0).simulate ('change', {
      target: {
        value: 'Hamsa',
      },
    });
    expect (wrapper.find (TextField).at (0).prop ('value')).toEqual ('Hamsa');

    // Simulate a change in the last name field
    wrapper.find (TextField).at (1).simulate ('change', {
      target: {
        value: 'Harcourt',
      },
    });
    expect (wrapper.find (TextField).at (1).prop ('value')).toEqual (
      'Harcourt'
    );

    // Simulate a change in the email field
    wrapper.find (TextField).at (2).simulate ('change', {
      target: {
        value: 'hamsaharcourt@gmail.com',
      },
    });
    expect (wrapper.find (TextField).at (2).prop ('value')).toEqual (
      'hamsaharcourt@gmail.com'
    );

    // Simulate a change in the password field
    wrapper.find (TextField).at (3).simulate ('change', {
      target: {
        value: 'eckankar2757101',
      },
    });
    expect (wrapper.find (TextField).at (3).prop ('value')).toEqual (
      'eckankar2757101'
    );

    // Simulate a change in the confirm password field
    wrapper.find (TextField).at (4).simulate ('change', {
      target: {
        value: 'eckankar2757101',
      },
    });
    expect (wrapper.find (TextField).at (4).prop ('value')).toEqual (
      'eckankar2757101'
    );
  });

  it ('should have a signup button', () => {
    const wrapper = shallow (<Signup />);
    expect (wrapper.find ('[data-submit-btn]').length).toEqual (1);
    expect(wrapper.find('[data-submit-btn]').text()).toEqual("Submit")
  });
});
