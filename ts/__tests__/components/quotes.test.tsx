import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import * as mocha from 'mocha';
import * as React from 'react';

import Quotes, { IQuotesProps } from '../../src/components/quotes';
import { IQuote } from '../../src/constants/interfaces';

describe('quotes.tsx', () => {
  let wrapper: ShallowWrapper<{}, {}>;

  describe(' | token exists', () => {
    const props: IQuotesProps = {
      token: 'token',
    };
    beforeEach(() => {
      wrapper = shallow(<Quotes {...props} />);
    });

    it('should have the correct container', () => {
      expect(wrapper.find('#quotes__outer').length).to.equal(1);
      expect(wrapper.find('.quotes__container').length).to.equal(1);
    });

    it('should have a button to click to fetch a quote', () => {
      expect(wrapper.find('button').length).to.equal(1);
    });

    it('should prompt the user to get a quote', () => {
      const expected = 'Click the button to get a quote!';
      expect(wrapper.find('h2').text()).to.equal(expected);
    });

    it('should show a quote when it is active', () => {
      const instance: any = wrapper.instance();
      const activeQuote: IQuote = {
        id: 1,
        text: 'Wise words go here',
        title: 'Test Name',
      };
      instance.setState({ activeQuote });
      expect(wrapper.find('#quote__text').text()).to.contain(activeQuote.text);
      expect(wrapper.find('#quote__author').text()).to.contain(activeQuote.title);
    });
  });
});
