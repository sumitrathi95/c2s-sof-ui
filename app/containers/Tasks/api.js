import request from 'utils/request';
import queryString from 'utils/queryString';
import { BASE_TASKS_API_URL, getEndpoint } from 'utils/endpointService';

export default function getTasks(practitioner, patient, statusList) {
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const params = queryString({ practitioner, patient, statusList });
  const requestURL = `${baseEndpoint}${params}`;
  return request(requestURL);
}

export function cancelTask(id) {
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const requestURL = `${baseEndpoint}/${id}/deactivate`;
  return request(requestURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
