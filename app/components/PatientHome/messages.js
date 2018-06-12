/*
 * PatientHome Messages
 *
 * This contains all the text for the PatientHome component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  consentPanelSummary: {
    id: 'ocpui.components.PatientHome.consentPanelSummary',
    defaultMessage: 'Patient\'s Consents',
  },
  patientBanner: {
    identifier: {
      id: 'ocpui.components.PatientHome.patientBanner.identifier',
      defaultMessage: 'Identifier',
    },
    birthDate: {
      id: 'ocpui.components.PatientHome.patientBanner.birthDate',
      defaultMessage: 'DOB',
    },
    gender: {
      id: 'ocpui.components.PatientHome.patientBanner.gender',
      defaultMessage: 'Gender',
    },
  },
});
