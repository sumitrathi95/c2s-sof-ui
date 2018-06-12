/*
 * AttestConsent Messages
 *
 * This contains all the text for the AttestConsent component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.AttestConsent.header',
    defaultMessage: 'Consent to Share My Medical Information',
  },
  subtitle: {
    medicalInfoGroup: {
      id: 'ocpui.components.AttestConsent.subtitle.medicalInfoGroup',
      defaultMessage: 'AUTHORIZATION TO DISCLOSE:',
    },
    purposeOfUseGroup: {
      id: 'ocpui.components.AttestConsent.subtitle.purposeOfUseGroup',
      defaultMessage: 'HEALTH INFORMATION TO BE DISCLOSED:',
    },
    consentTerm: {
      id: 'ocpui.components.AttestConsent.subtitle.consentTerm',
      defaultMessage: 'CONSENT TERMS:',
    },
  },
  label: {
    patientName: {
      id: 'ocpui.components.AttestConsent.label.patientName',
      defaultMessage: 'Patient Name: ',
    },
    patientDob: {
      id: 'ocpui.components.AttestConsent.label.patientDob',
      defaultMessage: 'Patient DOB: ',
    },
    authorizes: {
      id: 'ocpui.components.AttestConsent.label.authorizes',
      defaultMessage: 'Authorizes:',
    },
    discloses: {
      id: 'ocpui.components.AttestConsent.label.discloses',
      defaultMessage: 'To disclose to:',
    },
    purposes: {
      id: 'ocpui.components.AttestConsent.label.purposes',
      defaultMessage: 'To SHARE for the following purpose(s):',
    },
    effectiveDate: {
      id: 'ocpui.components.AttestConsent.label.effectiveDate',
      defaultMessage: 'Effective Date:',
    },
    expirationDate: {
      id: 'ocpui.components.AttestConsent.label.expirationDate',
      defaultMessage: 'Expiration Date:',
    },
  },
  attestTerm: {
    id: 'ocpui.components.AttestConsent.attestTerm',
    defaultMessage: 'I, <strong>{patientName}</strong>, understand that my records are protected under the federal regulations governing Confidentiality of Alcohol and Drug Abuse Patient Records, 42 CFR part 2, and cannot be disclosed without my written permission or as otherwise permitted by 42 CFR part 2. I also understand that I may revoke this consent at any time except to the extent that action has been taken in reliance on it, and that any event this consent expires automatically as follows:',
  },
  agreementTerm: {
    id: 'ocpui.components.AttestConsent.agreementTerm',
    defaultMessage: 'I, <strong>{patientName}</strong>, hereby accept and understand the terms of this consent.',
  },
  authentication: {
    header: {
      id: 'ocpui.components.AttestConsent.authentication.header',
      defaultMessage: 'Please Authenticate',
    },
    term: {
      id: 'ocpui.components.AttestConsent.authentication.term',
      defaultMessage: 'Please provide your account password to authenticate, and complete e-signature',
    },
    label: {
      id: 'ocpui.components.AttestConsent.authentication.label',
      defaultMessage: 'Password',
    },
  },
  validation: {
    required: {
      id: 'ocpui.components.ManageTask.manageForm.validation.required',
      defaultMessage: 'Required',
    },
  },
});
