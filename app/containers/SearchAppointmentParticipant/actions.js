/*
 *
 * SearchAppointmentParticipant actions
 *
 */


import {
  ADD_APPOINTMENT_PARTICIPANT,
  INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT,
  INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT_RESULT,
  REMOVE_APPOINTMENT_PARTICIPANT,
  SEARCH_APPOINTMENT_PARTICIPANT,
  SEARCH_APPOINTMENT_PARTICIPANT_ERROR,
  SEARCH_APPOINTMENT_PARTICIPANT_SUCCESS,
} from './constants';

export function getAppointmentSearchParticipant(name, member) {
  return {
    type: SEARCH_APPOINTMENT_PARTICIPANT,
    name,
    member,
  };
}

export function addAppointmentParticipants(participants) {
  return {
    type: ADD_APPOINTMENT_PARTICIPANT,
    participants,
  };
}


export function getSearchAppointmentParticipantSuccess(searchParticipantResults) {
  return {
    type: SEARCH_APPOINTMENT_PARTICIPANT_SUCCESS,
    searchParticipantResults,
  };
}

export function getSearchAppointmentParticipantError(error) {
  return {
    type: SEARCH_APPOINTMENT_PARTICIPANT_ERROR,
    error,
  };
}

export function initializeSearchAppointmentParticipant(initialSelectedParticipants) {
  return {
    type: INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT,
    initialSelectedParticipants,
  };
}

export function removeAppointmentParticipant(participant) {
  return {
    type: REMOVE_APPOINTMENT_PARTICIPANT,
    participant,
  };
}

export function initializeSearchAppointmentParticipantResult() {
  return {
    type: INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT_RESULT,
  };
}
