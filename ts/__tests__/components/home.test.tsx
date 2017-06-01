import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import * as mocha from 'mocha';
import * as React from 'react';

import Home, { IHomeProps } from '../../src/components/home';

describe('application.tsx', () => {
  let wrapper: ShallowWrapper<{}, {}>;

  describe(' | username exists', () => {
    const props: IHomeProps = {
      username: 'test',
    };
    beforeEach(() => {
      wrapper = shallow(<Home {...props} />);
    });

    it('should have the correct container', () => {
      expect(wrapper.find('.home__container').length).to.equal(1);
    });

    it('should have a welcome message', () => {
      const expected = 'Welcome to Quote Generator, test';
      expect(wrapper.find('h2').text()).to.equal(expected);
    });

    it('should prompt user to redirect to quotes', () => {
      const expected = 'You can get random quotes <Link />';
      expect(wrapper.find('h3').text()).to.equal(expected);
    });
  });
});
