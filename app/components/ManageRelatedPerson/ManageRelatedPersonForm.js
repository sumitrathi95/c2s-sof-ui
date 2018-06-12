import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import uniqueId from 'lodash/uniqueId';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import StyledFormikCheckbox from 'components/StyledFormikCheckbox';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import InlineLabel from 'components/InlineLabel';
import FormSubtitle from 'components/FormSubtitle';
import FieldGroupGrid from 'components/FieldGroupGrid';
import PrefixCell from 'components/FieldGroupGrid/PrefixCell';
import MainCell from 'components/FieldGroupGrid/MainCell';
import AddMultipleAddresses from 'components/AddMultipleAddresses';
import AddMultipleTelecoms from 'components/AddMultipleTelecoms';
import { mapToPatientName } from 'utils/PatientUtils';
import messages from './messages';
import ManageRelatedPersonFormGrid from './ManageRelatedPersonFormGrid';

function ManageRelatedPersonForm(props) {
  const today = new Date();
  const {
    isSubmitting,
    dirty,
    isValid,
    values, errors,
    uspsStates,
    patientIdentifierSystems,
    administrativeGenders,
    telecomUses,
    telecomSystems,
    relationshipTypes,
    patient,
  } = props;
  const PATIENT_NAME_HTML_ID = uniqueId('patient_name_');
  const addAddressesProps = {
    uspsStates,
    errors,
    addresses: values.addresses,
  };
  const addTelecomsProps = {
    telecomSystems,
    telecomUses,
    errors,
    telecoms: values.telecoms,
  };
  return (
    <Form>
      <ManageRelatedPersonFormGrid>
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>
        <Cell area="patientName">
          <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}>
            <FormattedMessage {...messages.patientLabel} />&nbsp;
          </InlineLabel>
          <span id={PATIENT_NAME_HTML_ID}>{mapToPatientName(patient)}</span>
        </Cell>
        <Cell area="active">
          <StyledFormikCheckbox
            name="active"
            label={<FormattedMessage {...messages.active} />}
          />
        </Cell>
        <Cell area="firstName">
          <TextField
            fullWidth
            name="firstName"
            hintText={<FormattedMessage {...messages.hintText.firstName} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.firstName} />}
          />
        </Cell>
        <Cell area="lastName">
          <TextField
            fullWidth
            name="lastName"
            hintText={<FormattedMessage {...messages.hintText.lastName} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastName} />}
          />
        </Cell>
        <Cell area="relationshipCode">
          <SelectField
            fullWidth
            name="relationshipCode"
            hintText={<FormattedMessage {...messages.hintText.identifierType} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.relationshipType} />}
          >
            {relationshipTypes && relationshipTypes.reverse().map((relationshipType) => (
              <MenuItem
                key={relationshipType.code}
                value={relationshipType.code}
                primaryText={relationshipType.display}
              />),
            )}
          </SelectField>
        </Cell>
        <Cell area="birthDate">
          <DatePicker
            fullWidth
            name="birthDate"
            maxDate={new Date()}
            hintText={<FormattedMessage {...messages.hintText.dob} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.dob} />}
          />
        </Cell>
        <Cell area="genderCode">
          <SelectField
            fullWidth
            name="genderCode"
            hintText={<FormattedMessage {...messages.hintText.gender} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.gender} />}
          >
            {administrativeGenders && administrativeGenders.map((genderType) =>
              <MenuItem key={genderType.code} value={genderType.code} primaryText={genderType.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="startDate">
          <DatePicker
            fullWidth
            name="startDate"
            minDate={today}
            mode="landscape"
            hintText={<FormattedMessage {...messages.hintText.startDate} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startDate} />}
          />
        </Cell>
        <Cell area="endDate">
          <DatePicker
            fullWidth
            name="endDate"
            minDate={today}
            mode="landscape"
            hintText={<FormattedMessage {...messages.hintText.endDate} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endDate} />}
          />
        </Cell>
        <Cell area="identifierGroup">
          <FieldGroupGrid>
            <PrefixCell>
              <SelectField
                fullWidth
                name="identifierType"
                hintText={<FormattedMessage {...messages.hintText.identifierType} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierType} />}
              >
                {patientIdentifierSystems && patientIdentifierSystems.reverse().map((identifierType) =>
                  <MenuItem key={identifierType.oid} value={identifierType.oid} primaryText={identifierType.display} />,
                )}
              </SelectField>
            </PrefixCell>
            <MainCell>
              <TextField
                fullWidth
                name="identifierValue"
                hintText={<FormattedMessage {...messages.hintText.identifierValue} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierValue} />}
              />
            </MainCell>
          </FieldGroupGrid>
        </Cell>
        <Cell area="addresses">
          <AddMultipleAddresses{...addAddressesProps} />
        </Cell>
        <Cell area="contacts">
          <AddMultipleTelecoms {...addTelecomsProps} />
        </Cell>
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
      </ManageRelatedPersonFormGrid>
    </Form>
  );
}

ManageRelatedPersonForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  patientIdentifierSystems: PropTypes.arrayOf(PropTypes.shape({
    oid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  administrativeGenders: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  telecomUses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })).isRequired,
  relationshipTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  patient: PropTypes.object,
};

export default ManageRelatedPersonForm;
