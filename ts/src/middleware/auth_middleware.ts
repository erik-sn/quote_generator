// tslint:disable:no-string-literal
import * as axios from 'axios';
import * as cookie from 'js-cookie';
import * as Redux from 'redux';

import { ACTIONS } from '../constants/constants';
import { IAction, IReduxStore } from '../constants/interfaces';

const AuthMiddleware = (store: Redux.Store<IReduxStore>) => (next: any) => (action: any) => {
  /**
   * After successfully logging in store received token and
   * username as a cookie. Set the Authorization header on
   * axios to use this this token for all HTTP requests to
   * handle authentication back to the API.
   */
  if (action.type === ACTIONS.LOGIN && action.payload.data) {
    const token = action.payload.data.token;
    const tokenObject = { token, username: action.meta.username };

    // DRF uses `Token` - traditional OAuth is usually `Bearer`
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    cookie.set('auth', JSON.stringify(tokenObject), { expires: 0.1 });
  }

  /**
   * Case where cookie already exists after page refresh
   * and we need to re-set the token on the axios Authorization
   * header
   */
  if (action.type === ACTIONS.REFRESH_USER) {
    const token = action.payload.token;
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  }

  /**
   * on logout remove the cookie and clear the Authorization header
   */
  if (action.type === ACTIONS.LOGOUT) {
    cookie.remove('auth');
    // tslint:disable-next-line:no-string-literal
    axios.defaults.headers.common['Authorization'] = null;
  }
  next(action);
};

export default AuthMiddleware;
