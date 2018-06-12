import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_PATIENT_SEARCH_RESULT } from './constants';
import { searchPatientsError, searchPatientsSuccess } from './actions';
import searchPatients from './api';

export function* fetchSearchResult({ searchTerms, searchType, includeInactive, currentPage, organization }) {
  try {
    const searchPatientResult = yield call(searchPatients, searchTerms, searchType, includeInactive, currentPage, organization);
    yield put(searchPatientsSuccess(searchPatientResult, searchTerms, searchType, includeInactive));
  } catch (error) {
    yield put(searchPatientsError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchFetchPatients() {
  yield takeLatest(LOAD_PATIENT_SEARCH_RESULT, fetchSearchResult);
}
