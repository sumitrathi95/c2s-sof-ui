/*
 *
 * Patients actions
 *
 */

import {
  INITIALIZE_PATIENTS,
  LOAD_PATIENT_SEARCH_RESULT,
  SEARCH_PATIENTS_ERROR,
  SEARCH_PATIENTS_SUCCESS,
} from './constants';

export function initializePatients(patients) {
  return {
    type: INITIALIZE_PATIENTS,
    patients,
  };
}

export function loadPatientSearchResult(searchTerms, searchType, includeInactive, currentPage, organization) {
  return {
    type: LOAD_PATIENT_SEARCH_RESULT,
    searchTerms,
    searchType,
    includeInactive,
    currentPage,
    organization,
  };
}

export function searchPatientsSuccess(searchResult, searchTerms, searchType, includeInactive) {
  return {
    type: SEARCH_PATIENTS_SUCCESS,
    searchResult,
    queryParameters: {
      searchTerms, searchType, includeInactive,
    },
  };
}

export function searchPatientsError(error) {
  return {
    type: SEARCH_PATIENTS_ERROR,
    error,
  };
}

