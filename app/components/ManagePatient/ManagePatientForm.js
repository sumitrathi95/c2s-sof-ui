import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import FormSubtitle from 'components/FormSubtitle';
import FieldGroupGrid from 'components/FieldGroupGrid';
import PrefixCell from 'components/FieldGroupGrid/PrefixCell';
import MainCell from 'components/FieldGroupGrid/MainCell';
import AddMultipleTelecoms from 'components/AddMultipleTelecoms';
import AddMultipleAddresses from 'components/AddMultipleAddresses';
import uniqueId from 'lodash/uniqueId';
import AddFlags from 'components/AddFlags';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import messages from './messages';
import ManagePatientFormGrid from './ManagePatientFormGrid';

function ManagePatientForm(props) {
  const {
    isSubmitting, dirty, isValid, values, errors,
    uspsStates, patientIdentifierSystems, administrativeGenders, usCoreRaces, usCoreEthnicities, usCoreBirthSexes, languages, telecomSystems, telecomUses,
    flagStatuses, flagCategories, practitioner, practitioners, organization,
  } = props;
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
  const addFlagsProps = {
    flagStatuses,
    flagCategories,
    errors,
    flags: values.flags,
    practitioner,
    patientName: (values.firstName !== undefined && values.lastName !== undefined) ? `${values.firstName} ${values.lastName}` : null,
  };
  const ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');

  return (
    <Form>
      <ManagePatientFormGrid>
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>
        <Cell area="contextGroup">
          <Grid columns={4} gap="30px">
            <InfoSection margin="4vh 0 0 0">
              <InlineLabel htmlFor={ORGANIZATION_NAME_HTML_ID}><FormattedMessage {...messages.floatingLabelText.organization} />&nbsp;
              </InlineLabel>
              <span id={ORGANIZATION_NAME_HTML_ID}>{organization && organization.name}</span>
            </InfoSection>
            <SelectField
              fullWidth
              name="careManager"
              hintText={<FormattedMessage {...messages.hintText.careManager} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.careManager} />}
            >
              {practitioners && practitioners.map((aPractitioner) =>
                (<MenuItem
                  key={uniqueId()}
                  value={aPractitioner.reference}
                  primaryText={aPractitioner.display}
                />),
              )}
            </SelectField>
          </Grid>
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
        <Cell area="language">
          <SelectField
            fullWidth
            name="language"
            hintText={<FormattedMessage {...messages.hintText.language} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.language} />}
          >
            {languages && languages.map((languageType) =>
              <MenuItem key={languageType.code} value={languageType.code} primaryText={languageType.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="race">
          <SelectField
            fullWidth
            name="race"
            hintText={<FormattedMessage {...messages.hintText.race} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.race} />}
          >
            {usCoreRaces && usCoreRaces.map((raceType) =>
              <MenuItem key={raceType.code} value={raceType.code} primaryText={raceType.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="ethnicity">
          <SelectField
            fullWidth
            name="ethnicity"
            hintText={<FormattedMessage {...messages.hintText.ethnicity} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.ethnicity} />}
          >
            {usCoreEthnicities && usCoreEthnicities.map((ethnicityType) =>
              <MenuItem key={ethnicityType.code} value={ethnicityType.code} primaryText={ethnicityType.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="birthSex">
          <SelectField
            fullWidth
            name="birthSex"
            hintText={<FormattedMessage {...messages.hintText.birthSex} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.birthSex} />}
          >
            {usCoreBirthSexes && usCoreBirthSexes.map((birthsexType) =>
              <MenuItem key={birthsexType.code} value={birthsexType.code} primaryText={birthsexType.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="addresses">
          <AddMultipleAddresses{...addAddressesProps} />
        </Cell>
        <Cell area="contacts">
          <AddMultipleTelecoms {...addTelecomsProps} />
        </Cell>
        <Cell area="flags">
          <AddFlags {...addFlagsProps} />
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
      </ManagePatientFormGrid>
    </Form>
  );
}

ManagePatientForm.propTypes = {
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
  usCoreRaces: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  usCoreEthnicities: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  usCoreBirthSexes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  languages: PropTypes.arrayOf(PropTypes.shape({
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
  flagStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  flagCategories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  practitioner: PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }),
  practitioners: PropTypes.arrayOf(PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  })),
  organization: PropTypes.object,
};

export default ManagePatientForm;
