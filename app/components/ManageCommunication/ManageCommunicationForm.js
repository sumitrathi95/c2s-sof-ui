import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import Util from 'utils/Util';
import ErrorText from 'components/ErrorText';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import { uniqueId } from 'lodash';
import MenuItem from 'material-ui/MenuItem';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRowColumn from 'components/TableRowColumn';
import TableRow from 'components/TableRow';
import { getRoleName } from 'utils/CommunicationUtils';
import isEmpty from 'lodash/isEmpty';
import FormGrid from 'components/FormGrid';
import FormCell from 'components/FormCell';
import Checkbox from 'components/Checkbox';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import TextField from 'components/TextField';
import Padding from 'components/Padding/index';
import SelectField from 'components/SelectField';
import messages from './messages';

function ManageCommunicationForm(props) {
  const {
    isSubmitting,
    dirty,
    isValid,
    communicationStatus,
    communicationNotDoneReasons,
    communicationMedia,
    handleOpen,
    selectedRecipients,
    handleRemoveRecipient,
    selectedPatient,
    initialSelectedRecipients,
  } = props;
  const hasRecipients = !isEmpty(selectedRecipients);
  const handleRemoveSelectedRecipient = (check, reference) => {
    handleRemoveRecipient(check, reference);
  };

  function createRecipientTableRows() {
    return selectedRecipients && selectedRecipients.map((recipient) => (
      <TableRow key={uniqueId()}>
        <TableRowColumn>
          {recipient.display}
        </TableRowColumn>
        <TableRowColumn>
          {getRoleName(recipient.reference)}
        </TableRowColumn>
        <TableRowColumn>
          <StyledRaisedButton onClick={() => handleRemoveSelectedRecipient(false, recipient.reference)}>
            <FormattedMessage {...messages.form.removeRecipient} />
          </StyledRaisedButton>
        </TableRowColumn>
      </TableRow>
    ));
  }

  function isDirty(formState, recipients, initialRecipients) {
    let isFormDirty = formState;
    const identityOfArray = 'reference';
    if (!Util.isUnorderedArraysEqual(recipients, initialRecipients, identityOfArray)) {
      isFormDirty = true;
    }
    return isFormDirty;
  }

  function getPatientName(patient) {
    let patientName = '';
    if (patient && patient.name && patient.name.length > 0) {
      const name = patient.name[0];
      patientName = (name && name.firstName && name.lastName) ? name.firstName.concat(' ').concat(name.lastName) : '';
    }
    return patientName;
  }

  return (
    <Form>
      <FormGrid columns={12}>
        <FormCell top={1} left={1} width={2}>
          <span>Patient: </span> {getPatientName(selectedPatient)}
        </FormCell>
        <FormCell top={2} left={1} width={4}>
          <Grid columns="2fr 2fr" gap="">
            <Cell>
              <TextField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.sender} />}
                fullWidth
                name="sender"
                disabled
              />
            </Cell>
          </Grid>
        </FormCell>
        <FormCell top={3} left={1} width={7}>
          <Grid columns="2fr 2fr 3fr" gap="">
            <Cell>
              <SelectField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.status} />}
                name="statusCode"
                fullWidth
              >
                {communicationStatus && communicationStatus.map((status) => (
                  <MenuItem key={uniqueId()} value={status.code} primaryText={status.display} />
                ))}
              </SelectField>
            </Cell>
            <Cell>
              <TextField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.topic} />}
                fullWidth
                name="topic"
                disabled
              />
            </Cell>
            <Cell>
              <TextField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.context} />}
                fullWidth
                name="episodeOfCareCode"
                disabled
              />
            </Cell>
          </Grid>
        </FormCell>
        <FormCell top={4} left={1} width={6}>
          <Grid columns="3fr 3fr" gap="">
            <Cell>
              <Padding top={'35px'}>
                <Checkbox
                  name="notDone"
                  label={<FormattedMessage {...messages.form.floatingLabelText.notDone} />}
                >
                </Checkbox>
              </Padding>
            </Cell>
            <SelectField
              floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.notDoneReason} />}
              name="notDoneReasonCode"
              fullWidth
            >
              {communicationNotDoneReasons && communicationNotDoneReasons.map((communicationNotDoneReason) => (
                <MenuItem key={uniqueId()} value={communicationNotDoneReason.code} primaryText={communicationNotDoneReason.display} />
              ))}
            </SelectField>
          </Grid>
        </FormCell>
        <FormCell top={5} left={1} width={6}>
          <Grid columns="3fr 3fr" gap="">
            <Cell>
              <TextField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.category} />}
                fullWidth
                name="categoryDisplay"
                disabled
              />
            </Cell>
            <Cell>
              <SelectField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.medium} />}
                name="mediumCode"
                fullWidth
              >
                {communicationMedia && communicationMedia.map((communicationMedium) => (
                  <MenuItem key={uniqueId()} value={communicationMedium.code} primaryText={communicationMedium.display} />
                ))}
              </SelectField>
            </Cell>
          </Grid>
        </FormCell>
        <FormCell top={6} left={1} width={2}>
          <Grid columns="2fr" gap="">
            <Cell>
              <TextField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.subject} />}
                fullWidth
                name="subject"
                disabled
              />
            </Cell>
          </Grid>
        </FormCell>
        <FormCell top={7} left={1} width={6}>
          <TextField
            floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.payloadContent} />}
            fullWidth
            name="payloadContent"
            multiLine
            rows={2}
            rowsMax={8}
          />
        </FormCell>
        <FormCell top={8} left={1} width={6}>
          <TextField
            floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.note} />}
            fullWidth
            name="note"
            multiLine
            rows={2}
            rowsMax={8}
          />
        </FormCell>
        <FormCell top={9} left={1} width={2}>
          <StyledRaisedButton
            fullWidth
            onClick={handleOpen}
          >
            <FormattedMessage {...messages.form.addRecipient} />
          </StyledRaisedButton>
        </FormCell>
        <FormCell top={11} left={1} width={10}>
          {selectedRecipients && selectedRecipients.length > 0 &&
          <Table>
            <TableHeader key={uniqueId()}>
              <TableHeaderColumn>{<FormattedMessage {...messages.recipientTableHeaderName} />}</TableHeaderColumn>
              <TableHeaderColumn>{<FormattedMessage {...messages.recipientTableHeaderRole} />}</TableHeaderColumn>
              <TableHeaderColumn>{<FormattedMessage {...messages.recipientTableHeaderAction} />}</TableHeaderColumn>
            </TableHeader>
            {createRecipientTableRows()}
          </Table>
          }
          {!hasRecipients &&
          <ErrorText>{hasRecipients ?
            '' : <FormattedMessage {...messages.validation.noRecipients} />}
          </ErrorText>
          }
        </FormCell>

        <FormCell top={12} left={1} width={2}>
          <Grid columns="1fr 1fr" gap="6vw">
            <Cell>
              <StyledRaisedButton
                type="submit"
                disabled={!isDirty(dirty, selectedRecipients, initialSelectedRecipients) || isSubmitting || !isValid || !hasRecipients}
              >
                {isSubmitting ?
                  <FormattedMessage {...messages.form.savingButton} /> :
                  <FormattedMessage {...messages.form.saveButton} />}
              </StyledRaisedButton>
            </Cell>
            <Cell>
              <GoBackButton
                label={<FormattedMessage {...messages.form.cancelButton} />}
                disabled={isSubmitting}
              />
            </Cell>
          </Grid>
        </FormCell>
      </FormGrid>
    </Form>
  );
}

ManageCommunicationForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  communicationStatus: PropTypes.array.isRequired,
  initialSelectedRecipients: PropTypes.array.isRequired,
  communicationNotDoneReasons: PropTypes.array.isRequired,
  communicationMedia: PropTypes.array.isRequired,
  handleOpen: PropTypes.func.isRequired,
  selectedRecipients: PropTypes.array,
  selectedPatient: PropTypes.object.isRequired,
  handleRemoveRecipient: PropTypes.func.isRequired,
};

export default ManageCommunicationForm;

