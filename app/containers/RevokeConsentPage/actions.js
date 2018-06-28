/*
 *
 * RevokeConsentPage actions
 *
 */

import {
  REVOKE_CONSENT,
  REVOKE_CONSENT_ERROR,
  REVOKE_CONSENT_SUCCESS,
  CHECK_PASSWORD,
  CHECK_PASSWORD_ERROR,
  CHECK_PASSWORD_SUCCESS,
  GET_CONSENT,
  GET_CONSENT_ERROR,
  GET_CONSENT_SUCCESS,
  INITIALIZE_REVOKE_CONSENT,
} from './constants';

export function initializeRevokeConsentPage() {
  return {
    type: INITIALIZE_REVOKE_CONSENT,
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

export function revokeConsent(logicalId, handleSubmitting) {
  return {
    type: REVOKE_CONSENT,
    logicalId,
    handleSubmitting,
  };
}

export function revokeConsentSuccess() {
  return {
    type: REVOKE_CONSENT_SUCCESS,
  };
}

export function revokeConsentError(error) {
  return {
    type: REVOKE_CONSENT_ERROR,
    error,
  };
}
