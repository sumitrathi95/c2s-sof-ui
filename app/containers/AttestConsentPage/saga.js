// import { take, call, put, select } from 'redux-saga/effects';


import { goBack } from 'react-router-redux';
import { call, put, takeLatest, all, select } from 'redux-saga/effects';

import { getLoginErrorDetail, login } from 'containers/LoginPage/api';
import { showNotification } from 'containers/Notification/actions';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { getConsent, attestConsent } from './api';
import { getConsentError, getConsentSuccess, checkPasswordError, attestConsentError, checkPasswordSuccess } from './actions';
import { GET_CONSENT, CHECK_PASSWORD, ATTEST_CONSENT } from './constants';


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
    yield call(login, { username, password });
    yield put(checkPasswordSuccess(true));
    yield call(action.handleSubmitting);
  } catch (error) {
    yield put(checkPasswordError(getLoginErrorDetail(error)));
    yield put(showNotification('Failed to login.'));
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
