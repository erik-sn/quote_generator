import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import * as mocha from 'mocha';
import * as React from 'react';
import * as sinon from 'sinon';

import LoginField, { ILoginFieldProps } from '../../src/components/login_field';

describe('login_field.tsx', () => {
  let wrapper: ShallowWrapper<{}, {}>;
  let spy: sinon.SinonSpy;

  describe(' | no error, no password', () => {
    const props: ILoginFieldProps = {
      error: undefined,
      handleChange: undefined,
      label: 'Username',
      password: false,
      placeholder: 'your username',
      value: 'test_name',
    };

    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<LoginField {...props} handleChange={spy} />);
    });

    it('should have the correct container', () => {
      expect(wrapper.find('.login_field__container').length).to.equal(1);
    });

    it('should show the correct label', () => {
      expect(wrapper.find('h3').text()).to.equal(props.label);
    });

    it('should have an input with a name of label.toLowerCase()', () => {
      expect(wrapper.find('input').props().name).to.equal(props.label.toLowerCase());
    });

    it('should have an input field and correct class', () => {
      expect(wrapper.find('input').length).to.equal(1);
      expect(wrapper.find('.login__input').length).to.equal(1);
    });

    it('the input should be of type text', () => {
      expect(wrapper.find('input').props().type).to.equal('text');
    });

    it('the input should have the correct value', () => {
      expect(wrapper.find('input').props().value).to.equal(props.value);
    });

    it('should call handleChange on change', () => {
      expect(spy.callCount).to.equal(0);
      wrapper.find('input').simulate('change');
      expect(spy.callCount).to.equal(1);
    });
  });

  describe(' | with error, with password', () => {
    const props: ILoginFieldProps = {
      error: 'This field cannot be empty',
      handleChange: undefined,
      label: 'Username',
      password: true,
      placeholder: 'your username',
      value: 'test_name',
    };

    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<LoginField {...props} handleChange={spy} />);
    });

    it('should have an input of type password', () => {
      expect(wrapper.find('input').props().type).to.equal('password');
    });

    it('should display the error', () => {
      expect(wrapper.find('.login__error').text()).to.equal(props.error);
    });
  });
});
