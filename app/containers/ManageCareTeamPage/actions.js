/*
 *
 * ManageCareTeamPage actions
 *
 */

import {
  GET_CARE_TEAM,
  GET_CARE_TEAM_SUCCESS,
  INITIALIZE_MANAGE_CARE_TEAM,
  SAVE_CARE_TEAM,
} from './constants';

export function initializeManageCareTeam() {
  return {
    type: INITIALIZE_MANAGE_CARE_TEAM,
  };
}

export function getCareTeam(careTeamId) {
  return {
    type: GET_CARE_TEAM,
    careTeamId,
  };
}

export function getCareTeamSuccess(careTeam) {
  return {
    type: GET_CARE_TEAM_SUCCESS,
    careTeam,
  };
}

export function saveCareTeam(careTeamFormData, handleSubmitting) {
  return {
    type: SAVE_CARE_TEAM,
    careTeamFormData,
    handleSubmitting,
  };
}
