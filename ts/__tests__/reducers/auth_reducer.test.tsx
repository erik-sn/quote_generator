import { expect } from 'chai';

import { ACTIONS } from '../../src/constants/constants';
import { IAction, IAuth } from '../../src/constants/interfaces';
import reducer, { initialState } from '../../src/reducers/auth_reducer';


describe('auth_reducer.test.ts | >>>', () => {
  const response = {
    data: { token: 'token' },
  };
  const meta = {
    username: 'test',
  };

  it('should return the initial state', () => {
    expect(reducer(initialState, { payload: {}, type: 'test' })).to.deep.equal(initialState);
  });

  it('should return the correct value for login', () => {
    const result: IAuth = reducer(initialState, {
      payload: response,
      type: ACTIONS.LOGIN,
      meta,
    });
    expect(result.token).to.equal(response.data.token);
    expect(result.username).to.equal(meta.username);
    expect(result.errors).to.deep.equal({});
  });

  it('should return the correct value for login errors', () => {
    const error = { username: 'this field cannot be blank' };
    const errorResponse = { data: error };
    const result: IAuth = reducer(initialState, {
      error: true,
      payload: { response: errorResponse },
      type: ACTIONS.LOGIN,
      meta,
    });
    expect(result.token).to.equal(undefined);
    expect(result.username).to.equal(undefined);
    expect(result.errors).to.deep.equal(error);
  });

  it('should return initial state on logout', () => {
    const result: IAuth = reducer(initialState, {
      payload: null,
      type: ACTIONS.LOGOUT,
    });
    expect(result).to.deep.equal(initialState);
  });

  it('should clear errors on reset login', () => {
    const result: IAuth = reducer(initialState, {
      payload: null,
      type: ACTIONS.RESET_LOGIN_ERRORS,
    });
    expect(result.errors).to.deep.equal({});
  });
});
