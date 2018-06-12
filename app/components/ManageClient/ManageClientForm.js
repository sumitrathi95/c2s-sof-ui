import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';

import SelectField from 'components/SelectField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import FileInputComponentField from 'components/FileInputComponentField';
import TextField from 'components/TextField';
import messages from './messages';

function ManageClientForm(props) {
  /* const imageFormat = new RegExp('(/(gif|jpg|jpeg|tiff|png)$/i)');
  const imageSize = 500;*/
  const {
    handleCloseDialog,
    onSaveClient,
  } = props;
  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          onSaveClient(values, actions);
          handleCloseDialog();
        }}
        validationSchema={yup.object().shape({
          client_id: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          client_type: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          scope: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          name: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          redirect_uri: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          appLaunchUrl: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          client_secret: yup.string()
            .when('client_type', {
              is: 'CREDENTIAL',
              then: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
            }),
          // TODO: Fix validation
          /* appIcon: yup.array().of(yup.object().shape({
            size: yup.number()
              .lessThan(imageSize, (<FormattedMessage {...messages.validation.imageSize} values={{ imageSize }} />)),
            name: yup.string()
              .matches(imageFormat, (<FormattedMessage {...messages.validation.imageFormat} />)),
          })),*/
        })}
        render={({ isSubmitting, dirty, isValid, values }) => (
          <Form>
            <Grid columns="1">
              <Cell>
                <SelectField
                  fullWidth
                  name="client_type"
                  hintText={<FormattedMessage {...messages.hintText.client_type} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.client_type} />}
                >
                  <MenuItem value={'PUBLIC'} primaryText="PUBLIC" />
                  <MenuItem value={'CREDENTIAL'} primaryText="CREDENTIAL" />
                </SelectField>
              </Cell>
              { values.client_type === 'CREDENTIAL' && <Cell>
                <TextField
                  fullWidth
                  name="client_secret"
                  hintText={<FormattedMessage {...messages.hintText.client_secret} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.client_secret} />}
                />
              </Cell>
              }
              <Cell>
                <TextField
                  fullWidth
                  name="client_id"
                  hintText={<FormattedMessage {...messages.hintText.client_id} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.client_id} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="name"
                  hintText={<FormattedMessage {...messages.hintText.name} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.name} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="appLaunchUrl"
                  hintText={<FormattedMessage {...messages.hintText.appLaunchUrl} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.appLaunchUrl} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="redirect_uri"
                  hintText={<FormattedMessage {...messages.hintText.redirect_uri} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.redirect_uri} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="scope"
                  hintText={<FormattedMessage {...messages.hintText.scopes} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.scopes} />}
                />
              </Cell>
              <Cell>
                <FileInputComponentField
                  name="appIcon"
                  labelText="App Logo"
                  accept="image/*"
                  imageStyle={{ width: 150, height: 150 }}
                  buttonComponent={<StyledRaisedButton> Select Image </StyledRaisedButton>}
                />
              </Cell>
              <Cell>
                <StyledRaisedButton
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  <FormattedMessage {...messages.saveButton} />
                </StyledRaisedButton>
                <StyledFlatButton type="reset" onClick={handleCloseDialog}>
                  <FormattedMessage {...messages.cancelButton} />
                </StyledFlatButton>
              </Cell>
            </Grid>
          </Form>
        )}
      />
    </div>
  );
}

ManageClientForm.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  onSaveClient: PropTypes.func.isRequired,
};

export default ManageClientForm;

