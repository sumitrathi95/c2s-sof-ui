import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import uniqueId from 'lodash/uniqueId';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import FormSubtitle from 'components/FormSubtitle';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import SubTaskTable from 'components/SubTaskTable';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import { mapToPatientName } from 'utils/PatientUtils';
import { MANAGE_TASK_URL, EMPTY_STRING } from './constants';
import messages from './messages';
import ManageTaskFormGrid from './ManageTaskFormGrid';

function ManageTaskForm(props) {
  const datePickerLandscapeMode = 'landscape';

  const {
    taskStatus,
    requestIntent,
    requestPriority,
    taskPerformerType,
    activityDefinitions,
    practitioners,
    eventTypes,
    tasksByPatient,
    subTasks,
    patient,
    isSubmitting, dirty, isValid, isMainTask, organization, requester,
  } = props;
  const today = new Date();
  const ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
  const PATIENT_NAME_HTML_ID = uniqueId('patient_name_');

  return (
    <Form>
      <ManageTaskFormGrid>
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>
        <Cell area="activityDefinition">
          <SelectField
            fullWidth
            name="activityDefinition"
            hintText={<FormattedMessage {...messages.hintText.activityDefinitions} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.activityDefinitions} />}
            disabled={!isMainTask}
          >
            {activityDefinitions && activityDefinitions.map((activityDefinition) => (
              <MenuItem
                key={uniqueId()}
                value={activityDefinition.reference}
                primaryText={activityDefinition.display}
              />),
            )}
          </SelectField>
        </Cell>
        <Cell area="selOrganization">
          <InfoSection margin="4vh 0 0 0">
            <InlineLabel htmlFor={ORGANIZATION_NAME_HTML_ID}><FormattedMessage {...messages.floatingLabelText.organization} />&nbsp;
            </InlineLabel>
            <span id={ORGANIZATION_NAME_HTML_ID}>{organization && organization.name}</span>
          </InfoSection>
        </Cell>
        <Cell area="patientName">
          <InfoSection margin="2vh 0 0 0">
            <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}><FormattedMessage {...messages.hintText.patientName} />&nbsp;
            </InlineLabel>
            <span id={PATIENT_NAME_HTML_ID}>{mapToPatientName(patient)}</span>
          </InfoSection>
        </Cell>
        <Cell area="selRequester">
          <InfoSection margin="2vh 0 0 0">
            <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}><FormattedMessage {...messages.hintText.requester} />&nbsp;
            </InlineLabel>
            <span id={PATIENT_NAME_HTML_ID}>{getResourceName(requester)}</span>
          </InfoSection>
        </Cell>
        <Cell area="authoredOn">
          <DatePicker
            fullWidth
            name="authoredOn"
            minDate={today}
            maxDate={today}
            hintText={<FormattedMessage {...messages.hintText.authoredOn} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.authoredOn} />}
          />
        </Cell>
        <Cell area="lastModifiedDate">
          <DatePicker
            fullWidth
            name="lastModifiedDate"
            defaultDate={today}
            minDate={today}
            maxDate={today}
            hintText={<FormattedMessage {...messages.hintText.lastModifiedDate} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastModifiedDate} />}
          />
        </Cell>
        <Cell area="status">
          <SelectField
            fullWidth
            name="status"
            hintText={<FormattedMessage {...messages.hintText.status} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
          >
            {taskStatus && taskStatus.map((status) =>
              <MenuItem key={uniqueId()} value={status.code} primaryText={status.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="priority">
          <SelectField
            fullWidth
            name="priority"
            hintText={<FormattedMessage {...messages.hintText.priority} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.priority} />}
          >
            {requestPriority && requestPriority.map((priority) =>
              <MenuItem key={uniqueId()} value={priority.code} primaryText={priority.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="intent">
          <SelectField
            fullWidth
            name="intent"
            hintText={<FormattedMessage {...messages.hintText.intent} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.intent} />}
          >
            {requestIntent && requestIntent.map((intent) =>
              <MenuItem key={uniqueId()} value={intent.code} primaryText={intent.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="context">
          {(eventTypes && eventTypes.length > 0) &&
          <SelectField
            fullWidth
            name="context"
            hintText={<FormattedMessage {...messages.hintText.eventType} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.eventType} />}
            disabled={!isMainTask}
          >
            {eventTypes && eventTypes.map((eventType) =>
              <MenuItem key={uniqueId()} value={eventType.reference} primaryText={eventType.display} />,
            )}
          </SelectField>
          }
        </Cell>
        <Cell area="taskOwner">
          <SelectField
            fullWidth
            name="taskOwner"
            hintText={<FormattedMessage {...messages.hintText.taskOwner} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.taskOwner} />}
          >
            {practitioners && practitioners.map((practitioner) => (
              <MenuItem
                key={uniqueId()}
                value={practitioner.reference}
                primaryText={practitioner.display}
              />),
            )}
          </SelectField>
        </Cell>
        <Cell area="performerType">
          <SelectField
            fullWidth
            name="performerType"
            hintText={<FormattedMessage {...messages.hintText.performerType} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.performerType} />}
          >
            {taskPerformerType && taskPerformerType.map((performerType) =>
              <MenuItem key={uniqueId()} value={performerType.code} primaryText={performerType.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="partOf">
          {(tasksByPatient && tasksByPatient.length > 0) && !isMainTask &&
          <SelectField
            fullWidth
            disabled
            name="partOf"
            hintText={<FormattedMessage {...messages.hintText.partOf} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.partOf} />}
          >
            {tasksByPatient && tasksByPatient.map((partOf) =>
              <MenuItem key={uniqueId()} value={partOf.reference} primaryText={partOf.display} />,
            )}
          </SelectField>
          }
        </Cell>
        <Cell area="taskStart">
          <DatePicker
            fullWidth
            name="taskStart"
            mode={datePickerLandscapeMode}
            minDate={today}
            hintText={<FormattedMessage {...messages.hintText.taskStart} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.taskStart} />}
          />
        </Cell>
        <Cell area="taskEnd">
          <DatePicker
            fullWidth
            name="taskEnd"
            minDate={today}
            mode={datePickerLandscapeMode}
            hintText={<FormattedMessage {...messages.hintText.taskEnd} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.taskEnd} />}
          />
        </Cell>
        <Cell area="description">
          <TextField
            fullWidth
            name="description"
            multiLine
            rows={2}
            hintText={<FormattedMessage {...messages.hintText.description} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.description} />}
          />
        </Cell>
        <Cell area="comments">
          <TextField
            fullWidth
            name="comments"
            multiLine
            rows={2}
            hintText={<FormattedMessage {...messages.hintText.comments} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.comments} />}
          />
        </Cell>
        {isMainTask && <Cell area="subTasksSection">
          <SubTaskTable elements={subTasks} patientId={patient.id} taskBaseUrl={MANAGE_TASK_URL} />
        </Cell>
        }
        <Cell area="buttonGroup">
          <Grid columns={2}>
            <Cell>
              <StyledRaisedButton
                fullWidth
                type="submit"
                disabled={!dirty || isSubmitting || !isValid}
              >
                Save
              </StyledRaisedButton>
            </Cell>
            <Cell>
              <GoBackButton disabled={isSubmitting} />
            </Cell>
          </Grid>
        </Cell>
      </ManageTaskFormGrid>
    </Form>
  );
}

ManageTaskForm.propTypes = {
  activityDefinitions: PropTypes.array,
  subTasks: PropTypes.array,
  practitioners: PropTypes.array,
  taskStatus: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  requestIntent: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  requestPriority: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  taskPerformerType: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  eventTypes: PropTypes.arrayOf(PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  })),
  tasksByPatient: PropTypes.arrayOf(PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  })),
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  isMainTask: PropTypes.bool.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  organization: PropTypes.object,
  requester: PropTypes.object,
};

export default ManageTaskForm;

function getResourceName(resource) {
  if (resource === undefined || resource === null) {
    return EMPTY_STRING;
  }
  const names = resource.name;
  return names && names
    .map((name) => {
      const firstName = name.firstName !== EMPTY_STRING ? name.firstName : EMPTY_STRING;
      const lastName = name.lastName !== EMPTY_STRING ? name.lastName : EMPTY_STRING;
      return `${firstName} ${lastName}`;
    })
    .join(', ');
}
