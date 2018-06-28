import { goBack } from 'react-router-redux';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { verifyAttestor, verifyAttestorErrorDetail } from 'containers/AttestConsentPage/api';
import { getConsent, revokeConsent } from './api';
import { checkPasswordError, checkPasswordSuccess, getConsentError, getConsentSuccess, revokeConsentError } from './actions';
import { CHECK_PASSWORD, GET_CONSENT, REVOKE_CONSENT } from './constants';


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
    yield put(showNotification('Failed to login.'));
    yield call(action.handleSubmitting);
  }
}

function* revokeConsentSaga(action) {
  try {
    const consent = yield call(revokeConsent, action.logicalId);
    yield put(getConsentSuccess(consent));
    yield put(showNotification('Successfully revoke the consent.'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification('Failed to revoke consent.'));
    yield put(revokeConsentError(error));
    yield call(action.handleSubmitting);
  }
}

function* watchGetConsentSaga() {
  yield takeLatest(GET_CONSENT, getConsentSaga);
}

function* watchRevokeConsentSaga() {
  yield takeLatest(REVOKE_CONSENT, revokeConsentSaga);
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
    watchRevokeConsentSaga(),
    watchCheckPasswordSaga(),
  ]);
}
