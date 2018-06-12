// import { take, call, put, select } from 'redux-saga/effects';

import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_CONSENTS } from 'containers/Consents/constants';
import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { getConsentsError, getConsentsSuccess } from './actions';
import { getConsents, getErrorDetail } from './api';

/**
 * Root saga manages watcher lifecycle
 */
export function* getConsentsSaga({ pageNumber }) {
  try {
    let queryParams = {
      pageNumber,
    };
    const patient = yield select(makeSelectPatient());
    const practitioner = yield select(makeSelectUser());
    const patientId = patient ? patient.id : null;
    const practitionerId = (practitioner && practitioner.fhirResource) ? practitioner.fhirResource.logicalId : null;
    if (patientId && practitionerId) {
      queryParams = {
        pageNumber,
        patient: patientId,
        practitioner: practitionerId,
      };
    } else if (patientId) {
      queryParams = {
        pageNumber,
        patient: patientId,
      };
    } else if (practitionerId) {
      queryParams = {
        pageNumber,
        practitioner: practitionerId,
      };
    }

    const consents = yield call(getConsents, queryParams);
    yield put(getConsentsSuccess(consents));
  } catch (err) {
    yield put(getConsentsError(getErrorDetail(err)));
  }
}

export function* watchGetConsentsSaga() {
  yield takeLatest(GET_CONSENTS, getConsentsSaga);
}


export default function* rootSaga() {
  yield all([
    watchGetConsentsSaga(),
  ]);
}

