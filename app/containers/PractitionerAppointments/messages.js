/*
 * PractitionerAppointments Messages
 *
 * This contains all the text for the PractitionerAppointments component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.PractitionerAppointments.header',
    defaultMessage: 'Upcoming Appointments',
  },
  noUpcomingAppointments: {
    id: 'ocpui.containers.PractitionerAppointments.noUpcomingAppointments',
    defaultMessage: 'No Appointments found.',
  },
  buttonLabelCreateNew: {
    id: 'ocpui.containers.PractitionerAppointments.buttonLabelCreateNew',
    defaultMessage: 'Create New',
  },
  showPastAppointments: {
    id: 'ocpui.containers.PractitionerAppointments.checkbox.showPastAppointments',
    defaultMessage: 'Show Past Appointments',
  },
});
