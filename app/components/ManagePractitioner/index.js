/**
 *
 * ManagePractitioner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import yup from 'yup';

import Util from 'utils/Util';
import { TEXT_MIN_LENGTH } from './constants';
import ManagePractitionerForm from './ManagePractitionerForm';
import messages from './messages';

function ManagePractitioner(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const minimumOrganization = '1';

  const {
    onSave, uspsStates, identifierSystems, telecomSystems, telecomUses,
    providerRoles, providerSpecialties, editMode, practitioner, onPageClick, onSearch, currentPage,
    totalNumberOfPages, organizations, initialSearchOrganizationResult,
  } = props;
  const formData = {
    uspsStates,
    identifierSystems,
    telecomSystems,
    telecomUses,
    providerRoles,
    providerSpecialties,
    onPageClick,
    onSearch,
    organizations,
    currentPage,
    totalNumberOfPages,
    initialSearchOrganizationResult,
  };
  return (
    <div>
      {((editMode && practitioner) || !editMode) &&
      <Formik
        initialValues={(editMode && setFormData(practitioner)) || { practitionerRoles: [] }}
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={yup.object().shape({
          firstName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          lastName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          identifierType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierValue: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          practitionerRoles: yup.array()
            .of(
              yup.object().shape({
                organization: yup.object().shape({
                  reference: yup.string()
                    .required((<FormattedMessage {...messages.validation.required} />)),
                }),
                code: yup.string()
                  .required((<FormattedMessage {...messages.validation.required} />)),
                specialty: yup.string()
                  .required((<FormattedMessage {...messages.validation.required} />)),
                active: yup.boolean()
                  .required((<FormattedMessage {...messages.validation.required} />)),
              }),
            )
            .min(minimumOrganization, (
              <FormattedMessage
                {...messages.validation.minLengthAssociateOrganization}
                values={{ minimumOrganization }}
              />)),
        })}
        render={(formikProps) => <ManagePractitionerForm {...formikProps} {...formData} />}
      />
      }
    </div>
  );
}

ManagePractitioner.propTypes = {
  onSave: PropTypes.func.isRequired,
  uspsStates: PropTypes.array.isRequired,
  identifierSystems: PropTypes.array.isRequired,
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
  providerRoles: PropTypes.array.isRequired,
  providerSpecialties: PropTypes.array.isRequired,
  editMode: PropTypes.bool.isRequired,
  practitioner: PropTypes.any,
  onPageClick: PropTypes.func.isRequired,
  initialSearchOrganizationResult: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  }),
};

export default ManagePractitioner;

function setFormData(practitioner) {
  let formData = null;
  if (!isEmpty(practitioner)) {
    formData = merge(mapPractitionerToFirstIdentifier(practitioner), mapPractitionerToFirstName(practitioner),
      mapPractitionerToAddresses(practitioner), mapPractitionerToTelecoms(practitioner),
      mapPractitionerRoleFormData(practitioner));
  }
  return Util.pickByIdentity(formData);
}

function mapPractitionerToFirstIdentifier(practitioner) {
  let identifier = {};
  if (practitioner.identifiers.length > 0) {
    const firstIdentifier = practitioner.identifiers[0];
    identifier = {
      identifierType: Util.setEmptyStringWhenUndefined(firstIdentifier.system),
      identifierValue: Util.setEmptyStringWhenUndefined(firstIdentifier.value),
    };
  }
  return identifier;
}

function mapPractitionerToFirstName(practitioner) {
  let name = {};
  if (practitioner.name.length > 0) {
    const fName = practitioner.name[0];
    name = {
      firstName: Util.setEmptyStringWhenUndefined(fName.firstName),
      lastName: Util.setEmptyStringWhenUndefined(fName.lastName),
    };
  }
  return name;
}

function mapPractitionerToAddresses(practitioner) {
  return {
    addresses: practitioner.addresses,
  };
}

function mapPractitionerToTelecoms(practitioner) {
  return {
    telecoms: practitioner.telecoms,
  };
}

function mapPractitionerRoleFormData(practitioner) {
  const practitionerRoles = [];
  if (practitioner.practitionerRoles.length > 0) {
    practitioner.practitionerRoles.map(
      (practitionerRole) => {
        const code = practitionerRole.code.length > 0 && practitionerRole.code[0].code;
        const specialty = practitionerRole.specialty.length > 0 && practitionerRole.specialty[0].code;
        return practitionerRoles.push({
          organization: practitionerRole.organization,
          specialty,
          code,
          active: practitionerRole.active,
          logicalId: practitionerRole.logicalId,
        });
      },
    );
  }
  return { practitionerRoles };
}
