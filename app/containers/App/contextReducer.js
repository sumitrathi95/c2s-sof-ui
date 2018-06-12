/*
 *
 * Context reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CLEAR_ALL,
  CLEAR_ORGANIZATION,
  CLEAR_LOCATION,
  CLEAR_PATIENT,
  CLEAR_USER,
  SET_ORGANIZATION,
  SET_LOCATION,
  SET_PATIENT,
  SET_USER,
} from './contextConstants';

const initialState = fromJS({
  user: null,
  organization: null,
  location: null,
  patient: null,
});

function contextReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PATIENT:
      return state.set('patient', fromJS(action.patient));
    case SET_ORGANIZATION:
      return state
        .set('location', state.getIn(['organization', 'logicalId']) === action.organization.logicalId ? state.get('location') : fromJS(null))
        .set('organization', fromJS(action.organization));
    case SET_LOCATION:
      return state.set('location', fromJS(action.location));
    case SET_USER:
      return state.set('user', fromJS(action.user));
    case CLEAR_PATIENT:
      return state.set('patient', fromJS(null));
    case CLEAR_ORGANIZATION:
      return state
        .set('organization', fromJS(null))
        .set('location', fromJS(null));
    case CLEAR_LOCATION:
      return state.set('location', fromJS(null));
    case CLEAR_USER:
      return state.set('user', fromJS(null));
    case CLEAR_ALL:
      return fromJS(initialState.toJS());
    default:
      return state;
  }
}

export default contextReducer;
