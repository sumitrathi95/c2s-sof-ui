import { DEFAULT_PAGE_SIZE } from '../App/constants';
import request from '../../utils/request';
import queryString from '../../utils/queryString';
import { BASE_PATIENTS_API_URL, getEndpoint } from '../../utils/endpointService';

export default function searchPatients(searchTerms, searchType, includeInactive, currentPage, organization) {
  let params = queryString({
    value: searchTerms,
    type: searchType,
    showInactive: includeInactive,
    page: currentPage,
    size: DEFAULT_PAGE_SIZE,
  });
  if (organization) {
    params = queryString({
      value: searchTerms,
      type: searchType,
      showInactive: includeInactive,
      page: currentPage,
      size: DEFAULT_PAGE_SIZE,
      organization,
    });
  }

  const baseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}
