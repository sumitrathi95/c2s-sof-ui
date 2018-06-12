/*
 * ManageConsent Messages
 *
 * This contains all the text for the ManageConsent component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  selectActorsTitle: {
    id: 'ocpui.components.ManageConsent.selectActorsTitle',
    defaultMessage: 'Selected Care Teams',
  },
  consentType: {
    id: 'ocpui.components.ManageConsent.consentType',
    defaultMessage: 'Make available to my entire care team',
  },
  medicalInformationTitle: {
    id: 'ocpui.components.ManageConsent.medicalInformationTitle',
    defaultMessage: 'Medical Information',
  },
  purposeOfUseTitle: {
    id: 'ocpui.components.ManageConsent.purposeOfUseTitle',
    defaultMessage: 'Purpose Of Use',
  },
  consentTermTitle: {
    id: 'ocpui.components.ManageConsent.consentTermTitle',
    defaultMessage: 'Consent Terms',
  },
  consentTermSubtitle: {
    id: 'ocpui.components.ManageConsent.consentTermSubtitle',
    defaultMessage: 'Enter a start and end date during which your medical records will be shared.',
  },
  validation: {
    minMedicalInfo: {
      id: 'ocpui.components.ManageConsent.manageForm.validation.minMedicalInfo',
      defaultMessage: 'Consent must have at least ONE medical information',
    },
    minPurpose: {
      id: 'ocpui.components.ManageConsent.manageForm.validation.minPurpose',
      defaultMessage: 'Consent must have at least ONE purpose of use',
    },
    minFromActors: {
      id: 'ocpui.components.ManageConsent.manageForm.validation.minFromActors',
      defaultMessage: 'Consent must have at least ONE Organization/Practitioner to authorize',
    },
    minToActors: {
      id: 'ocpui.components.ManageConsent.manageForm.validation.minToActors',
      defaultMessage: 'Consent must have at least ONE Organization/Practitioner to disclose',
    },
    required: {
      id: 'ocpui.components.ManageConsent.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.ManageConsent.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'ocpui.components.ManageConsent.manageForm.validation.minStartDate',
      defaultMessage: 'Consent Start date field must be later than today',
    },
    minEndDate: {
      id: 'ocpui.components.ManageConsent.manageForm.validation.minEndDate',
      defaultMessage: 'Consent End date field must be later than Consent Start date field',
    },
  },
  hintText: {
    consentStart: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.consentStart',
      defaultMessage: 'Consent Start Date',
    },
    consentEnd: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.consentEnd',
      defaultMessage: 'Consent End Date',
    },
  },
  floatingLabelText: {
    consentStart: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.consentStart',
      defaultMessage: 'Consent Start Date',
    },
    consentEnd: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.consentEnd',
      defaultMessage: 'Consent End Date',
    },
  },
});
