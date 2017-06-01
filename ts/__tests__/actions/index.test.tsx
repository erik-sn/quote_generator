import { expect } from 'chai';
import * as mocha from 'mocha';
import * as moxios from 'moxios';

import * as actions from '../../src/actions/index';
import { ACTIONS } from '../../src/constants/constants';
import { IAction } from '../../src/constants/interfaces';

describe('index.test.tsx (Actions)', () => {

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should generate the correct action for login', () => {
    const username = 'test';
    const password = 'test';
    moxios.withMock(() => {
      const action: IAction = actions.login(username, password);
      expect(action.type).to.equal(ACTIONS.LOGIN);
      expect(action.payload).to.be.a('promise');
    });
  });

  it('Should generate the correct action for refreshUser', () => {
    const username = 'test';
    const token = 'test';
    const action: IAction = actions.refreshUser(username, token);
    expect(action.type).to.equal(ACTIONS.REFRESH_USER);
    expect(action.payload).to.deep.equal({ username, token });
  });

  it('Should generate the correct action for logout', () => {
    const action: IAction = actions.logout();
    expect(action.type).to.equal(ACTIONS.LOGOUT);
    expect(action.payload).to.equal(null);
  });

  it('Should generate the correct action for resetLoginErrors', () => {
    const action: IAction = actions.resetLoginErrors();
    expect(action.type).to.equal(ACTIONS.RESET_LOGIN_ERRORS);
    expect(action.payload).to.equal(null);
  });

});
