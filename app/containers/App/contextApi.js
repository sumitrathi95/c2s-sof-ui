import {
  BASE_ORGANIZATIONS_API_URL,
  BASE_PATIENTS_API_URL,
  BASE_USER_CONTEXT_API_URL,
  getEndpoint,
} from 'utils/endpointService';
import request from 'utils/request';

export function getPatient(id) {
  const baseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);
  const requestURL = `${baseEndpoint}/${id}`;
  return request(requestURL);
}

export function getOrganization(id) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const requestURL = `${baseEndpoint}/${id}`;
  return request(requestURL);
}

export function getUserContext() {
  const requestEndpoint = getEndpoint(BASE_USER_CONTEXT_API_URL);
  return request(requestEndpoint);
}

export function getErrorDetail(error) {
  let errorDetail = error.message;
  if (error && error.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  }
  return errorDetail;
}
