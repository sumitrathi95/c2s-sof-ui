import DatePicker from 'components/DatePicker';
import FormSubtitle from 'components/FormSubtitle';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import ManageAppointmentFormGrid from 'components/ManageAppointment/ManageAppointmentFormGrid';
import SelectField from 'components/SelectField';
import GoBackButton from 'components/GoBackButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import TextField from 'components/TextField';
import ErrorText from 'components/ErrorText';
import { Form } from 'formik';
import uniqueId from 'lodash/uniqueId';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import { mapToPatientName } from 'utils/PatientUtils';
import Util from 'utils/Util';
import messages from './messages';

import SelectedParticipants from './SelectedParticipants';


class ManageAppointmentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEndDateBeforeStartDate: false,
      startDateTime: new Date(),
      endDateTime: new Date(),
    };
    this.onStartTimeChange = this.onStartTimeChange.bind(this);
    this.onEndTimeChange = this.onEndTimeChange.bind(this);
  }

  onStartTimeChange(event) {
    const startTime = event.target.value;
    const dateTimeArray = startTime && startTime.split(':');

    const startDateTime = this.state.startDateTime;
    const endDateTime = this.state.endDateTime;
    startDateTime.setHours(dateTimeArray[0], dateTimeArray[1]);
    const result = startDateTime > endDateTime;
    this.setState({
      isEndDateBeforeStartDate: result,
      startDateTime,
    });
  }

  onEndTimeChange(event) {
    const endTime = event.target.value;
    const dateTimeArray = endTime && endTime.split(':');

    const startDateTime = this.state.startDateTime;
    const endDateTime = this.state.endDateTime;
    endDateTime.setHours(dateTimeArray[0], dateTimeArray[1]);

    const result = startDateTime > endDateTime;
    this.setState({
      isEndDateBeforeStartDate: result,
      endDateTime,
    });
  }

  render() {
    const today = new Date();
    const {
      isSubmitting,
      dirty,
      isValid,
      editMode,
      appointmentTypes,
      appointmentStatuses,
      handleOpen,
      selectedParticipants,
      initialSelectedParticipants,
      removeParticipant,
      patient,
    } = this.props;

    const selectedParticipantsProps = {
      selectedParticipants,
      removeParticipant,
    };

    const PATIENT_NAME_HTML_ID = uniqueId('patient_name_');

    return (
      <div>
        <Form>
          <ManageAppointmentFormGrid gap="1vw">
            <Cell area="generalInformationSubtitle">
              <FormSubtitle margin="0">
                <FormattedMessage {...messages.title} />
              </FormSubtitle>
            </Cell>
            <Cell area="selectedPatient">
              <InfoSection margin="2vh 0 0 0">
                <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}><FormattedMessage {...messages.patientName} />&nbsp;
                </InlineLabel>
                <span id={PATIENT_NAME_HTML_ID}>{mapToPatientName(patient)}</span>
              </InfoSection>
            </Cell>
            <Cell area="description">
              <TextField
                fullWidth
                name="description"
                hintText={<FormattedMessage {...messages.hintText.description} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.description} />}
              />
            </Cell>
            <Cell area="appointmentType">
              <SelectField
                fullWidth
                name="appointmentType"
                hintText={<FormattedMessage {...messages.hintText.appointmentType} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.appointmentType} />}
              >
                {appointmentTypes && appointmentTypes.map((appointmentType) =>
                  (<MenuItem
                    key={appointmentType.code}
                    value={appointmentType.code}
                    primaryText={appointmentType.display}
                  />),
                )}
              </SelectField>
            </Cell>
            <Cell area="date">
              <DatePicker
                fullWidth
                name="date"
                minDate={today}
                mode="landscape"
                hintText={<FormattedMessage {...messages.hintText.date} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.date} />}
              />
            </Cell>
            <Cell area="startTime">
              <TextField
                fullWidth
                type="time"
                name="startTime"
                onBlur={this.onStartTimeChange}
                hintText={<FormattedMessage {...messages.hintText.startTime} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startTime} />}
              />
            </Cell>
            <Cell area="endTime">
              <TextField
                fullWidth
                type="time"
                name="endTime"
                onBlur={this.onEndTimeChange}
                hintText={<FormattedMessage {...messages.hintText.endTime} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endTime} />}
              />
              {this.state.isEndDateBeforeStartDate ?
                <ErrorText>
                  <FormattedMessage {...messages.validation.invalidDateRange} />
                </ErrorText> :
                ''
              }
            </Cell>

            {editMode &&
            <Cell area="appointmentStatus">
              <SelectField
                fullWidth
                name="appointmentStatus"
                hintText={<FormattedMessage {...messages.hintText.status} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
              >
                {appointmentStatuses && appointmentStatuses.map((appointmentStatus) =>
                  (<MenuItem
                    key={appointmentStatus.code}
                    value={appointmentStatus.code}
                    primaryText={appointmentStatus.display}
                  />),
                )}
              </SelectField>
            </Cell>
            }

            <Cell area="participantSubtitle">
              <FormSubtitle margin="0">
                <FormattedMessage {...messages.participantTitle} />
              </FormSubtitle>
            </Cell>
            <Cell area="addParticipant">
              <StyledRaisedButton
                fullWidth
                onClick={handleOpen}
              >
                <FormattedMessage {...messages.addParticipantBtnLabel} />
              </StyledRaisedButton>
            </Cell>
            <Cell area="selectedParticipants">
              <SelectedParticipants {...selectedParticipantsProps} />
            </Cell>
            <Cell area="buttonGroup">
              <Grid columns={2}>
                <Cell>
                  <StyledRaisedButton
                    fullWidth
                    type="submit"
                    disabled={!reCheckFormDirty(dirty, selectedParticipants, initialSelectedParticipants) || isSubmitting || !isValid || this.state.isEndDateBeforeStartDate}
                  >
                    Save
                  </StyledRaisedButton>
                </Cell>
                <Cell>
                  <GoBackButton disabled={isSubmitting} />
                </Cell>
              </Grid>
            </Cell>
          </ManageAppointmentFormGrid>
        </Form>
      </div>
    );
  }
}

ManageAppointmentForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  selectedParticipants: PropTypes.array,
  initialSelectedParticipants: PropTypes.array,
  appointmentTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  appointmentStatuses: PropTypes.array,
};

export default ManageAppointmentForm;

function reCheckFormDirty(dirty, selectedParticipants, originalSelectedParticipants) {
  let isDirty = dirty;
  const identityOfArray = 'memberId';
  if (!Util.isUnorderedArraysEqual(selectedParticipants, originalSelectedParticipants, identityOfArray)) {
    isDirty = true;
  }

  return isDirty;
}
