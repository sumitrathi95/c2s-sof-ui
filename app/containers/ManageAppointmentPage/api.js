import { isEmpty } from 'lodash';
import find from 'lodash/find';
import isUndefined from 'lodash/isUndefined';
import { BASE_APPOINTMENTS_API_URL, getEndpoint } from 'utils/endpointService';
import request from 'utils/request';

const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
const headers = {
  'Content-Type': 'application/json',
};

export function saveAppointment(appointmentFormData) {
  if (appointmentFormData.appointmentId) {
    return updateAppointment(appointmentFormData);
  }
  return createAppointment(appointmentFormData);
}

export function getAppointmentApi(appointmentId) {
  const requestURL = `${baseEndpoint}/${appointmentId}`;
  return request(requestURL);
}

export function getAppointmentById(appointments, appointmentId) {
  if (!isEmpty(appointments)) {
    return find(appointments, { logicalId: appointmentId });
  }
  return null;
}

export function createAppointment(appointmentFormData) {
  const requestUrl = `${baseEndpoint}`;
  const body = JSON.stringify(mapToBackendAppointment(appointmentFormData, true));
  return request(requestUrl, {
    method: 'POST',
    headers,
    body,
  });
}

function updateAppointment(appointmentFormData) {
  const appointmentId = appointmentFormData.appointmentId;
  const requestURL = `${baseEndpoint}/${appointmentId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBackendAppointment(appointmentFormData, false)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBackendAppointment(appointmentFormData, isCreate) {
  const { appointmentStatus, appointmentType, date, description, startTime, endTime, participants, patientId, patientName, practitionerId, practitionerName } = appointmentFormData;
  const appointmentDataToSubmit = {};
  if (!isUndefined(description)) {
    appointmentDataToSubmit.description = description;
  }

  if (!isUndefined(appointmentType)) {
    appointmentDataToSubmit.typeCode = appointmentType;
  }

  if (!isUndefined(date) && !isUndefined(startTime)) {
    appointmentDataToSubmit.start = getDateTimeString(date, startTime);
  }
  if (!isUndefined(date) && !isUndefined(endTime)) {
    appointmentDataToSubmit.end = getDateTimeString(date, endTime);
  }

  // Participants
  if (!isUndefined(participants) && !isEmpty(participants)) {
    appointmentDataToSubmit.participant = mapToBffParticipants(participants);
  }

  if (isCreate) {
    appointmentDataToSubmit.creatorReference = `Practitioner/${practitionerId}`;
    appointmentDataToSubmit.creatorName = practitionerName;

    const patientParticipant = [];
    const patientReference = `Patient/${patientId}`;
    patientParticipant.push({
      actorReference: patientReference,
      actorName: patientName,
    });
    if (!isUndefined(appointmentDataToSubmit.participant) && !isEmpty(appointmentDataToSubmit.participant)) {
      patientParticipant.map((participant) => appointmentDataToSubmit.participant.push(participant));
    } else {
      appointmentDataToSubmit.participant = patientParticipant;
    }
  } else {
    appointmentDataToSubmit.statusCode = appointmentStatus;
  }

  return appointmentDataToSubmit;
}

function mapToBffParticipants(participants) {
  if (!isEmpty(participants)) {
    return participants
      .map((participant) => ({
        participationTypeCode: participant.participationType.code,
        participationTypeDisplay: participant.participationType.display,
        participationTypeSystem: participant.participationType.system,
        participantRequiredCode: participant.required.code,
        participantRequiredDisplay: participant.required.display,
        participantRequiredSystem: participant.required.system,
        participationStatusCode: participant.status.code,
        participationStatusDisplay: participant.status.display,
        participationStatusSystem: participant.status.system,
        actorReference: `${participant.memberType}/${participant.memberId}`,
        actorName: participant.name,
      }));
  }
  return [];
}

export function mapToEditParticipants(participants) {
  if (!isEmpty(participants)) {
    return participants
      .map((participant) => ({
        participationType: {
          code: participant.participationTypeCode,
          display: participant.participationTypeDisplay,
        },
        required: {
          code: participant.participantRequiredCode,
          display: participant.participantRequiredCode,
        },
        status: {
          code: participant.participationStatusCode,
          display: participant.participationStatusCode,
        },
        memberType: participant.actorReference.substr(0, participant.actorReference.indexOf('/')),
        memberId: participant.actorReference.substr(participant.actorReference.indexOf('/') + 1),
        name: participant.actorName,
      }));
  }
  return [];
}

function toDoubleChars(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}

function getDateString(date) {
  if (!isUndefined(date)) {
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    // Note: 0=January, 1=February etc.
    const month = toDoubleChars(selectedDate.getMonth() + 1);
    const day = toDoubleChars(selectedDate.getDate());
    return `${year}-${month}-${day}`;
  }
  return null;
}

function getDateTimeString(date, time) {
  const appointmentDateString = getDateString(date);
  const hours = toDoubleChars(new Date(time).getHours());
  const minutes = toDoubleChars(new Date(time).getMinutes());
  return `${appointmentDateString}T${hours}:${minutes}:00.00`;
}

