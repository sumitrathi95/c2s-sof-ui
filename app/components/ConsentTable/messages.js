/*
 * ConsentTable Messages
 *
 * This contains all the text for the ConsentTable component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  tableColumnHeaderPatientName: {
    id: 'ocpui.components.ConsentTable.tableColumnHeader.PatientName',
    defaultMessage: 'Patient Name',
  },
  tableColumnHeaderFromActor: {
    id: 'ocpui.components.ConsentTable.tableColumnHeader.FromActor',
    defaultMessage: 'Authorized to',
  },
  tableColumnHeaderToActor: {
    id: 'ocpui.components.ConsentTable.TableColumnHeader.ToActor',
    defaultMessage: 'Sharing with',
  },
  tableColumnHeaderPeriod: {
    id: 'ocpui.components.ConsentTable.tableColumnHeader.Period',
    defaultMessage: 'Effecitve Dates',
  },
  tableColumnHeaderStatus: {
    id: 'ocpui.components.ConsentTable.TableColumnHeader.Status',
    defaultMessage: 'Status',
  },
  edit: {
    id: 'ocpui.components.ConsentTable.edit',
    defaultMessage: 'Edit',
  },
  preview: {
    id: 'ocpui.components.ConsentTable.preview',
    defaultMessage: 'Preview',
  },
  view: {
    id: 'ocpui.components.ConsentTable.view',
    defaultMessage: 'View',
  },
  attest: {
    id: 'ocpui.components.ConsentTable.attest',
    defaultMessage: 'Provide Signature',
  },
  remove: {
    id: 'ocpui.components.ConsentTable.remove',
    defaultMessage: 'Remove',
  },
  purpose: {
    id: 'ocpui.components.ConsentTable.purpose',
    defaultMessage: 'Share the following purposes:',
  },
  noResultFound: {
    id: 'ocpui.components.ConsentTable.noResultFound',
    defaultMessage: 'No consents found',
  },
});
