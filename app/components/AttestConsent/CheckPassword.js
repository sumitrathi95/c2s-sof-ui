/**
 *
 * CheckPassword
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import Close from '@material-ui/icons/Close';

import TextField from 'components/TextField';
import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledIconButton from 'components/StyledIconButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledTooltip from 'components/StyledTooltip';
import messages from './messages';

function CheckPassword(props) {
  const { callback, checkPassword } = props;
  return (
    <div>
      <DialogTitle>
        <HorizontalAlignment position={'end'}>
          <StyledTooltip title="Close">
            <StyledIconButton onClick={callback}>
              <Close />
            </StyledIconButton>
          </StyledTooltip>
        </HorizontalAlignment>
        <FormattedMessage {...messages.authentication.header} />
      </DialogTitle>
      <DialogContent>
        <FormattedMessage {...messages.authentication.term} />
        <Formik
          onSubmit={(values, actions) => {
            checkPassword(values.password, actions);
          }}
          validationSchema={yup.object()
            .shape({
              password: yup
                .string()
                .required((<FormattedMessage {...messages.validation.required} />)),
            })
          }
          render={({ isSubmitting, dirty, isValid }) => (
            <Form>
              <TextField
                width="300px"
                name="password"
                type="password"
                hintText={<FormattedMessage {...messages.authentication.label} />}
                floatingLabelText={<FormattedMessage {...messages.authentication.label} />}
              />
              <div>
                <StyledRaisedButton
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  Continue
                </StyledRaisedButton>
              </div>
            </Form>
          )}
        />
      </DialogContent>
    </div>
  );
}

CheckPassword.propTypes = {
  callback: PropTypes.func.isRequired,
  checkPassword: PropTypes.func.isRequired,
};

export default CheckPassword;
