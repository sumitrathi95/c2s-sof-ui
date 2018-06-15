// import { take, call, put, select } from 'redux-saga/effects';


import { goBack } from 'react-router-redux';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';
import { makeSelectUser } from 'containers/Context/selectors';
import { attestConsent, getConsent, verifyAttestor, verifyAttestorErrorDetail } from './api';
import {
  attestConsentError,
  checkPasswordError,
  checkPasswordSuccess,
  getConsentError,
  getConsentSuccess,
} from './actions';
import { ATTEST_CONSENT, CHECK_PASSWORD, GET_CONSENT } from './constants';


function* getConsentSaga({ logicalId }) {
  try {
    const consent = yield call(getConsent, logicalId);
    yield put(getConsentSuccess(consent));
  } catch (error) {
    yield put(showNotification('No matching practitioner found.'));
    yield put(goBack());
    yield put(getConsentError(error));
  }
}

function* checkPasswordSaga(action) {
  try {
    const user = yield select(makeSelectUser());
    const username = user.user_name;
    const password = action.password;
    yield call(verifyAttestor, { username, password });
    yield put(checkPasswordSuccess(true));
    yield call(action.handleSubmitting);
  } catch (error) {
    yield put(checkPasswordError(verifyAttestorErrorDetail(error)));
    yield put(showNotification('Failed to verify attestor.'));
    yield call(action.handleSubmitting);
  }
}

function* attestConsentSaga(action) {
  try {
    const consent = yield call(attestConsent, action.logicalId);
    yield put(getConsentSuccess(consent));
    yield put(showNotification('Successfully signed consent.'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification('Failed to sign consent.'));
    yield put(attestConsentError(error));
    yield call(action.handleSubmitting);
  }
}

function* watchGetConsentSaga() {
  yield takeLatest(GET_CONSENT, getConsentSaga);
}

function* watchAttestConsentSaga() {
  yield takeLatest(ATTEST_CONSENT, attestConsentSaga);
}

function* watchCheckPasswordSaga() {
  yield takeLatest(CHECK_PASSWORD, checkPasswordSaga);
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetConsentSaga(),
    watchAttestConsentSaga(),
    watchCheckPasswordSaga(),
  ]);
}
