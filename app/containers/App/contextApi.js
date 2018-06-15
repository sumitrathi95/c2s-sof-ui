import { BASE_ORGANIZATIONS_API_URL, BASE_PATIENTS_API_URL, getEndpoint } from 'utils/endpointService';
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
  // Todo: Get user context from backend
  const fhirResource = {
    logicalId: '123',
    identifiers: null,
    name: [{
      firstName: 'Preston',
      lastName: 'Hawkins',
    }],
    telecoms: null,
    addresses: null,
  };
  return {
    fhirResource,
  };
}

export function getErrorDetail(error) {
  let errorDetail = error.message;
  if (error && error.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  }
  return errorDetail;
}
