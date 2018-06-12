import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';

import { showNotification } from 'containers/Notification/actions';
import {
  getSearchAppointmentParticipantError,
  getSearchAppointmentParticipantSuccess,
} from 'containers/SearchAppointmentParticipant/actions';
import { searchAppointmentParticipant } from 'containers/SearchAppointmentParticipant/api';
import { SEARCH_APPOINTMENT_PARTICIPANT } from 'containers/SearchAppointmentParticipant/constants';
import { makeSelectPatient } from 'containers/App/contextSelectors';

export function* searchAppointmentParticipantSaga(action) {
  const patient = yield select(makeSelectPatient());
  try {
    if (!isEmpty(action.member) && !isEmpty(patient) && !isEmpty(patient.id)) {
      const participants = yield call(searchAppointmentParticipant, action.name, action.member, patient.id);
      yield put(getSearchAppointmentParticipantSuccess(participants));
    }
  } catch (error) {
    yield put(showNotification('No participant found'));
    yield put(getSearchAppointmentParticipantError(error));
  }
}

export function* watchSearchAppointmentParticipantSaga() {
  yield takeLatest(SEARCH_APPOINTMENT_PARTICIPANT, searchAppointmentParticipantSaga);
}

export default function* rootSaga() {
  yield all([
    watchSearchAppointmentParticipantSaga(),
  ]);
}
