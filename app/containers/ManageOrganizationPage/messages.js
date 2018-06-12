/*
 * ManageOrganizationPage Messages
 *
 * This contains all the text for the ManageOrganizationPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  createModeTitle: {
    id: 'ocpui.containers.ManageOrganizationPage.createModeTitle',
    defaultMessage: 'Add New Organization',
  },
  updateModeTitle: {
    id: 'ocpui.containers.ManageOrganizationPage.updateModeTitle',
    defaultMessage: 'Update Organization',
  },
  subtitle: {
    id: 'ocpui.containers.ManageOrganizationPage.subtitle',
    defaultMessage: 'General Information',
  },
  form: {
    name: {
      id: 'ocpui.containers.ManageOrganizationPage.form.name',
      defaultMessage: 'Organization Name',
    },
    identifierSystem: {
      id: 'ocpui.containers.ManageOrganizationPage.form.identifierSystem',
      defaultMessage: 'ID',
    },
    identifierValue: {
      id: 'ocpui.containers.ManageOrganizationPage.form.identifierValue',
      defaultMessage: 'Please enter ID #',
    },
    status: {
      id: 'ocpui.containers.ManageOrganizationPage.form.status',
      defaultMessage: 'Status',
    },
    saveButton: {
      id: 'ocpui.containers.ManageOrganizationPage.form.saveButton',
      defaultMessage: 'Save',
    },
    savingButton: {
      id: 'ocpui.containers.ManageOrganizationPage.form.savingButton',
      defaultMessage: 'Saving...',
    },
    cancelButton: {
      id: 'ocpui.containers.ManageOrganizationPage.form.cancelButton',
      defaultMessage: 'Cancel',
    },
  },
  validation: {
    required: {
      id: 'ocpui.containers.ManageOrganizationPage.validation.required',
      defaultMessage: 'Required',
    },
    minAddresses: {
      id: 'ocpui.components.ManageOrganizationPage.validation.minAddresses',
      defaultMessage: 'Organization must have {minimumNumberOfAddresses} address',
    },
    minTelecoms: {
      id: 'ocpui.components.ManageOrganizationPage.validation.minTelecoms',
      defaultMessage: 'Organization must have {minimumNumberOfAddresses} contact',
    },
  },
});
