/*
 * PractitionerToDos Messages
 *
 * This contains all the text for the PractitionerToDos component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  noToDoError: {
    id: 'ocpui.containers.PractitionerToDos.noToDoError',
    defaultMessage: 'Error in getting To Do.',
  },
  noTaskReferenceError: {
    id: 'ocpui.containers.PractitionerToDos.noTaskReferenceError',
    defaultMessage: 'Error in getting To Do Task reference.',
  },
  noToDosFound: {
    id: 'ocpui.containers.PractitionerToDos.noToDosFound',
    defaultMessage: 'No To Dos found.',
  },
  noFilterToDoError: {
    id: 'ocpui.containers.PractitionerToDos.noFilterToDoError',
    defaultMessage: 'No filter To Dos found.',
  },
  selectLabelDateRange: {
    id: 'ocpui.containers.PractitionerToDos.selectLabelDateRange',
    defaultMessage: 'Select Date range to filter.',
  },
});
