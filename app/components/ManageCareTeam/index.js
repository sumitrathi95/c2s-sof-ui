/**
 *
 * ManageCareTeam
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import yup from 'yup';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import Util from 'utils/Util';
import { TEXT_MIN_LENGTH } from 'containers/App/constants';
import ManageCareTeamForm from './ManageCareTeamForm';
import messages from './messages';

function ManageCareTeam(props) {
  const {
    patient,
    careTeam,
    editMode,
    careTeamCategories,
    careTeamReasons,
    careTeamStatuses,
    handleOpen,
    onSave,
    selectedParticipants,
    initialSelectedParticipants,
    removeParticipant,
  } = props;
  const minimumLength = TEXT_MIN_LENGTH;
  const propsFromContainer = {
    patient,
    careTeamCategories,
    careTeamReasons,
    careTeamStatuses,
    handleOpen,
    selectedParticipants,
    initialSelectedParticipants,
    removeParticipant,
  };

  return (
    <div>
      {patient &&
      <div>
        {((editMode && careTeam) || !editMode) &&
        <Formik
          isInitialValid={editMode}
          initialValues={setFormData(careTeam)}
          onSubmit={(values, actions) => {
            onSave(values, actions);
          }}
          validationSchema={() =>
            yup.lazy((values) => {
              let startDate = new Date();
              if (values.startDate) {
                startDate = values.startDate;
              }
              return yup.object().shape({
                careTeamName: yup.string()
                  .required((<FormattedMessage {...messages.validation.required} />))
                  .min(minimumLength, (
                    <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
                category: yup.string()
                  .required((<FormattedMessage {...messages.validation.required} />)),
                status: yup.string()
                  .required((<FormattedMessage {...messages.validation.required} />)),
                startDate: yup.date()
                  .required((<FormattedMessage {...messages.validation.required} />))
                  .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
                endDate: yup.date()
                  .required((<FormattedMessage {...messages.validation.required} />))
                  .min(startDate.toLocaleDateString(), (<FormattedMessage {...messages.validation.minEndDate} />)),
              });
            })}
          render={(formikProps) => <ManageCareTeamForm {...formikProps} {...propsFromContainer} />}
        />
        }
      </div>
      }
    </div>
  );
}

ManageCareTeam.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  careTeam: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  careTeamCategories: PropTypes.array.isRequired,
  careTeamReasons: PropTypes.array.isRequired,
  careTeamStatuses: PropTypes.array.isRequired,
  selectedParticipants: PropTypes.array,
  initialSelectedParticipants: PropTypes.array,
};

function setFormData(careTeam) {
  let formData = null;
  if (!isEmpty(careTeam)) {
    formData = {
      careTeamName: careTeam.name,
      category: careTeam.categoryCode,
      status: careTeam.statusCode,
      startDate: careTeam.startDate && new Date(careTeam.startDate),
      endDate: careTeam.endDate && new Date(careTeam.endDate),
      reason: careTeam.reasonCode,
    };
  }
  return Util.pickByIdentity(formData);
}

export default ManageCareTeam;
