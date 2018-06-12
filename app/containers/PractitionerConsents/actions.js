/*
 *
 * PractitionerConsents actions
 *
 */

import { INITIALIZE_CONSENTS,
  GET_CONSENTS,
  GET_CONSENTS_ERROR,
  GET_CONSENTS_SUCCESS } from './constants';

export function initializeConsents(consents) {
  return {
    type: INITIALIZE_CONSENTS,
    consents,
  };
}

export function getConsents(query) {
  return {
    type: GET_CONSENTS,
    query,
  };
}

export function getConsentsSuccess(consents) {
  return {
    type: GET_CONSENTS_SUCCESS,
    consents,
  };
}

export function getConsentsError(error) {
  return {
    type: GET_CONSENTS_ERROR,
    error,
  };
}
