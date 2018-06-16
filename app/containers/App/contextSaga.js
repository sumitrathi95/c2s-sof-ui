import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import {
  getOrganization as getOrganizationAction,
  getOrganizationError,
  getPatient as getPatientAction,
  getPatientError,
  getUserContextError,
  refreshOrganization,
  refreshPatient,
  setOrganization,
  setPatient,
  setUser,
} from './contextActions';
import {
  GET_ORGANIZATION,
  GET_PATIENT,
  INITIALIZE_CONTEXT,
  REFRESH_ORGANIZATION,
  REFRESH_PATIENT,
} from './contextConstants';
import { makeSelectOrganization, makeSelectPatient } from './contextSelectors';
import { getErrorDetail, getOrganization, getPatient, getUserContext } from './contextApi';


export function* initializeContextSaga({ userAuthContext, patientId, organizationId }) {
  const patient = yield select(makeSelectPatient());
  const organization = yield select(makeSelectOrganization());
  if (patient && patient.id && patient.id === patientId) {
    yield put(refreshPatient());
  } else {
    yield put(getPatientAction(patientId));
  }

  if (organization && organization.logicalId && organization.logicalId === organizationId) {
    yield put(refreshOrganization());
  } else {
    yield put(getOrganizationAction(organizationId));
  }

  try {
    const userContext = yield call(getUserContext);
    const { fhirResource } = userContext;
    const { user_id, user_name, email, ext_attr } = userAuthContext;
    yield put(setUser({ user_id, user_name, email, ext_attr, fhirResource }));
  } catch (error) {
    yield put(getUserContextError(getErrorDetail(error)));
  }
}

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
  try {
    if (logicalId) {
      const newPatient = yield call(getPatient, logicalId);
      yield put(setPatient(newPatient));
    } else {
      yield put(showNotification('Cannot get patient context, no patient is selected.'));
    }
  } catch (error) {
    yield put(getPatientError(getErrorDetail(error)));
  }
}

export function* getOrganizationSaga({ logicalId }) {
  try {
    if (logicalId) {
      const newOrganization = yield call(getOrganization, logicalId);
      yield put(setOrganization(newOrganization));
    } else {
      yield put(showNotification('Cannot get organization context, no organization is selected.'));
    }
  } catch (error) {
    yield put(getOrganizationError(getErrorDetail(error)));
  }
}

export function* watchInitializeContextSaga() {
  yield takeLatest(INITIALIZE_CONTEXT, initializeContextSaga);
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
    watchInitializeContextSaga(),
    watchRefreshPatientSaga(),
    watchRefreshOrganizationSaga(),
    watchGetPatientSaga(),
    watchGetOrganizationSaga(),
  ]);
}
