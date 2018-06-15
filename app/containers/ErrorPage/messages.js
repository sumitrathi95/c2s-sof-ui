/*
 * ErrorPage Messages
 *
 * This contains all the text for the ErrorPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'c2s.containers.ErrorPage.header',
    defaultMessage: 'Error',
  },
  invalidErrorCode: {
    id: 'c2s.containers.ErrorPage.invalidErrorCode',
    defaultMessage: 'Invalid error code, the error code is not recognized.',
  },
  invalidLaunchParams: {
    id: 'c2s.containers.ErrorPage.invalidLaunchParams',
    defaultMessage: 'Missing launch parameters: {details}',
  },
  invalidState: {
    id: 'c2s.containers.ErrorPage.invalidState',
    defaultMessage: 'Invalid state, state cannot be found in session storage. {details}',
  },
  tokenRetrieveFailed: {
    id: 'c2s.containers.ErrorPage.tokenRetrieveFailed',
    defaultMessage: 'Failed to retrieve token.',
  },
});
