/*
 * CommunicationsTable Messages
 *
 * This contains all the text for the CommunicationsTable component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  columnHeaderTimeSent: {
    id: 'ocpui.components.communicationTable.columnHeaderTimeSent',
    defaultMessage: 'Time Sent',
  },
  columnHeaderLastUpdated: {
    id: 'ocpui.components.communicationTable.columnHeaderLastUpdated',
    defaultMessage: 'Last Updated',
  },
  columnHeaderCategory: {
    id: 'ocpui.components.communicationTable.columnHeaderCategory',
    defaultMessage: 'Category',
  },
  columnHeaderContactMethod: {
    id: 'ocpui.components.communicationTable.columnHeaderContactMethod',
    defaultMessage: 'Contact Type',
  },
  columnHeaderTopic: {
    id: 'ocpui.components.communicationTable.columnHeaderTopic',
    defaultMessage: 'Topic',
  },
  columnHeaderReason: {
    id: 'ocpui.components.communicationTable.columnHeaderReason',
    defaultMessage: 'Reason',
  },
  columnHeaderSent: {
    id: 'ocpui.components.communicationTable.columnHeaderSent',
    defaultMessage: 'Sent',
  },
  columnHeaderStatus: {
    id: 'ocpui.components.communicationTable.columnHeaderStatus',
    defaultMessage: 'Status',
  },
  noCommunications: {
    id: 'ocpui.containers.communicationsTable.noCommunications',
    defaultMessage: 'No Communications for selected patient. Please create communication.',
  },
  expansionRowDetails: {
    message: {
      id: 'ocpui.components.communicationTable.message',
      defaultMessage: 'Message Content',
    },
    note: {
      id: 'ocpui.components.communicationTable.note',
      defaultMessage: 'Note',
    },
    noCommunicatonReason: {
      id: 'ocpui.components.communicationTable.noCommunicatonReason',
      defaultMessage: 'Communication Did not occur Reason',
    },
    columnHeaderName: {
      id: 'ocpui.components.communicationTable.columnHeaderName',
      defaultMessage: 'Name',
    },
    columnHeaderRole: {
      id: 'ocpui.components.communicationTable.columnHeaderRole',
      defaultMessage: 'Role',
    },
    recipients: {
      id: 'ocpui.components.communicationTable.recipients',
      defaultMessage: 'Recipients: ',
    },
  },
});
