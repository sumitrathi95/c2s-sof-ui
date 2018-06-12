import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import { getRelatedPersonsSuccess, saveRelatedPersonsError } from './actions';
import { getRelatedPersons } from './api';
import { GET_RELATED_PERSONS } from './constants';

export function* getRelatedPersonSaga(action) {
  try {
    const patient = yield select(makeSelectPatient());
    if (!patient || !patient.id) {
      yield put(showNotification('No patient is selected.'));
    } else {
      const relatedPersons = yield call(getRelatedPersons, patient.id, action.showInActive, action.pageNumber);
      yield put(getRelatedPersonsSuccess(relatedPersons));
    }
  } catch (error) {
    yield put(showNotification('Error in getting related persons.'));
    yield put(saveRelatedPersonsError(error));
  }
}


export function* watchGetRelatedPersonsSaga() {
  yield takeLatest(GET_RELATED_PERSONS, getRelatedPersonSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetRelatedPersonsSaga(),
  ]);
}
