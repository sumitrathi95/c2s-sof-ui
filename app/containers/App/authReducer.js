/*
 *
 * authReducer
 *
 */

import { fromJS } from 'immutable';
import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from '../LoginPage/constants';
import { LOGOUT } from '../Logout/constants';
import { checkAuthenticated } from '../../utils/auth';

const initialState = fromJS({
  isAuthenticating: false,
  isAuthenticated: checkAuthenticated(),
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state.set('isAuthenticating', true);
    case LOGIN_SUCCESS:
      return state
        .set('isAuthenticating', false)
        .set('isAuthenticated', action.isAuthenticated);
    case LOGIN_ERROR:
      return state
        .set('isAuthenticating', false)
        .set('isAuthenticated', false)
        .set('error', action.error);
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
