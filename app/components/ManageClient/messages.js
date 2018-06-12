/*
 * ManageClient Messages
 *
 * This contains all the text for the ManageClient component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  addClient: {
    id: 'ocpui.components.ManageClient.addClient',
    defaultMessage: 'Register New App',
  },
  saveButton: {
    id: 'ocpui.components.ManageClient.saveButton',
    defaultMessage: 'Save',
  },
  cancelButton: {
    id: 'ocpui.components.ManageClient.cancelButton',
    defaultMessage: 'Cancel',
  },
  dialogHeader: {
    id: 'ocpui.components.ManageClient.dialogHeader',
    defaultMessage: 'Register App on OCP SMART on FHIR Platform',
  },
  hintText: {
    client_id: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.client_id',
      defaultMessage: 'Client ID',
    },
    client_type: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.client_type',
      defaultMessage: 'Client Type',
    },
    name: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.name',
      defaultMessage: 'App Name',
    },
    redirect_uri: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.redirect_uri',
      defaultMessage: 'App Redirect URIs  (Comma separated list)',
    },
    client_secret: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.client_secret',
      defaultMessage: 'Client Secret',
    },
    appLaunchUrl: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.appLaunchUrl',
      defaultMessage: 'App Launch URI',
    },
    scopes: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.scopes',
      defaultMessage: 'Scopes (Comma separated list)',
    },
  },
  floatingLabelText: {
    client_type: {
      id: 'ocpui.components.ManageClient.ManageClientForm.hintText.client_type',
      defaultMessage: 'Client Type',
    },
    client_id: {
      id: 'ocpui.components.ManageClient.ManageClientForm.floatingLabelText.client_id',
      defaultMessage: 'Client ID',
    },
    name: {
      id: 'ocpui.components.ManageClient.ManageClientForm.floatingLabelText.name',
      defaultMessage: 'App Name',
    },
    redirect_uri: {
      id: 'ocpui.components.ManageClient.ManageClientForm.floatingLabelText.redirect_uri',
      defaultMessage: 'App Redirect URIs (Comma separated list)',
    },
    client_secret: {
      id: 'ocpui.components.ManageClient.ManageClientForm.floatingLabelText.client_secret',
      defaultMessage: 'Client Secret',
    },
    appLaunchUrl: {
      id: 'ocpui.components.ManageClient.ManageClientForm.floatingLabelText.appLaunchUrl',
      defaultMessage: 'App Launch URI',
    },
    scopes: {
      id: 'ocpui.components.ManageClient.ManageClientForm.floatingLabelText.scopes',
      defaultMessage: 'Scopes (Comma separated list)',
    },
  },
  validation: {
    required: {
      id: 'ocpui.components.ManageClient.ManageClientForm.validation.required',
      defaultMessage: 'Required',
    },
    imageFormat: {
      id: 'ocpui.components.ManageClient.ManageClientForm.validation.imageFormat',
      defaultMessage: 'Only gif|jpg|jpeg|tiff|png format be accepted',
    },
    imageSize: {
      id: 'ocpui.components.ManageClient.ManageClientForm.validation.imageSize',
      defaultMessage: 'Image size must be less than {imageSize}kb',
    },
  },
});
