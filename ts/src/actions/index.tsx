import * as axios from 'axios';
import { ACTIONS, API } from '../constants/constants';
import { IAction } from '../constants/interfaces';

/**
 * Login a user to the backend API given their username and password
 */
export function login(username: string, password: string): IAction {
  const request = axios.post(`${API}/api-token-auth/`, { username, password });
  return {
    meta: {
      username,
    },
    payload: request,
    type: ACTIONS.LOGIN,
  };
}

/**
 * handles case where a token exists in the cookie and we want
 * to re-activate it within the application
 */
export function refreshUser(username: string, token: string): IAction {
  return {
    payload: { username, token },
    type: ACTIONS.REFRESH_USER,
  };
}

/**
 * Log the user out
 */
export function logout(): IAction {
  return {
    payload: null,
    type: ACTIONS.LOGOUT,
  };
}

/**
 * Clear all form errors for the login page
 */
export function resetLoginErrors(): IAction {
  return {
    payload: null,
    type: ACTIONS.RESET_LOGIN_ERRORS,
  };
}
