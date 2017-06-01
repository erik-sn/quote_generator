import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import * as mocha from 'mocha';
import * as React from 'react';

import LoginSuccess, { ILoginSuccessProps } from '../../src/components/login_success';

describe('login success.tsx', () => {
  let wrapper: ShallowWrapper<{}, {}>;
  const props: ILoginSuccessProps = {
    username: 'test',
  };
  beforeEach(() => {
    wrapper = shallow(<LoginSuccess {...props} />);
  });

  it('should have the correct container', () => {
    expect(wrapper.find('.login_success__container').length).to.equal(1);
  });

  it('should show the user a message that they will be redirected', () => {
    // tslint:disable-next-line:max-line-length
    const expected = `Welcome, ${props.username} you have been successfully logged in, redirecting you to the home page`;
    expect(wrapper.find('h3').text()).to.equal(expected);
  });

  it('should render a Redirect when redirect state is true', () => {
    const instance: any = wrapper.instance();
    instance.setState({ redirect: true });
    expect(wrapper.find('Redirect').length).to.equal(1);
  });
});
