import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { setOrganization, setPatient } from './actions';
import { GET_ORGANIZATION, GET_PATIENT, REFRESH_ORGANIZATION, REFRESH_PATIENT } from './constants';
import { makeSelectOrganization, makeSelectPatient } from './selectors';
import { getOrganization, getPatient } from './api';

export function* refreshPatientSaga() {
  const patient = yield select(makeSelectPatient());
  if (patient && patient.id) {
    const newPatient = yield call(getPatient, patient.id);
    yield put(setPatient(newPatient));
  } else {
    yield put(showNotification('Cannot refresh patient context, no patient is selected.'));
  }
}

export function* refreshOrganizationSaga() {
  const organization = yield select(makeSelectOrganization());
  if (organization && organization.logicalId) {
    const newOrganization = yield call(getOrganization, organization.logicalId);
    yield put(setOrganization(newOrganization));
  } else {
    yield put(showNotification('Cannot refresh organization context, no organization is selected.'));
  }
}

export function* getPatientSaga({ logicalId }) {
  if (logicalId) {
    const newPatient = yield call(getPatient, logicalId);
    yield put(setPatient(newPatient));
  } else {
    yield put(showNotification('Cannot get patient context, no patient is selected.'));
  }
}

export function* getOrganizationSaga({ logicalId }) {
  if (logicalId) {
    const newOrganization = yield call(getOrganization, logicalId);
    yield put(setOrganization(newOrganization));
  } else {
    yield put(showNotification('Cannot get organization context, no organization is selected.'));
  }
}

export function* watchRefreshPatientSaga() {
  yield takeLatest(REFRESH_PATIENT, refreshPatientSaga);
}

export function* watchRefreshOrganizationSaga() {
  yield takeLatest(REFRESH_ORGANIZATION, refreshOrganizationSaga);
}

export function* watchGetPatientSaga() {
  yield takeLatest(GET_PATIENT, getPatientSaga);
}

export function* watchGetOrganizationSaga() {
  yield takeLatest(GET_ORGANIZATION, getOrganizationSaga);
}

export default function* rootSaga() {
  yield all([
    watchRefreshPatientSaga(),
    watchRefreshOrganizationSaga(),
    watchGetPatientSaga(),
    watchGetOrganizationSaga(),
  ]);
}
