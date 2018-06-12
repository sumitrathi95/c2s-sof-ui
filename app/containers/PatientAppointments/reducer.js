/*
 *
 * PatientAppointments reducer
 *
 */

import { fromJS } from 'immutable';
import find from 'lodash/find';
import {
  ACCEPT_PATIENT_APPOINTMENT_SUCCESS,
  CANCEL_PATIENT_APPOINTMENT_SUCCESS,
  DATA,
  DECLINE_PATIENT_APPOINTMENT_SUCCESS,
  GET_PATIENT_APPOINTMENTS,
  GET_PATIENT_APPOINTMENTS_ERROR,
  GET_PATIENT_APPOINTMENTS_SUCCESS,
  LOADING,
  STATUS_CODE_CANCELLED,
  TENTATIVE_PATIENT_APPOINTMENT_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  query: null,
  showPastAppointments: false,
});

function patientAppointmentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENT_APPOINTMENTS:
      return state
        .set(LOADING, true)
        .set('showPastAppointments', action.query.showPastAppointments)
        .set(DATA, null);
    case GET_PATIENT_APPOINTMENTS_SUCCESS:
      return state
        .set(LOADING, false)
        .set(DATA, fromJS(action.patientAppointmentsPage || {}));
    case GET_PATIENT_APPOINTMENTS_ERROR:
      return state.set(LOADING, false);
    case CANCEL_PATIENT_APPOINTMENT_SUCCESS: {
      const data = state.get(DATA).toJS();
      find(data.elements, { logicalId: action.id }).statusCode = STATUS_CODE_CANCELLED;
      return state.set(DATA, fromJS(data));
    }
    case ACCEPT_PATIENT_APPOINTMENT_SUCCESS: {
      const data = state.get(DATA).toJS();
      return state.set(DATA, fromJS(data));
    }
    case DECLINE_PATIENT_APPOINTMENT_SUCCESS: {
      const data = state.get(DATA).toJS();
      return state.set(DATA, fromJS(data));
    }
    case TENTATIVE_PATIENT_APPOINTMENT_SUCCESS: {
      const data = state.get(DATA).toJS();
      return state.set(DATA, fromJS(data));
    }
    default:
      return state;
  }
}

export default patientAppointmentsReducer;
