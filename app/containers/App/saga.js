import { all, call, put, takeEvery } from 'redux-saga/effects';

import { getLookupTypesNotInStore } from 'utils/LookupService';
import { fetchLookups } from './api';
import { GET_LOOKUPS } from './constants';
import { getLookupsError, getLookupsFromStore, getLookupsSuccess } from './actions';
import contextRootSaga from './contextSaga';

export function* getLookups(action) {
  try {
    const lookupTypesNotInStore = yield getLookupTypesNotInStore(action);
    if (lookupTypesNotInStore.length > 0) {
      const lookups = yield call(fetchLookups, lookupTypesNotInStore);
      yield put(getLookupsSuccess(lookups));
    } else {
      yield put(getLookupsFromStore());
    }
  } catch (err) {
    yield put(getLookupsError(err));
  }
}

export function* watchGetLookupsSaga() {
  yield takeEvery(GET_LOOKUPS, getLookups);
}

export default function* rootSaga() {
  yield all([
    watchGetLookupsSaga(),
    // TODO: further investigate why contextRootSaga cannot be injected within App.js
    contextRootSaga(),
  ]);
}
