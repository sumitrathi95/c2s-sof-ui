import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import jwt from 'jsonwebtoken';
import find from 'lodash/find';

import { removeToken, storeAuthStatus, storeToken } from 'utils/tokenService';
import { checkAuthenticated } from 'utils/auth';
import { showNotification } from 'containers/Notification/actions';
import { autologin } from 'containers/Authentication/actions';
import { makeSelectLocation } from 'containers/App/selectors';
import { setOrganization, setPatient, setUser } from 'containers/App/contextActions';
import { getLinkUrlByRole, getRoleByScope } from 'containers/App/helpers';
import { OCP_ADMIN_ROLE_CODE, PATIENT_ROLE_CODE } from 'containers/App/constants';
import { getLoginErrorDetail, getUserContext, login } from './api';
import { loginError, loginSuccess } from './actions';
import { LOGIN } from './constants';

function* loginSaga(loginAction) {
  try {
    const loginResponse = yield call(login, loginAction.loginCredentials);
    const { authData, autologin: { code } } = loginResponse;
    const { user_id, user_name, email, scope, ext_attr } = yield call(jwt.decode, authData.access_token);
    const roleScope = find(scope, (s) => (s.startsWith('ocp.role') && !s.startsWith('ocp.role.smart')));
    const userRole = yield call(getRoleByScope, roleScope);
    yield put(setUser({ user_id, user_name, email, scope, ext_attr, role: userRole }));

    yield call(storeToken, authData);
    yield call(storeAuthStatus, true);
    const isAuthenticated = yield call(checkAuthenticated);
    if (!isAuthenticated) {
      yield put(showNotification('Access is denied.'));
      yield call(removeToken);
    }
    yield put(loginSuccess(isAuthenticated));

    // Retrieving user fhirResource and organization details
    if (userRole !== OCP_ADMIN_ROLE_CODE) {
      const userContext = yield call(getUserContext);
      const { fhirResource, organization } = userContext;
      yield put(setUser({ user_id, user_name, email, scope, ext_attr, fhirResource, role: userRole }));
      yield put(setOrganization(organization));
      if (userRole === PATIENT_ROLE_CODE) {
        yield put(setPatient(fhirResource));
      }
    }
    // Handle submitting event until finishing all backend call
    yield call(loginAction.handleSubmitting);

    // Redirect to referrer address
    const location = yield select(makeSelectLocation());
    const linkUrl = yield call(getLinkUrlByRole, userRole);
    const { from } = location.state || { from: { pathname: linkUrl } };
    yield all([
      put(push(from)),
      put(autologin(code)),
    ]);
  } catch (error) {
    yield put(loginError(getLoginErrorDetail(error)));
    yield put(showNotification('Failed to login.'));
    yield call(loginAction.handleSubmitting);
  }
}

function* watchLoginSaga() {
  yield takeLatest(LOGIN, loginSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchLoginSaga(),
  ]);
}
