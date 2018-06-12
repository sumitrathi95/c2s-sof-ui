/*
 *
 * AttestConsentPage actions
 *
 */

import {
  ATTEST_CONSENT,
  ATTEST_CONSENT_ERROR,
  ATTEST_CONSENT_SUCCESS,
  CHECK_PASSWORD,
  CHECK_PASSWORD_ERROR,
  CHECK_PASSWORD_SUCCESS,
  GET_CONSENT,
  GET_CONSENT_ERROR,
  GET_CONSENT_SUCCESS,
  INITIALIZE_ATTEST_CONSENT,
} from './constants';

export function initializeAttestConsentPage() {
  return {
    type: INITIALIZE_ATTEST_CONSENT,
  };
}


export function getConsent(logicalId) {
  return {
    type: GET_CONSENT,
    logicalId,
  };
}

export function getConsentSuccess(consent) {
  return {
    type: GET_CONSENT_SUCCESS,
    consent,
  };
}

export function getConsentError(error) {
  return {
    type: GET_CONSENT_ERROR,
    error,
  };
}

export function checkPassword(password, handleSubmitting) {
  return {
    type: CHECK_PASSWORD,
    password,
    handleSubmitting,
  };
}

export function checkPasswordSuccess(isAuthenticated) {
  return {
    type: CHECK_PASSWORD_SUCCESS,
    isAuthenticated,
  };
}

export function checkPasswordError(error) {
  return {
    type: CHECK_PASSWORD_ERROR,
    error,
  };
}

export function attestConsent(logicalId, handleSubmitting) {
  return {
    type: ATTEST_CONSENT,
    logicalId,
    handleSubmitting,
  };
}

export function attestConsentSuccess() {
  return {
    type: ATTEST_CONSENT_SUCCESS,
  };
}

export function attestConsentError(error) {
  return {
    type: ATTEST_CONSENT_ERROR,
    error,
  };
}
