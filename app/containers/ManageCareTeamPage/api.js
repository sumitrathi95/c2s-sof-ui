import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import request from '../../utils/request';
import { mapParticipantName } from '../../utils/CareTeamUtils';
import { BASE_CARE_TEAMS_API_URL, getEndpoint } from '../../utils/endpointService';

const baseEndpoint = getEndpoint(BASE_CARE_TEAMS_API_URL);

export function saveCareTeam(careTeamFormData) {
  if (careTeamFormData.careTeamId) {
    return updateCareTeam(careTeamFormData);
  }
  return createCareTeam(careTeamFormData);
}

export function determineNotificationForSavingCareTeam(careTeamFormData) {
  let action = 'create';
  if (careTeamFormData.careTeamId) {
    action = 'edit';
  }
  return action;
}

export function getCareTeamById(careTeams, careTeamId) {
  if (!isEmpty(careTeams)) {
    return find(careTeams, { id: careTeamId });
  }
  return null;
}

export function getCareTeam(careTeamId) {
  const requestURL = `${baseEndpoint}/${careTeamId}`;
  return request(requestURL);
}

export function mapToEditParticipants(participants) {
  if (!isEmpty(participants)) {
    return participants
      .map((participant) => ({
        roleCode: participant.roleCode,
        memberId: participant.memberId,
        roleDisplay: participant.roleDisplay,
        memberType: participant.memberType,
        startDate: participant.startDate,
        endDate: participant.endDate,
        name: mapParticipantName(participant),
      }));
  }
  return [];
}

function createCareTeam(careTeamFormData) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBffCareTeam(careTeamFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function updateCareTeam(careTeamFormData) {
  const careTeamId = careTeamFormData.careTeamId;
  const requestURL = `${baseEndpoint}/${careTeamId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBffCareTeam(careTeamFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBffCareTeam(careTeamData) {
  const {
    careTeamName, category, patientId, status, startDate, endDate, reason, participants, managingOrganization,
  } = careTeamData;

  return {
    name: careTeamName,
    statusCode: status,
    categoryCode: category,
    subjectId: patientId,
    startDate: startDate.toLocaleDateString(),
    endDate: endDate.toLocaleDateString(),
    reasonCode: reason,
    managingOrganization,
    participants: mapToBffParticipants(participants),
  };
}

function mapToBffParticipants(participants) {
  if (!isEmpty(participants)) {
    return participants
      .map((participant) => ({
        roleCode: participant.roleCode,
        memberId: participant.memberId,
        memberType: participant.memberType,
        startDate: participant.startDate,
        endDate: participant.endDate,
      }));
  }
  return [];
}
