import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import * as mocha from 'mocha';
import * as React from 'react';

import Application from '../../src/components/application';

describe('application.tsx', () => {
  let wrapper: ShallowWrapper<{}, {}>;

  beforeEach(() => {
    wrapper = shallow(<Application />);
  });

  it('should render a Route component', () => {
    expect(wrapper.find('Route').length).to.equal(1);
  });
});
