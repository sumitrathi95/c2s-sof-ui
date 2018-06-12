/*
 *
 * ManageCareTeamPage reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_CARE_TEAM_SUCCESS, INITIALIZE_MANAGE_CARE_TEAM } from './constants';

const initialState = fromJS({
  patient: null,
  careTeam: null,
});

function manageCareTeamPageReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_MANAGE_CARE_TEAM:
      return initialState;
    case GET_CARE_TEAM_SUCCESS:
      return state
        .set('careTeam', action.careTeam);
    default:
      return state;
  }
}

export default manageCareTeamPageReducer;
