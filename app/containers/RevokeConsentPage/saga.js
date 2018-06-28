import { goBack } from 'react-router-redux';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { getConsent, revokeConsent } from './api';
import { getConsentError, getConsentSuccess, revokeConsentError } from './actions';
import { GET_CONSENT, REVOKE_CONSENT } from './constants';


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

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetConsentSaga(),
    watchRevokeConsentSaga(),
  ]);
}
