import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import get from 'lodash/get';
import queryString from 'query-string';
import jwt from 'jsonwebtoken';

import request from 'utils/request';
import Util from 'utils/Util';
import { storeToken } from 'utils/tokenService';
import LaunchService from 'utils/LaunchService';
import { initializeContext } from 'containers/App/contextActions';
import { GET_TOKEN } from './constants';

export function* getTokenSaga({ code, state, config }) {
  if (!LaunchService.verifyLaunchState(state)) {
    yield put(push('/c2s-sof-ui/error?code=invalidState'));
  } else {
    const launchState = LaunchService.getLaunchState(state);
    const tokenEndpoint = get(launchState, 'token');
    if (!tokenEndpoint) {
      yield put(push('/c2s-sof-ui/error?code=invalidState&details=Token endpoint not found.'));
    } else {
      const { grantType, redirectUri, clientId } = config;
      if (Util.hasText(grantType) && Util.hasText(redirectUri) && Util.hasText(clientId)) {
        const headers = {
          'Content-Type': 'application/json',
        };
        const query = queryString.stringify({
          grant_type: grantType,
          code,
          client_id: clientId,
          redirect_uri: redirectUri,
        });
        const options = {
          method: 'POST',
          headers,
        };
        try {
          const tokenResponse = yield call(request, `${tokenEndpoint}?${query}`, options);
          const { organization, patient, access_token } = tokenResponse;
          const { user_id } = jwt.decode(access_token);
          storeToken(tokenResponse);
          yield put(initializeContext(user_id, patient, organization));
          yield put(push('/c2s-sof-ui'));
        } catch (error) {
          yield put(push('/c2s-sof-ui/error?code=tokenRetrieveFailed'));
        }
      } else {
        const missingConfig = [];
        if (!Util.hasText(clientId)) {
          missingConfig.push('client_id');
        }
        if (!Util.hasText(grantType)) {
          missingConfig.push('grant_type');
        }
        if (!Util.hasText(redirectUri)) {
          missingConfig.push('redirect_uri');
        }
        yield put(push(`/c2s-sof-ui/error?code=missingConfig&details=${missingConfig.join(', ')}`));
      }
    }
  }
}

export function* watchGetTokenSaga() {
  yield takeLatest(GET_TOKEN, getTokenSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetTokenSaga(),
  ]);
}
