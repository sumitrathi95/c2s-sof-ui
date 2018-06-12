import * as queryString from 'query-string';
import request from 'utils/request';
import { BASE_PARTICIPANTS_API_URL, getEndpoint } from 'utils/endpointService';

export function searchAppointmentParticipant(value, member, patientId) {
  const baseEndpoint = getEndpoint(BASE_PARTICIPANTS_API_URL);
  const queryParams = { value, member, patientId };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/search?${stringifiedParams}`;
  return request(url);
}
