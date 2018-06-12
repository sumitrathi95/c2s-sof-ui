/**
 *
 * ManagePatientPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import ManagePatient from 'components/ManagePatient';
import {
  makeSelectAdministrativeGenders,
  makeSelectFlagCategories,
  makeSelectFlagStatuses,
  makeSelectLanguages,
  makeSelectPatientIdentifierSystems,
  makeSelectTelecomSystems,
  makeSelectTelecomUses,
  makeSelectUsCoreBirthSexes,
  makeSelectUsCoreEthnicities,
  makeSelectUsCoreRaces,
  makeSelectUspsStates,
} from 'containers/App/lookupSelectors';
import {
  ADMINISTRATIVEGENDER,
  FLAG_CATEGORY,
  FLAG_STATUS,
  LANGUAGE,
  PATIENTIDENTIFIERSYSTEM,
  TELECOMSYSTEM,
  TELECOMUSE,
  USCOREBIRTHSEX,
  USCOREETHNICITY,
  USCORERACE,
  USPSSTATES,
} from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import { getPatient } from 'containers/App/contextActions';
import { makeSelectUser, makeSelectOrganization } from 'containers/App/contextSelectors';
import { makeSelectPatientSearchResult } from 'containers/Patients/selectors';
import { getPatientById } from 'containers/App/api';
import merge from 'lodash/merge';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { savePatient, getPractitioners } from './actions';
import { mapToFrontendPatientForm } from './api';
import { makeSelectPractitioners } from './selectors';

export class ManagePatientPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.getPractitioner = this.getPractitioner.bind(this);
  }

  componentDidMount() {
    this.props.getLookUpFormData();
    const { organization } = this.props;
    if (organization) {
      // get practitioners belonging to requester organization
      this.props.getPractitioners(organization.logicalId);
    }
  }
  getPractitioner() {
    const { user } = this.props;
    const id = (user && user.fhirResource) ? user.fhirResource.logicalId : null;
    const display = `${(user && user.fhirResource) ? `${user.fhirResource.name[0].firstName} ${user.fhirResource.name[0].lastName}` : null}`;
    return { id, display };
  }

  handleSave(patientFormData, actions) {
    if (this.props.organization) {
      merge(patientFormData, { organizationId: this.props.organization.logicalId });
    }
    this.props.onSaveForm(patientFormData, () => {
      actions.setSubmitting(false);
      this.props.getPatient(patientFormData.id);
    });
  }

  render() {
    const {
      match, patients, uspsStates, patientIdentifierSystems, administrativeGenders, usCoreRaces,
      usCoreEthnicities, usCoreBirthSexes, languages, telecomSystems, telecomUses, flagStatuses, flagCategories,
      practitioners, organization,
    } = this.props;
    const patientId = match.params.id;
    let patient = null;
    if (patientId) {
      patient = mapToFrontendPatientForm(getPatientById(patients, patientId));
    }
    const formProps = {
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
      patient,
      practitioner: this.getPractitioner(),
      practitioners,
      organization,
    };
    return (
      <Page>
        <Helmet>
          <title>Manage Patient</title>
          <meta name="description" content="Manage patient page of Omnibus Care Plan application" />
        </Helmet>
        <PageHeader
          title={match.params.id ?
            <FormattedMessage {...messages.updateHeader} /> :
            <FormattedMessage {...messages.createHeader} />}
        />
        <PageContent>
          <ManagePatient {...formProps} onSave={this.handleSave} />
        </PageContent>
      </Page>
    );
  }
}

ManagePatientPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onSaveForm: PropTypes.func,
  getPatient: PropTypes.func.isRequired,
  getLookUpFormData: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  patientIdentifierSystems: PropTypes.array,
  administrativeGenders: PropTypes.array,
  usCoreRaces: PropTypes.array,
  usCoreEthnicities: PropTypes.array,
  usCoreBirthSexes: PropTypes.array,
  languages: PropTypes.array,
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
  flagStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  flagCategories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  patients: PropTypes.any,
  practitioners: PropTypes.arrayOf((PropTypes.shape({
    reference: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  }))),
  getPractitioners: PropTypes.func.isRequired,
  user: PropTypes.object,
  organization: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  patientIdentifierSystems: makeSelectPatientIdentifierSystems(),
  administrativeGenders: makeSelectAdministrativeGenders(),
  usCoreRaces: makeSelectUsCoreRaces(),
  usCoreEthnicities: makeSelectUsCoreEthnicities(),
  usCoreBirthSexes: makeSelectUsCoreBirthSexes(),
  languages: makeSelectLanguages(),
  telecomSystems: makeSelectTelecomSystems(),
  telecomUses: makeSelectTelecomUses(),
  flagStatuses: makeSelectFlagStatuses(),
  flagCategories: makeSelectFlagCategories(),
  patients: makeSelectPatientSearchResult(),
  practitioners: makeSelectPractitioners(),
  user: makeSelectUser(),
  organization: makeSelectOrganization(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSaveForm: (patientFormData, handleSubmitting) => {
      dispatch(savePatient(patientFormData, handleSubmitting));
    },
    getLookUpFormData: () => dispatch(getLookupsAction([USPSSTATES, PATIENTIDENTIFIERSYSTEM, ADMINISTRATIVEGENDER,
      USCORERACE, USCOREETHNICITY, USCOREBIRTHSEX, LANGUAGE, TELECOMSYSTEM, TELECOMUSE, FLAG_STATUS, FLAG_CATEGORY])),
    getPatient: (id) => dispatch(getPatient(id)),
    getPractitioners: (organizationId) => dispatch(getPractitioners(organizationId)),

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'managePatientPage', reducer });
const withSaga = injectSaga({ key: 'managePatientPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagePatientPage);
