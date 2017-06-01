import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import * as mocha from 'mocha';
import * as React from 'react';

import LoginPrompt from '../../src/components/login_prompt';

describe('login prompt.tsx', () => {
  let wrapper: ShallowWrapper<{}, {}>;
  beforeEach(() => {
    wrapper = shallow(<LoginPrompt />);
  });

  it('should have the correct container', () => {
    expect(wrapper.find('.prompt__container').length).to.equal(1);
  });

  it('should prompt the user to login', () => {
    const expected = 'Your need to <Link /> to view quotes!';
    expect(wrapper.find('h2').text()).to.equal(expected);
  });
});
