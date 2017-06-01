import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import * as mocha from 'mocha';
import * as React from 'react';
import * as sinon from 'sinon';

import { ILoginProps, Login } from '../../src/components/login';

const fakeEvent = {
  preventDefault: (): string => 'test',
};

describe('login.tsx', () => {
  let wrapper: ShallowWrapper<{}, {}>;
  let login: sinon.SinonSpy;
  let resetLoginErrors: sinon.SinonSpy;

  describe('| No Errors', () => {
    const props: any = {
      errors: undefined,
      login: undefined,
      resetLoginErrors: undefined,
      token: 'token',
      user: 'username',
    };

    beforeEach(() => {
      login = sinon.spy();
      resetLoginErrors = sinon.spy();
      const spies = { login, resetLoginErrors };
      wrapper = shallow(<Login {...props} {...spies} />);
    });

    it('should have the correct container', () => {
      expect(wrapper.find('.login__container').length).to.equal(1);
    });

    it('should have two login fields and two buttons', () => {
      expect(wrapper.find('LoginField').length).to.equal(2);
      expect(wrapper.find('button').length).to.equal(2);
    });

    it('should call login on form submit', () => {
      expect(login.callCount).to.equal(0);
      wrapper.find('form').simulate('submit', fakeEvent);
      expect(login.callCount).to.equal(1);
    });

    it('should update the state using handleInputChange', () => {
      const instance: any = wrapper.instance();
      const fakeInputEvent = {
        currentTarget: { name: 'username', value: 'new username' },
        preventDefault: (): string => 'test',
      };
      instance.handleInputChange(fakeInputEvent);
      expect(wrapper.state('username')).to.equal('new username');
    });

    it('should call resetLoginErrors on clear button click', () => {
      expect(resetLoginErrors.callCount).to.equal(0);
      wrapper.find('#login__clear').simulate('click', fakeEvent);
      expect(resetLoginErrors.callCount).to.equal(1);
    });
  });


  describe('| With Errors', () => {
    const props: any = {
      errors: undefined,
      login: undefined,
      resetLoginErrors: undefined,
      token: 'token',
      user: 'username',
    };

    it('shows an error on the username field', () => {
      const errors: any = {
        username: ['username error'],
      };
      wrapper = shallow(<Login {...props} errors={errors} />);
      const usernameField: any = wrapper.find('LoginField').at(0);
      expect(usernameField.props().error).to.equal(errors.username[0]);
    });

    it('shows an error on the password field', () => {
      const errors: any = {
        password: ['password error'],
      };
      wrapper = shallow(<Login {...props} errors={errors} />);
      const passwordField: any = wrapper.find('LoginField').at(1);
      expect(passwordField.props().error).to.equal(errors.password[0]);
    });


    it('shows an error on the non field field', () => {
      const errors: any = {
        non_field_errors: ['non_field_errors error'],
      };
      wrapper = shallow(<Login {...props} errors={errors} />);
      const errorField: any = wrapper.find('.login__error_large');
      expect(errorField.text()).to.equal(errors.non_field_errors[0]);
    });
  });
});
