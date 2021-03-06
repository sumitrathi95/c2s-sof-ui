import request from 'utils/request';
import { BASE_CONSENTS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_CONSENTS_API_URL);

export function getConsent(logicalId) {
  const requestURL = `${baseEndpoint}/${logicalId}`;
  return request(requestURL);
}

export function attestConsent(logicalId) {
  const requestURL = `${baseEndpoint}/${logicalId}/attestation`;
  return request(requestURL, {
    method: 'PUT',
  });
}
