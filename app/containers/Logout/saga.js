import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { removeToken } from 'utils/tokenService';
import { showNotification } from 'containers/Notification/actions';
import { LOGIN_URL } from 'containers/App/constants';
import { LOGOUT } from './constants';

export function* logoutSaga({ config }) {
  try {
    yield call(removeToken);
    const authorizationServerEndpoint = config && config.oauth2 && config.oauth2.authorizationServerEndpoint;
    const baseHref = document.getElementsByTagName('base')[0].getAttribute('href');
    const { protocol, port, hostname } = location;
    setTimeout(() => {
      window.location = `${authorizationServerEndpoint}/logout.do?redirect=${protocol}//${hostname}${port ? `:${port}` : port}${baseHref}`;
    }, 0);
    yield put(push(LOGIN_URL));
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
