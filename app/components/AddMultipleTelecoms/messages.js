/*
 * AddMultipleTelecoms Messages
 *
 * This contains all the text for the AddMultipleTelecoms component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.AddMultipleTelecoms.header',
    defaultMessage: 'Contacts',
  },
  addTelecomsButton: {
    id: 'ocpui.components.AddMultipleTelecoms.addTelecomsButton',
    defaultMessage: 'Add Contact',
  },
  saveButton: {
    id: 'ocpui.components.AddMultipleTelecoms.saveButton',
    defaultMessage: 'Save',
  },
  cancelButton: {
    id: 'ocpui.components.AddMultipleTelecoms.cancelButton',
    defaultMessage: 'Cancel',
  },
  validation: {
    required: {
      id: 'ocpui.components.AddMultipleTelecoms.addTelecomsForm.validation.required',
      defaultMessage: 'Required',
    },
    phone: {
      id: 'ocpui.components.AddMultipleTelecoms.addTelecomsForm.validation.phone',
      defaultMessage: 'Must be with formats: 123-456-7890 (123)456-7890 1234567890 123.456.7890',
    },
  },
  hintText: {
    system: {
      id: 'ocpui.components.AddMultipleTelecoms.addTelecomsForm.hintText.system',
      defaultMessage: 'Contact Type',
    },
    value: {
      id: 'ocpui.components.AddMultipleTelecoms.addTelecomsForm.hintText.value',
      defaultMessage: 'Contact',
    },
    use: {
      id: 'ocpui.components.AddMultipleTelecoms.addTelecomsForm.hintText.use',
      defaultMessage: 'Contact Purpose',
    },
  },
  floatingLabelText: {
    system: {
      id: 'ocpui.components.AddMultipleTelecoms.addTelecomsForm.floatingLabelText.system',
      defaultMessage: 'Contact Type',
    },
    value: {
      id: 'ocpui.components.AddMultipleTelecoms.addTelecomsForm.floatingLabelText.value',
      defaultMessage: 'Contact',
    },
    use: {
      id: 'ocpui.components.AddMultipleTelecoms.addTelecomsForm.floatingLabelText.use',
      defaultMessage: 'Contact Purpose',
    },
  },
  addedTelecomsTable: {
    tableHeaderSystem: {
      id: 'ocpui.components.AddMultipleTelecoms.addedTelecomsTable.tableHeaderSystem',
      defaultMessage: 'Contact Type',
    },
    tableHeaderValue: {
      id: 'ocpui.components.AddMultipleTelecoms.addedTelecomsTable.tableHeaderValue',
      defaultMessage: 'Contact',
    },
    tableHeaderUse: {
      id: 'ocpui.components.AddMultipleTelecoms.addedTelecomsTable.tableHeaderUse',
      defaultMessage: 'Contact Purpose',
    },
    tableHeaderAction: {
      id: 'ocpui.components.AddMultipleTelecoms.addedTelecomsTable.tableHeaderAction',
      defaultMessage: 'Action',
    },
    tableActionEdit: {
      id: 'ocpui.components.AddMultipleTelecoms.addedTelecomsTable.tableActionEdit',
      defaultMessage: 'Edit',
    },
    tableActionRemove: {
      id: 'ocpui.components.AddMultipleTelecoms.addedTelecomsTable.tableActionRemove',
      defaultMessage: 'Remove',
    },
  },
});
