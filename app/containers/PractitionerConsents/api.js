import queryString from 'utils/queryString';
import request from 'utils/request';
import { BASE_CONSENTS_API_URL, getEndpoint } from 'utils/endpointService';
import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';


export function getConsents(query) {
  const baseEndpoint = getEndpoint(BASE_CONSENTS_API_URL);
  const params = queryString({ pageSize: DEFAULT_PAGE_SIZE, ...query });
  const requestURL = `${baseEndpoint}${params}`;
  return request(requestURL);
}

export function getErrorDetail(error) {
  let errorDetail = error.message;
  if (error && error.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (error && error.response && error.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}
