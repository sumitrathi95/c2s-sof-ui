/*
 *
 * RevokeConsentPage reducer
 *
 */


import { fromJS } from 'immutable';
import { CHECK_PASSWORD_ERROR, CHECK_PASSWORD_SUCCESS, GET_CONSENT_ERROR, GET_CONSENT_SUCCESS, INITIALIZE_REVOKE_CONSENT } from './constants';

const initialState = fromJS({
  error: false,
  consent: null,
  isAuthenticated: false,
});

function RevokeConsentPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_REVOKE_CONSENT:
      return initialState;
    case GET_CONSENT_SUCCESS:
      return state
        .set('consent', action.consent);
    case GET_CONSENT_ERROR:
      return state
        .set('error', action.error);
    case CHECK_PASSWORD_SUCCESS:
      return state
        .set('isAuthenticated', true);
    case CHECK_PASSWORD_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default RevokeConsentPageReducer;

