import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import AuthReducer from './auth_reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  router: routerReducer,
});

export default rootReducer;
