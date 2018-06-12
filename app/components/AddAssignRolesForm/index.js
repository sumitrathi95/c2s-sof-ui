/**
 *
 * AddAssignRolesForm
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import messages from './messages';
import AssignRolesList from './AssignRolesList';
import AddAssignRolesSection from './AddAssignRolesSection';

function AddAssignRolesForm(props) {
  const {
    handleCloseDialog,
  } = props;
  return (
    <div>
      <Formik
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <div>
              <AddAssignRolesSection>
                <AssignRolesList />
              </AddAssignRolesSection>
              <StyledRaisedButton
                type="submit"
                disabled={!dirty || isSubmitting || !isValid}
              >
                <FormattedMessage {...messages.addButton} />
              </StyledRaisedButton>
              <StyledFlatButton type="reset" onClick={handleCloseDialog}>
                <FormattedMessage {...messages.cancelButton} />
              </StyledFlatButton>
            </div>
          </Form>
        )}
      />
    </div>
  );
}

AddAssignRolesForm.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
};

export default AddAssignRolesForm;
