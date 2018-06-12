/**
 *
 * ManageRelatedPerson
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';
import { FormattedMessage } from 'react-intl';

import Util from 'utils/Util';
import messages from './messages';
import ManageRelatedPersonForm from './ManageRelatedPersonForm';
import { TEXT_MIN_LENGTH } from './constants';

function ManageRelatedPerson(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const {
    onSave,
    uspsStates,
    patientIdentifierSystems,
    administrativeGenders,
    telecomUses,
    telecomSystems,
    relationshipTypes,
    patient,
    editMode,
    selectedRelatedPerson,
  } = props;
  const manageRelatedPersonFormProps = {
    onSave,
    uspsStates,
    patientIdentifierSystems,
    administrativeGenders,
    telecomSystems,
    telecomUses,
    relationshipTypes,
    patient,
  };
  return (
    <div>
      {((editMode && selectedRelatedPerson) || !editMode) &&
      <Formik
        initialValues={setInitialValues(selectedRelatedPerson)}
        onSubmit={(values, actions) => {
          const relatedPerson = mapToRelatedPerson(values, patient, administrativeGenders, relationshipTypes);
          onSave(relatedPerson, actions);
        }}
        validationSchema={() =>
          yup.lazy((values) => {
            let startDate = new Date();
            if (values.startDate) {
              startDate = values.startDate;
            }
            return yup.object().shape({
              firstName: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(minimumLength, (
                  <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
              lastName: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(minimumLength, (
                  <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
              relationshipCode: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              birthDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />)),
              genderCode: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              startDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
              endDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(startDate.toLocaleDateString(), (<FormattedMessage {...messages.validation.minEndDate} />)),
              identifierType: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              identifierValue: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(minimumLength, (
                  <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
            });
          })}
        render={(formikProps) => <ManageRelatedPersonForm {...formikProps} {...manageRelatedPersonFormProps} />}
      />
      }
    </div>
  );
}

ManageRelatedPerson.propTypes = {
  onSave: PropTypes.func.isRequired,
  uspsStates: PropTypes.array.isRequired,
  patientIdentifierSystems: PropTypes.array.isRequired,
  administrativeGenders: PropTypes.array.isRequired,
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
  relationshipTypes: PropTypes.array.isRequired,
  patient: PropTypes.object,
  editMode: PropTypes.bool.isRequired,
  selectedRelatedPerson: PropTypes.object,
};

export default ManageRelatedPerson;

function mapToRelatedPerson(capturedFormData, patient, administrativeGenders, relationshipTypes) {
  const {
    startDate,
    endDate,
    active,
    firstName,
    lastName,
    relationshipCode,
    telecoms,
    addresses,
    genderCode,
    birthDate,
    identifierType,
    identifierValue,
  } = capturedFormData;
  const selectedAdministrativeGenders = find(administrativeGenders, { code: genderCode });
  const genderValue = selectedAdministrativeGenders.display;
  const selectedRelationshipTypes = find(relationshipTypes, { code: relationshipCode });
  const relationshipValue = selectedRelationshipTypes.display;
  return {
    firstName,
    lastName,
    relationshipCode,
    telecoms,
    addresses,
    genderCode,
    genderValue,
    relationshipValue,
    identifierType,
    identifierValue,
    active,
    patient: patient.id,
    startDate: startDate.toLocaleDateString(),
    endDate: endDate.toLocaleDateString(),
    birthDate: birthDate.toLocaleDateString(),
  };
}

function setInitialValues(selectedRelatedPerson) {
  let initialValues = null;
  if (!isEmpty(selectedRelatedPerson)) {
    initialValues = merge(
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'active'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'firstName'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'lastName'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'relationshipCode'),
      mapRelatedPersonToDate(selectedRelatedPerson, 'birthDate'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'genderCode'),
      mapRelatedPersonToDate(selectedRelatedPerson, 'startDate'),
      mapRelatedPersonToDate(selectedRelatedPerson, 'endDate'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'identifierType'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'identifierValue'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'addresses'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'telecoms'),
    );
  }
  return Util.pickByIdentity(initialValues);
}

function mapRelatedPersonToFormFields(selectedRelatedPerson, fieldName) {
  const fieldObject = {};
  if (!isUndefined(selectedRelatedPerson[fieldName])) {
    fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(selectedRelatedPerson[fieldName]);
  }
  return fieldObject;
}

function mapRelatedPersonToDate(selectedRelatedPerson, fieldName) {
  const fieldObject = {};
  if (!isUndefined(selectedRelatedPerson[fieldName])) {
    fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(selectedRelatedPerson[fieldName]) && new Date(selectedRelatedPerson[fieldName]);
  }
  return fieldObject;
}
