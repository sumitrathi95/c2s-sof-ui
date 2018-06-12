import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';

import { showNotification } from '../Notification/actions';
import { GET_CARE_TEAM, SAVE_CARE_TEAM } from './constants';
import { getCareTeamSuccess } from './actions';
import makeSelectCareTeams from '../CareTeams/selectors';
import { determineNotificationForSavingCareTeam, getCareTeam, getCareTeamById, saveCareTeam } from './api';

function* getCareTeamSaga({ careTeamId }) {
  try {
    let careTeam;
    // Load careTeams from store
    const careTeamsSelector = yield select(makeSelectCareTeams());
    const careTeams = careTeamsSelector && careTeamsSelector.data && careTeamsSelector.data.elements;
    careTeam = getCareTeamById(careTeams, careTeamId);
    // fetch from backend if cannot find care team from store
    if (isEmpty(careTeam)) {
      careTeam = yield call(getCareTeam, careTeamId);
    }
    yield put(getCareTeamSuccess(careTeam));
  } catch (error) {
    yield put(showNotification('No match care team found.'));
    yield put(goBack());
  }
}

function* saveCareTeamSaga(action) {
  try {
    yield call(saveCareTeam, action.careTeamFormData);
    yield put(showNotification(`Successfully ${determineNotificationForSavingCareTeam(action.careTeamFormData)} the care team.`));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to ${determineNotificationForSavingCareTeam(action.careTeamFormData)} the care team.`));
    yield call(action.handleSubmitting);
  }
}

function* watchGetCareTeamSaga() {
  yield takeLatest(GET_CARE_TEAM, getCareTeamSaga);
}

function* watchManageCareTeamSaga() {
  yield takeLatest(SAVE_CARE_TEAM, saveCareTeamSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetCareTeamSaga(),
    watchManageCareTeamSaga(),
  ]);
}
