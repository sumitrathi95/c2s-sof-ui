/*
 *
 * Context reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CLEAR_ALL,
  CLEAR_ORGANIZATION,
  CLEAR_PATIENT,
  CLEAR_USER,
  GET_ORGANIZATION_ERROR,
  GET_PATIENT_ERROR,
  SET_ORGANIZATION,
  SET_PATIENT,
  SET_USER,
} from './contextConstants';


const initialState = fromJS({
  user: null,
  patient: null,
  organization: null,
});

function contextReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT_ERROR:
      return state.setIn(['error', 'patient'], fromJS(action.error));
    case GET_ORGANIZATION_ERROR:
      return state.setIn(['error', 'organization'], fromJS(action.error));
    case SET_PATIENT:
      return state.set('patient', fromJS(action.patient));
    case SET_USER:
      return state.set('user', fromJS(action.user));
    case SET_ORGANIZATION:
      return state.set('organization', fromJS(action.organization));
    case CLEAR_PATIENT:
      return state.set('patient', fromJS(null));
    case CLEAR_USER:
      return state.set('user', fromJS(null));
    case CLEAR_ORGANIZATION:
      return state.set('organization', fromJS(null));
    case CLEAR_ALL:
      return fromJS(initialState.toJS());
    default:
      return state;
  }
}

export default contextReducer;
