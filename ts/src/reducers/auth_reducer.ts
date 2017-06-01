import { ACTIONS } from '../constants/constants';
import { IAction, IAuth } from '../constants/interfaces';

export const initialState: IAuth = {
  errors: {},
  token: undefined,
  username: undefined,
};

export default (state: IAuth = initialState, action: IAction): IAuth => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      if (action.error) {
        return {
          errors: action.payload.response.data,
          token: undefined,
          username: undefined,
        };
      }
      return {
        errors: {},
        token: action.payload.data.token,
        username: action.meta.username,
      };
    case ACTIONS.REFRESH_USER:
      return {
        errors: {},
        ...action.payload,
      };
    case ACTIONS.LOGOUT:
      return { ...initialState };
    case ACTIONS.RESET_LOGIN_ERRORS:
      return { ...state, errors: {} };
    default:
      return state;
  }
};
