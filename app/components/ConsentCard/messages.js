/*
 * ConsentCard Messages
 *
 * This contains all the text for the ConsentCard component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'c2s.components.ConsentCard.header',
    defaultMessage: 'This is the ConsentCard component !',
  },
  consentStatus: {
    id: 'c2s.components.ConsentCard.consentStatus',
    defaultMessage: 'Consent state:',
  },
  manageConsentButton: {
    id: 'c2s.components.ConsentCard.manageConsentButton',
    defaultMessage: 'Manage Consent',
  },
  consentCardHeader: {
    authorizedLabel: {
      id: 'c2s.components.ConsentCard.consentCardHeader.authorizedLabel',
      defaultMessage: 'Authorized to share:',
    },
    sharingLabel: {
      id: 'c2s.components.ConsentCard.consentCardHeader.sharingLabel',
      defaultMessage: 'Sharing with:',
    },
    effectiveDatesLabel: {
      id: 'c2s.components.ConsentCard.consentCardHeader.effectiveDatesLabel',
      defaultMessage: 'Effective dates:',
    },
    medicalInfoLabel: {
      id: 'c2s.components.ConsentCard.consentCardHeader.medicalInfoLabel',
      defaultMessage: 'Medical information disclosed:',
    },
    purposeLabel: {
      id: 'c2s.components.ConsentCard.consentCardHeader.purposeLabel',
      defaultMessage: 'Share the following purposes:',
    },
  },
  consentDialog: {
    title: {
      id: 'c2s.components.ConsentCard.consentDialog.title',
      defaultMessage: 'Consent Options',
    },
    editConsentOption: {
      id: 'c2s.components.ConsentCard.consentDialog.editConsentOption',
      defaultMessage: 'Edit This Consent',
    },
    attestConsentOption: {
      id: 'c2s.components.ConsentCard.consentDialog.attestConsentOption',
      defaultMessage: 'Provide Signature',
    },
    previewConsentOption: {
      id: 'c2s.components.ConsentCard.consentDialog.previewConsentOption',
      defaultMessage: 'Preview This Consent',
    },
    closeButton: {
      id: 'c2s.components.ConsentCard.consentDialog.closeButton',
      defaultMessage: 'Close',
    },
  },
});
