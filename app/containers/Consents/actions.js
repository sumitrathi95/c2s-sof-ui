/*
 *
 * Consents actions
 *
 */

import {
  GET_CONSENTS,
  GET_CONSENTS_ERROR,
  GET_CONSENTS_SUCCESS,
  INITIALIZE_CONSENTS,
} from 'containers/Consents/constants';

export function initializeConsents(consents) {
  return {
    type: INITIALIZE_CONSENTS,
    consents,
  };
}

export function getConsents(pageNumber) {
  return {
    type: GET_CONSENTS,
    pageNumber,
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
