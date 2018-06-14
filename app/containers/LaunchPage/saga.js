import { all, call, takeLatest } from 'redux-saga/effects';
import jp from 'jsonpath';

import request from 'utils/request';
import Util from 'utils/Util';
import LaunchService from 'utils/LaunchService';
import { GET_METADATA } from './constants';

export function* getMetadataSaga({ iss, launch }) {
  LaunchService.clear();
  const state = yield call(Util.randomString, 10);
  const metadata = yield call(request, `${iss}/metadata`);
  const extensions = jp.query(metadata, '$.rest[?(@.mode=="server")].security.extension[?(@.url=="http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris")].extension');
  const authorize = jp.query(extensions, '$..[?(@.url=="authorize")].valueUri').pop();
  const token = jp.query(extensions, '$..[?(@.url=="token")].valueUri').pop();

  // TODO: remove console.log
  console.log('metadata', metadata);
  console.log('extensions', extensions);
  console.log('authorize', authorize);
  console.log('token', token);

  LaunchService.saveLaunchState(state, authorize, token);

  // TODO: get hardcoded parameters from the configured backend
  const c2sClientId = 'c2s';
  const c2sScopes = 'patient/Patient.read patient/Consent.* launch launch/organization launch/patient openid profile';
  const c2sRedirectUri = 'http://localhost:9000';
  const url = `${authorize}?client_id=${c2sClientId}&response_type=code&scope=${c2sScopes}&redirect_uri=${c2sRedirectUri}&state=${state}&aud=${iss}&launch=${launch}`;
  window.location = encodeURI(url);
}

export function* watchGetMetadataSaga() {
  yield takeLatest(GET_METADATA, getMetadataSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetMetadataSaga(),
  ]);
}
