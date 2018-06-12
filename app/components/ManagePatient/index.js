/**
 *
 * ManagePatient
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import yup from 'yup';
import ManagePatientForm from './ManagePatientForm';
import messages from './messages';
import { TEXT_MIN_LENGTH } from './constants';

function ManagePatient(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const {
    onSave, patient, uspsStates, patientIdentifierSystems, administrativeGenders, usCoreRaces,
    usCoreEthnicities, usCoreBirthSexes, languages, telecomSystems, telecomUses, flagStatuses, practitioner,
    flagCategories, practitioners, organization,
  } = props;
  const managePatientFormProps = {
    uspsStates,
    patientIdentifierSystems,
    administrativeGenders,
    usCoreRaces,
    usCoreEthnicities,
    usCoreBirthSexes,
    languages,
    telecomSystems,
    telecomUses,
    flagStatuses,
    flagCategories,
    practitioner,
    practitioners,
    organization,
  };
  return (
    <div>
      <Formik
        initialValues={patient}
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={yup.object().shape({
          lastName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          firstName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          genderCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          birthDate: yup.date()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierValue: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          careManager: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={(formikProps) => (
          <ManagePatientForm {...formikProps} {...managePatientFormProps} />)}
      />
    </div>
  );
}

ManagePatient.propTypes = {
  onSave: PropTypes.func.isRequired,
  uspsStates: PropTypes.array.isRequired,
  patientIdentifierSystems: PropTypes.array.isRequired,
  administrativeGenders: PropTypes.array.isRequired,
  usCoreRaces: PropTypes.array.isRequired,
  usCoreEthnicities: PropTypes.array.isRequired,
  usCoreBirthSexes: PropTypes.array.isRequired,
  languages: PropTypes.array.isRequired,
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
  patient: PropTypes.object,
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

export default ManagePatient;
