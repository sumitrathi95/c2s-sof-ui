/**
 *
 * ManageOrganizationPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, Formik } from 'formik';
import yup from 'yup';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import injectSaga from 'utils/injectSaga';
import {
  ORGANIZATIONIDENTIFIERSYSTEM,
  ORGANIZATIONSTATUS,
  TELECOMSYSTEM,
  TELECOMUSE,
  USPSSTATES,
} from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import {
  makeSelectOrganizationIdentifierSystems,
  makeSelectOrganizationStatuses,
  makeSelectTelecomSystems,
  makeSelectTelecomUses,
  makeSelectUspsStates,
} from 'containers/App/lookupSelectors';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import { getOrganization } from 'containers/App/contextActions';
import GoBackButton from 'components/GoBackButton';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import StyledRaisedButton from 'components/StyledRaisedButton';
import PageContent from 'components/PageContent';
import FormSubtitle from 'components/FormSubtitle';
import AddMultipleAddresses from 'components/AddMultipleAddresses';
import AddMultipleTelecoms from 'components/AddMultipleTelecoms';
import saga from './saga';
import messages from './messages';
import { createOrganization, updateOrganization } from './actions';
import ManageOrganizationFormGrid from './ManageOrganizationFormGrid';
import ManageOrganizationFormCell from './ManageOrganizationFormCell';

const minimumNumberOfAddresses = 1;
const minimumNumberOfTelecoms = 1;

export class ManageOrganizationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static validationSchemaShape = {
    name: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    addresses: yup.array()
      .required((<FormattedMessage {...messages.validation.required} />))
      .min(minimumNumberOfAddresses, (
        <FormattedMessage {...messages.validation.minAddresses} values={{ minimumNumberOfAddresses }} />)),
    telecoms: yup.array()
      .required((<FormattedMessage {...messages.validation.required} />))
      .min(minimumNumberOfTelecoms, (
        <FormattedMessage {...messages.validation.minTelecoms} values={{ minimumNumberOfTelecoms }} />)),
    identifierSystem: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    identifierValue: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
  };
  static validationSchemaCreate = yup.object().shape(ManageOrganizationPage.validationSchemaShape);

  static validationSchemaUpdate = yup.object().shape({
    ...ManageOrganizationPage.validationSchemaShape,
    status: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
  });

  constructor(props) {
    super(props);
    this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
    const { match: { params: { id } }, organization } = this.props;
    if ((id && !organization) || (id && organization && organization.logicalId && organization.logicalId !== id)) {
      this.props.getOrganization(id);
    }
  }

  handleSubmitCreate(values, actions) {
    this.props.createOrganization(values, () => actions.setSubmitting(false));
  }

  handleSubmitUpdate(values, actions) {
    const { match: { params: { id } } } = this.props;
    this.props.updateOrganization(id, values, () => {
      actions.setSubmitting(false);
      this.props.getOrganization(id);
    });
  }

  render() {
    const { match: { params: { id } }, uspsStates, organizationIdentifierSystems, organizationStatuses, telecomSystems, telecomUses, organization } = this.props;
    let initialValues = {};
    let editingOrganization = null;
    // if id in the route exists but no initial data to edit
    if (id && organization && organization.logicalId && organization.logicalId === id) {
      editingOrganization = organization;
    }
    if (editingOrganization) {
      const {
        name,
        identifiers: [{ system: identifierSystem, value: identifierValue }],
        addresses,
        telecoms,
        active,
      } = editingOrganization;
      initialValues = {
        name,
        status: active.toString(),
        identifierSystem,
        identifierValue,
        telecoms,
        addresses,
      };
    }

    return (
      <Page>
        <Helmet>
          <title>Manage Organization</title>
          <meta name="description" content="Manage Organization page of Omnibus Care Plan application" />
        </Helmet>
        {((id && editingOrganization) || !id) &&
        <div>
          <PageHeader
            title={editingOrganization ?
              <FormattedMessage {...messages.updateModeTitle} /> :
              <FormattedMessage {...messages.createModeTitle} />}
          />
          <PageContent>
            <Formik
              validationSchema={id ? ManageOrganizationPage.validationSchemaUpdate : ManageOrganizationPage.validationSchemaCreate}
              initialValues={initialValues}
              onSubmit={editingOrganization ? this.handleSubmitUpdate : this.handleSubmitCreate}
              render={(props) => {
                const { isSubmitting, dirty, isValid, errors, values } = props;
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
                return (
                  <Form>
                    <ManageOrganizationFormGrid columns={12}>
                      <ManageOrganizationFormCell width={12}>
                        <FormSubtitle margin="1vh 0 0 0">
                          <FormattedMessage {...messages.subtitle} />
                        </FormSubtitle>
                      </ManageOrganizationFormCell>
                      <ManageOrganizationFormCell left={1} width={4}>
                        <TextField
                          name="name"
                          floatingLabelText={<FormattedMessage {...messages.form.name} />}
                          fullWidth
                        />
                      </ManageOrganizationFormCell>
                      <ManageOrganizationFormCell left={5} width={3}>
                        <Grid columns="1fr 2fr" gap="">
                          <Cell>
                            <SelectField
                              floatingLabelText={<FormattedMessage {...messages.form.identifierSystem} />}
                              name="identifierSystem"
                              fullWidth
                            >
                              {organizationIdentifierSystems && organizationIdentifierSystems.map(({ uri, display }) => (
                                <MenuItem
                                  key={uri}
                                  value={uri}
                                  primaryText={display}
                                />))}
                            </SelectField>
                          </Cell>
                          <Cell>
                            <TextField
                              floatingLabelText={<FormattedMessage {...messages.form.identifierValue} />}
                              fullWidth
                              name="identifierValue"
                            />
                          </Cell>
                        </Grid>
                      </ManageOrganizationFormCell>
                      {id &&
                      <ManageOrganizationFormCell left={8} width={2}>
                        <SelectField
                          floatingLabelText={<FormattedMessage {...messages.form.status} />}
                          fullWidth
                          name="status"
                        >
                          {organizationStatuses && organizationStatuses.map(({ code, display }) => (
                            <MenuItem
                              key={code.toString()}
                              value={code.toString()}
                              primaryText={display}
                            />))}
                        </SelectField>
                      </ManageOrganizationFormCell>}
                      <ManageOrganizationFormCell width={12}>
                        <AddMultipleAddresses{...addAddressesProps} />
                      </ManageOrganizationFormCell>
                      <ManageOrganizationFormCell width={12}>
                        <AddMultipleTelecoms {...addTelecomsProps} />
                      </ManageOrganizationFormCell>
                      <ManageOrganizationFormCell top={5} left={1} width={4}>
                        <Grid columns={2}>
                          <Cell>
                            <StyledRaisedButton
                              fullWidth
                              type="submit"
                              disabled={!dirty || isSubmitting || !isValid}
                            >
                              {isSubmitting ?
                                <FormattedMessage {...messages.form.savingButton} /> :
                                <FormattedMessage {...messages.form.saveButton} />}
                            </StyledRaisedButton>
                          </Cell>
                          <Cell>
                            <GoBackButton
                              label={<FormattedMessage {...messages.form.cancelButton} />}
                            />
                          </Cell>
                        </Grid>
                      </ManageOrganizationFormCell>
                    </ManageOrganizationFormGrid>
                  </Form>
                );
              }}
            />
          </PageContent>
        </div>
        }
      </Page>
    );
  }
}

ManageOrganizationPage.propTypes = {
  getLookups: PropTypes.func.isRequired,
  createOrganization: PropTypes.func.isRequired,
  updateOrganization: PropTypes.func.isRequired,
  getOrganization: PropTypes.func.isRequired,
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  organizationIdentifierSystems: PropTypes.arrayOf(PropTypes.shape({
    uri: PropTypes.string.isRequired,
    oid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  organizationStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.bool.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomUses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  organization: PropTypes.shape({
    active: PropTypes.bool,
    addresses: PropTypes.arrayOf(PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      postalCode: PropTypes.string,
      stateCode: PropTypes.string,
      use: PropTypes.string,
    })),
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      display: PropTypes.string,
      oid: PropTypes.string,
      priority: PropTypes.number,
    })),
    logicalId: PropTypes.string,
    name: PropTypes.string,
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })),
  }),
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  organizationIdentifierSystems: makeSelectOrganizationIdentifierSystems(),
  organizationStatuses: makeSelectOrganizationStatuses(),
  telecomSystems: makeSelectTelecomSystems(),
  telecomUses: makeSelectTelecomUses(),
  organization: makeSelectOrganization(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([USPSSTATES, TELECOMSYSTEM, TELECOMUSE, ORGANIZATIONIDENTIFIERSYSTEM, ORGANIZATIONSTATUS])),
    createOrganization: (organization, callback) => dispatch(createOrganization(organization, callback)),
    updateOrganization: (id, organization, callback) => dispatch(updateOrganization(id, organization, callback)),
    getOrganization: (logicalId) => dispatch(getOrganization(logicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'manageOrganizationPage', saga });

export default compose(
  withSaga,
  withConnect,
)(ManageOrganizationPage);
