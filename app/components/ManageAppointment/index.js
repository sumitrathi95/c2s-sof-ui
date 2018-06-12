/**
 *
 * ManageAppointment
 *
 */

import { Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Util from 'utils/Util';
import yup from 'yup';
import ManageAppointmentForm from './ManageAppointmentForm';
import messages from './messages';

function ManageAppointment(props) {
  const {
    patient,
    appointment,
    editMode,
    appointmentStatuses,
    appointmentTypes,
    handleOpen,
    onSave,
    selectedParticipants,
    initialSelectedParticipants,
    removeParticipant,
  } = props;
  const propsFromContainer = {
    patient,
    editMode,
    appointmentStatuses,
    appointmentTypes,
    handleOpen,
    selectedParticipants,
    initialSelectedParticipants,
    removeParticipant,
  };

  function setAppointmentTime(timeStr, dateStr) {
    const timeArray = timeStr && timeStr.split(':');
    const appointmentDate = new Date(dateStr);
    if (timeArray.length > 0) {
      appointmentDate.setHours(timeArray[0], timeArray[1]);
    }
    return appointmentDate;
  }

  function padHourOrMinute(timeEntry) {
    return parseInt(timeEntry, 10) <= 9 ? '0'.concat(timeEntry) : timeEntry;
  }
  function convertDateTimeArrayToTime(dateArray) {
    let timeStr = '';
    if (dateArray && dateArray.length >= 4) {
      const hh = padHourOrMinute(dateArray[3]);
      const mm = padHourOrMinute(dateArray[4]);
      timeStr = `${hh}:${mm}`;
    }
    return timeStr;
  }

  function setFormData() {
    let formData = null;
    if (!isEmpty(appointment)) {
      formData = {
        selectedPatient: patient,
        description: appointment.description,
        appointmentType: appointment.typeCode,
        date: appointment.appointmentDate && new Date(appointment.appointmentDate),
        status: appointment.statusCode,
        startTime: convertDateTimeArrayToTime(appointment.start),
        endTime: convertDateTimeArrayToTime(appointment.end),
        appointmentStatus: appointment.statusCode,
      };
    }
    return Util.pickByIdentity(formData);
  }

  return (
    <div>
      {patient &&
      <div>
        {((editMode && appointment) || !editMode) &&
        <Formik
          isInitialValid={editMode}
          initialValues={setFormData(appointment)}
          onSubmit={(values, actions) => {
            const startDateTime = setAppointmentTime(values.startTime, values.date);
            const endDateTime = setAppointmentTime(values.endTime, values.date);
            const newValues = { ...values };
            newValues.startTime = startDateTime;
            newValues.endTime = endDateTime;
            onSave(newValues, actions);
          }}
          validationSchema={yup.object().shape({
            date: yup.date()
              .required((<FormattedMessage {...messages.validation.required} />))
              .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
            appointmentType: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            startTime: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            endTime: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
          })
          }
          render={(formikProps) => <ManageAppointmentForm {...formikProps} {...propsFromContainer} />}
        />
        }
      </div>
      }
    </div>
  );
}

ManageAppointment.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  appointment: PropTypes.object,
  appointmentStatuses: PropTypes.array.isRequired,
  appointmentTypes: PropTypes.array.isRequired,
  selectedParticipants: PropTypes.array,
  initialSelectedParticipants: PropTypes.array,
};

export default ManageAppointment;

