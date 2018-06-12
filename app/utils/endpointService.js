import isUndefined from 'lodash/isUndefined';
import some from 'lodash/some';
import includes from 'lodash/includes';

// Todo: Make server side configurable
const BASE_API_URL = '/c2s-sof-ui-api';

/**
 *  Constants to hold the external UI Api endpoint Keys
 * @type {string}
 */
export const CONFIG_API_URL = 'ocpui/utils/CONFIG_API_URL';
export const LOGIN_API_URL = 'ocpui/utils/LOGIN_API_URL';
export const LOOKUPS_API_URL = 'ocpui/utils/LOOKUPS_API_URL';
export const BASE_CARE_TEAMS_API_URL = 'ocpui/utils/BASE_CARE_TEAMS_API_URL';
export const BASE_ORGANIZATION_API_URL = 'ocpui/utils/BASE_ORGANIZATION_API_URL';
export const BASE_ORGANIZATIONS_API_URL = 'ocpui/utils/BASE_ORGANIZATIONS_API_URL';
export const BASE_HEALTHCARE_SERVICES_API_URL = 'ocpui/utils/BASE_HEALTHCARE_SERVICES_API_URL';
export const BASE_LOCATIONS_API_URL = 'ocpui/utils/BASE_LOCATIONS_API_URL';
export const BASE_PARTICIPANTS_API_URL = 'ocpui/utils/BASE_PARTICIPANTS_API_URL';
export const BASE_PATIENTS_API_URL = 'ocpui/utils/BASE_PATIENTS_API_URL';
export const BASE_PRACTITIONERS_API_URL = 'ocpui/utils/BASE_PRACTITIONERS_API_URL';
export const BASE_RELATED_PERSONS_API_URL = 'ocpui/utils/BASE_RELATED_PERSONS_API_URL';
export const BASE_TASKS_API_URL = 'ocpui/utils/BASE_TASKS_API_URL';
export const BASE_EPISODE_OF_CARES_API_URL = 'ocpui/utils/BASE_EPISODE_OF_CARES_API_URL';
export const BASE_ACTIVITY_DEFINITIONS_API_URL = 'ocpui/utils/BASE_ACTIVITY_DEFINITIONS_API_URL';
export const BASE_CONSENTS_API_URL = 'ocpui/utils/BASE_CONSENTS_API_URL';
export const BASE_USER_CONTEXT_API_URL = 'ocpui/utils/BASE_USER_CONTEXT_API_URL';

/**
 * Configure all secured and unsecured endpoints
 * isSecured property is used to specify secured or unsecured endpoint. By default isSecured property will set true if it is missing to set
 * @type {*[]}
 */
const apiEndpoints = [
  { key: CONFIG_API_URL, url: `${BASE_API_URL}/config`, isSecured: false },
  { key: LOOKUPS_API_URL, url: `${BASE_API_URL}/ocp-fis/lookups`, isSecured: false },

  { key: BASE_CONSENTS_API_URL, url: `${BASE_API_URL}/consents` },
  { key: BASE_PATIENTS_API_URL, url: `${BASE_API_URL}/patients` },
  { key: BASE_ORGANIZATION_API_URL, url: `${BASE_API_URL}/ocp-fis/organization` },
  { key: BASE_ORGANIZATIONS_API_URL, url: `${BASE_API_URL}/ocp-fis/organizations` },
  { key: BASE_PRACTITIONERS_API_URL, url: `${BASE_API_URL}/ocp-fis/practitioners` },
  { key: BASE_USER_CONTEXT_API_URL, url: `${BASE_API_URL}/user-context` },
];

const configuredEndpoints = collectEndpoints();

export function getEndpoint(key) {
  const requestEndpoint = configuredEndpoints.get(key);
  if (isUndefined(requestEndpoint)) {
    throw Error(`No ${key} endpoint configured.`);
  }
  return requestEndpoint.url;
}

/**
 *  Check the endpoint whether secured
 * @param endpoint
 * @returns {boolean}
 */
export function isSecuredEndpoint(endpoint) {
  let isEndpointSecured = true;
  const endpoints = Array.from(configuredEndpoints.values());

  // Collect all unsecured endpoints
  const unsecuredEndpoints = endpoints
    .filter((ep) => ep.isSecured === false)
    .map((ep) => ep.url);
  if (some(unsecuredEndpoints, (unsecuredEndpoint) => includes(endpoint, unsecuredEndpoint))) {
    isEndpointSecured = false;
  }

  return isEndpointSecured;
}

/**
 * Collect all endpoints
 * @returns {*}
 */
export function collectEndpoints() {
  const endpoints = new Map();
  apiEndpoints
    .map((endpoint) => endpoints.set(endpoint.key, endpoint));
  return endpoints;
}

