import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';

import { POSTAL_CODE_PATTERN } from 'containers/App/constants';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import messages from './messages';

function AddMultipleAddressesForm(props) {
  const postalCodePattern = new RegExp(POSTAL_CODE_PATTERN);

  const {
    uspsStates,
    initialValues,
    onAddAddress,
    onRemoveAddress,
    handleCloseDialog,
  } = props;

  return (
    <div>
      <Formik
        onSubmit={(values) => {
          if (initialValues) {
            onRemoveAddress(initialValues.index);
          }
          onAddAddress(values);
          handleCloseDialog();
        }}
        initialValues={{ ...(initialValues || {}).address }}
        validationSchema={yup.object().shape({
          line1: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          city: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          stateCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          postalCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .matches(postalCodePattern, (<FormattedMessage {...messages.validation.postalCode} />)),
          countryCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Grid columns="repeat(2, 1fr)">
              <Cell>
                <TextField
                  fullWidth
                  name="line1"
                  hintText={<FormattedMessage {...messages.hintText.line1} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.line1} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="line2"
                  hintText={<FormattedMessage {...messages.hintText.line2} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.line2} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="city"
                  hintText={<FormattedMessage {...messages.hintText.city} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.city} />}
                />
              </Cell>
              <Cell>
                <SelectField
                  fullWidth
                  name="stateCode"
                  hintText={<FormattedMessage {...messages.hintText.stateCode} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.stateCode} />}
                >
                  {uspsStates && uspsStates.map((uspsState) =>
                    <MenuItem key={uspsState.code} value={uspsState.code} primaryText={uspsState.display} />,
                  )}
                </SelectField>
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="postalCode"
                  hintText={<FormattedMessage {...messages.hintText.postalCode} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.postalCode} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="countryCode"
                  hintText={<FormattedMessage {...messages.hintText.countryCode} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.countryCode} />}
                />
              </Cell>
              <Cell>
                <StyledRaisedButton
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  <FormattedMessage {...messages.saveAddressButton} />
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

AddMultipleAddressesForm.propTypes = {
  onAddAddress: PropTypes.func.isRequired,
  onRemoveAddress: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    index: PropTypes.number.isRequired,
    address: PropTypes.object.isRequired,
  }),
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
};

export default AddMultipleAddressesForm;

