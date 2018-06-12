/*
 * SearchAppointmentParticipant Messages
 *
 * This contains all the text for the SearchAppointmentParticipant component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  addParticipantDialogCancelBtnLabel: {
    id: 'ocpui.components.SearchAppointmentParticipant.addParticipantDialogCancelBtnLabel',
    defaultMessage: 'Cancel',
  },
  addParticipantDialogTitle: {
    id: 'ocpui.components.SearchAppointmentParticipant.addParticipantDialogTitle',
    defaultMessage: 'Add Participant',
  },
  searchButtonTooltip: {
    id: 'ocpui.components.SearchAppointmentParticipant.searchButtonTooltip',
    defaultMessage: 'Search',
  },
  addParticipantBtnLabel: {
    id: 'ocpui.components.SearchAppointmentParticipant.addParticipantBtnLabel',
    defaultMessage: 'Add',
  },
  removeParticipantBtnLabel: {
    id: 'ocpui.components.SearchAppointmentParticipant.removeParticipantBtnLabel',
    defaultMessage: 'Remove',
  },
  participantTableHeaderName: {
    id: 'ocpui.components.SearchAppointmentParticipant.participantTableHeaderName',
    defaultMessage: 'Name',
  },
  participantTableHeaderRole: {
    id: 'ocpui.components.SearchAppointmentParticipant.participantTableHeaderRole',
    defaultMessage: 'Role',
  },
  participantTableHeaderDate: {
    id: 'ocpui.components.SearchAppointmentParticipant.participantTableHeaderDate',
    defaultMessage: 'Date',
  },
  participantTableHeaderStartTime: {
    id: 'ocpui.components.SearchAppointmentParticipant.participantTableHeaderStartTime',
    defaultMessage: 'Start Time',
  },
  participantTableHeaderEndTime: {
    id: 'ocpui.components.SearchAppointmentParticipant.participantTableHeaderEndTime',
    defaultMessage: 'End Time',
  },
  participantTableHeaderParticipantType: {
    id: 'ocpui.components.SearchAppointmentParticipant.participantTableHeaderParticipantType',
    defaultMessage: 'Participant Type',
  },
  participantTableHeaderParticipationType: {
    id: 'ocpui.components.SearchAppointmentParticipant.participantTableHeaderParticipationType',
    defaultMessage: 'Participation Type',
  },
  participantTableHeaderParticipationRequired: {
    id: 'ocpui.components.SearchAppointmentParticipant.participantTableHeaderParticipationRequired',
    defaultMessage: 'Required',
  },
  participantTableHeaderParticipationStatus: {
    id: 'ocpui.components.SearchAppointmentParticipant.participantTableHeaderParticipationStatus',
    defaultMessage: 'Status',
  },
  participantTableHeaderAction: {
    id: 'ocpui.components.SearchAppointmentParticipant.participantTableHeaderAction',
    defaultMessage: 'Action',
  },
  noSearchParticipantResult: {
    id: 'ocpui.components.SearchAppointmentParticipant.noSearchParticipantResult',
    defaultMessage: 'No Participant found.',
  },
  hintText: {
    practitionerName: {
      id: 'ocpui.components.SearchAppointmentParticipant.hintText.practitionerName',
      defaultMessage: 'Name',
    },
    date: {
      id: 'ocpui.components.SearchAppointmentParticipant.hintText.date',
      defaultMessage: 'Date',
    },
    startTime: {
      id: 'ocpui.components.SearchAppointmentParticipant.hintText.startTime',
      defaultMessage: 'Start Time',
    },
    endTime: {
      id: 'ocpui.components.SearchAppointmentParticipant.hintText.endTime',
      defaultMessage: 'End Time',
    },
    participationType: {
      id: 'ocpui.components.SearchAppointmentParticipant.hintText.participationType',
      defaultMessage: 'Participation Type',
    },
    participationRequired: {
      id: 'ocpui.components.SearchAppointmentParticipant.hintText.participationRequired',
      defaultMessage: 'Required',
    },
    participationStatus: {
      id: 'ocpui.components.SearchAppointmentParticipant.hintText.participationStatus',
      defaultMessage: 'Status',
    },
  },
  floatingLabelText: {
    practitionerName: {
      id: 'ocpui.components.SearchAppointmentParticipant.floatingLabelText.practitionerName',
      defaultMessage: 'Name',
    },
    practitionerMember: {
      id: 'ocpui.components.SearchAppointmentParticipant.floatingLabelText.practitionerMember',
      defaultMessage: 'Member Type',
    },
    date: {
      id: 'ocpui.components.SearchAppointmentParticipant.floatingLabelText.date',
      defaultMessage: 'Date',
    },
    startTime: {
      id: 'ocpui.components.SearchAppointmentParticipant.floatingLabelText.startTime',
      defaultMessage: 'Start Time',
    },
    endTime: {
      id: 'ocpui.components.SearchAppointmentParticipant.floatingLabelText.endTime',
      defaultMessage: 'End Time',
    },
    participantRole: {
      id: 'ocpui.components.SearchAppointmentParticipant.floatingLabelText.participantRole',
      defaultMessage: 'Role',
    },
    participantType: {
      id: 'ocpui.components.SearchAppointmentParticipant.floatingLabelText.participantType',
      defaultMessage: 'Type',
    },
    participationType: {
      id: 'ocpui.components.SearchAppointmentParticipant.floatingLabelText.participationType',
      defaultMessage: 'Participation Type',
    },
    participationRequired: {
      id: 'ocpui.components.SearchAppointmentParticipant.floatingLabelText.participationRequired',
      defaultMessage: 'Required',
    },
    participationStatus: {
      id: 'ocpui.components.SearchAppointmentParticipant.floatingLabelText.participationStatus',
      defaultMessage: 'Status',
    },
  },
  validation: {
    required: {
      id: 'ocpui.components.SearchAppointmentParticipant.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.SearchAppointmentParticipant.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartTime: {
      id: 'ocpui.components.SearchAppointmentParticipant.validation.minStartTime',
      defaultMessage: 'Start time cannot be in the past',
    },
    minEndTime: {
      id: 'ocpui.components.SearchAppointmentParticipant.validation.minEndTime',
      defaultMessage: 'End time field must be later than Start time field',
    },
    minLength: {
      id: 'ocpui.components.SearchAppointmentParticipant.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
  },
});
