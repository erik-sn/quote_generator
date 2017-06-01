import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import * as mocha from 'mocha';
import * as React from 'react';
import * as sinon from 'sinon';

import Navbar, { INavbarProps } from '../../src/components/navbar';

describe('navbar.tsx', () => {
  let wrapper: ShallowWrapper<{}, {}>;

  describe(' | user is logged in', () => {
    let spy: sinon.SinonSpy;
    const props: INavbarProps = {
      logout: undefined,
      path: '/login',
      token: 'token',
      username: 'test',
    };

    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<Navbar {...props} logout={spy} />);
    });

    it('should have the correct container', () => {
      expect(wrapper.find('.navbar__container').length).to.equal(1);
      expect(wrapper.find('#navbar__left').length).to.equal(1);
      expect(wrapper.find('#navbar__right').length).to.equal(1);
    });

    it('should have 4 nav items', () => {
      expect(wrapper.find('.navbar__item').length).to.equal(4);
    });

    it('should have 1 active nav item', () => {
      expect(wrapper.find('.navbar__active').length).to.equal(1);
    });

    it('username should be displayed in the correct container', () => {
      expect(wrapper.find('#navbar__user').text()).to.equal(props.username);
    });

    it('should call logout when clicked', () => {
      expect(spy.callCount).to.equal(0);
      wrapper.find('a').simulate('click');
      expect(spy.callCount).to.equal(1);
    });
  });

  describe(' | user is logged out', () => {
    let spy: sinon.SinonSpy;
    const props: INavbarProps = {
      logout: undefined,
      path: '/login',
      token: undefined,
      username: undefined,
    };

    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<Navbar {...props} logout={spy} />);
    });

    it('should not have an <a> tag to logout', () => {
      expect(wrapper.find('a').length).to.equal(0);
    });

    it('should show the login link', () => {
      expect(wrapper.find('#navbar__login').length).to.equal(1);
    });
  });
});
