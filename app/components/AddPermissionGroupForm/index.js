/**
 *
 * AddPermissionGroupForm
 *
 */

import React from 'react';
import { Form, Formik } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import TextField from 'components/TextField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import PropTypes from 'prop-types';
import PermissionGroupInfoSection from './PermissionGroupInfoSection';
import messages from './messages';
import PermissionGroupPageTitle from './PermissonGroupPageTitle';
import AddPermissionsSection from './AddPermissionsSection';
import PermissionsList from './PermissionsList';

function AddPermissionGroupForm(props) { // eslint-disable-line react/prefer-stateless-function
  const {
    handleCloseDialog,
  } = props;
  return (
    <div>
      <Formik
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <PermissionGroupInfoSection>
              <Grid columns={3}>
                <Cell width={1}>
                  <TextField
                    name="value"
                    hintText={<FormattedMessage {...messages.hintText.groupName} />}
                    floatingLabelText={<FormattedMessage {...messages.floatingLabelText.groupName} />}
                    fullWidth
                  />
                </Cell>
                <Cell width={3}>
                  <TextField
                    name="value"
                    hintText={<FormattedMessage {...messages.hintText.description} />}
                    floatingLabelText={<FormattedMessage {...messages.floatingLabelText.description} />}
                    fullWidth
                    rows={3}
                    rowsMax={6}
                    multiLine
                  />
                </Cell>
              </Grid>
            </PermissionGroupInfoSection>
            <PermissionGroupPageTitle>Permissions</PermissionGroupPageTitle>
            <AddPermissionsSection>
              <PermissionsList />
            </AddPermissionsSection>
            <div>
              <StyledRaisedButton
                type="submit"
                disabled={!dirty || isSubmitting || !isValid}
              >
                <FormattedMessage {...messages.saveButton} />
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

AddPermissionGroupForm.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
};

export default AddPermissionGroupForm;
