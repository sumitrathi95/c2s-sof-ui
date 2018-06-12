import request from 'utils/request';
import { BASE_ORGANIZATIONS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
const headers = {
  'Content-Type': 'application/json',
};

export function createOrganizationApiCall(organizationFormData) {
  const requestUrl = `${baseEndpoint}`;
  const body = JSON.stringify(mapToBackendOrganization(organizationFormData));
  return request(requestUrl, {
    method: 'POST',
    headers,
    body,
  });
}

export function updateOrganizationApiCall(id, organizationFormData) {
  const requestUrl = `${baseEndpoint}/${id}`;
  const body = JSON.stringify(mapToBackendOrganization(organizationFormData));
  return request(requestUrl, {
    method: 'PUT',
    headers,
    body,
  });
}

function mapToBackendOrganization(organizationFormData) {
  const { name, identifierSystem, identifierValue, status, addresses, telecoms } = organizationFormData;
  const active = status === 'true';
  const identifier = {
    system: identifierSystem,
    value: identifierValue,
  };
  const identifiers = [identifier];
  return {
    name,
    active,
    addresses,
    telecoms,
    identifiers,
  };
}
