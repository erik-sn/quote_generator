import {} from 'react-router-redux';

export interface IDictionary<K, V> {
  key: K;
  value: V;
}

export interface IQuote {
  id: number;
  content?: string;
  link?: string;
  title: string;
  text: string;
}

/** Redux interfaces */
export interface IReduxStore {
  auth: IAuth;
  router: IRouter;
}

export interface IAuth {
  errors: ILoginErrors;
  token: string;
  username: string;
}

export interface IAction {
  data?: any;
  error?: boolean;
  payload: any;
  type: string;
  meta?: any;
}

export interface ILoginErrors {
  username?: string[];
  password?: string[];
  non_field_errors?: string[];
}

/* Router */
interface IRouterLocation {
  hash: string;
  key: string;
  pathname: string;
  search: string;
}

interface IRouter {
  location: IRouterLocation;
}
