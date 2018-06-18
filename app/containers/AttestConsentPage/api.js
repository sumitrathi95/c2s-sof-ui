import request from 'utils/request';
import { BASE_CONSENTS_API_URL, getEndpoint, LOGIN_API_URL } from 'utils/endpointService';

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

export function verifyAttestor(loginCredentials) {
  const requestEndpoint = getEndpoint(LOGIN_API_URL);
  return request(requestEndpoint, {
    method: 'POST',
    body: JSON.stringify(mapToBffCredential(loginCredentials)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function verifyAttestorErrorDetail(error) {
  let errorDetail = '';
  if (error && error.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (error && error.response && error.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

function mapToBffCredential(loginCredentials) {
  const { username, password } = loginCredentials;
  return { username, password };
}
