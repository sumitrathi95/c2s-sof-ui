/*
 * ErrorPage Messages
 *
 * This contains all the text for the ErrorPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.ErrorPage.header',
    defaultMessage: 'Error',
  },
  invalidErrorCode: {
    id: 'ocpui.containers.ErrorPage.invalidErrorCode',
    defaultMessage: 'Invalid error code, the error code is not recognized.',
  },
  invalidLaunchParams: {
    id: 'ocpui.containers.ErrorPage.invalidLaunchParams',
    defaultMessage: 'Missing launch parameters: {details}',
  },
  invalidState: {
    id: 'ocpui.containers.ErrorPage.invalidState',
    defaultMessage: 'Invalid state, state cannot be found in session storage. {details}',
  },
  tokenRetrieveFailed: {
    id: 'ocpui.containers.ErrorPage.tokenRetrieveFailed',
    defaultMessage: 'Failed to retrieve token.',
  },
});
