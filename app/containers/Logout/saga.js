import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { removeToken } from 'utils/tokenService';
import { clearAll } from 'containers/App/contextActions';
import { showNotification } from 'containers/Notification/actions';
import { LOGOUT } from './constants';

export function* logoutSaga() {
  try {
    yield call(clearAll);
    yield call(removeToken);
    yield put(push('/c2s-sof-ui/logout'));
  } catch (error) {
    yield put(showNotification('Failed to logout.'));
    throw error;
  }
}

export function* watchLogoutSaga() {
  yield takeLatest(LOGOUT, logoutSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchLogoutSaga(),
  ]);
}
