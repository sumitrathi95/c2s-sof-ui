/**
 *
 * ManageCareTeamPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ManageCareTeam from 'components/ManageCareTeam';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import { CARETEAMCATEGORY, CARETEAMREASON, CARETEAMSTATUS } from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import SearchParticipant from 'containers/SearchParticipant';
import { makeSelectSelectedParticipants } from 'containers/SearchParticipant/selectors';
import { initializeSearchParticipantResult, removeParticipant } from 'containers/SearchParticipant/actions';
import {
  makeSelectCareTeamCategories,
  makeSelectCareTeamReasons,
  makeSelectCareTeamStatuses,
} from 'containers/App/lookupSelectors';
import { makeSelectOrganization, makeSelectPatient } from 'containers/App/contextSelectors';
import { getCareTeam, initializeManageCareTeam, saveCareTeam } from './actions';
import { makeSelectCareTeam } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { mapToEditParticipants } from './api';

export class ManageCareTeamPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      member: '',
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleRemoveParticipant = this.handleRemoveParticipant.bind(this);
  }

  componentDidMount() {
    this.props.getLookUpFormData();
    // TODO: refresh patient context?
    // const queryObj = queryString.parse(this.props.location.search);
    // const patientId = queryObj.patientId;
    // if (patientId) {
    //   this.props.getPatient(patientId);
    // }
    const careTeamId = this.props.match.params.id;
    if (careTeamId) {
      this.props.getCareTeam(careTeamId);
    }
  }

  componentWillUnmount() {
    this.props.initializeManageCareTeam();
  }

  handleSave(careTeamFormData, actions) {
    const patientId = this.props.patient.id;
    if (patientId) {
      merge(careTeamFormData, { patientId });
    }
    if (this.props.organization) {
      merge(careTeamFormData, { managingOrganization: this.props.organization.logicalId });
    }
    const careTeamId = this.props.match.params.id;
    if (careTeamId) {
      merge(careTeamFormData, { careTeamId });
    }
    // Add selected participants to form data
    const selectedParticipants = this.props.selectedParticipants;
    merge(careTeamFormData, { participants: selectedParticipants });
    this.props.onSaveCareTeam(careTeamFormData, () => actions.setSubmitting(false));
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleOpen() {
    this.setState({ open: true });
    this.props.initializeSearchParticipantResult();
  }

  handleRemoveParticipant(participant) {
    this.props.removeParticipant(participant);
  }

  render() {
    const {
      match,
      patient,
      organization,
      selectedCareTeam,
      careTeamCategories,
      careTeamStatuses,
      careTeamReasons,
      selectedParticipants,
    } = this.props;
    const editMode = !isUndefined(match.params.id);

    let careTeam = null;
    let initialSelectedParticipants = [];
    if (editMode && selectedCareTeam) {
      careTeam = selectedCareTeam;
      initialSelectedParticipants = mapToEditParticipants(careTeam.participants);
    }
    const manageCareTeamProps = {
      patient,
      organization,
      careTeam,
      editMode,
      careTeamCategories,
      careTeamReasons,
      careTeamStatuses,
      selectedParticipants,
      initialSelectedParticipants,
    };

    return (
      <Page>
        <Helmet>
          <title>Manage CareTeam</title>
          <meta name="description" content="Manage CareTeam page of Omnibus Care Plan application" />
        </Helmet>
        <PageHeader
          title={editMode ?
            <FormattedMessage {...messages.updateHeader} />
            : <FormattedMessage {...messages.createHeader} />}
        />
        <ManageCareTeam
          {...manageCareTeamProps}
          onSave={this.handleSave}
          removeParticipant={this.handleRemoveParticipant}
          handleOpen={this.handleOpen}
        />
        {((editMode && careTeam) || !editMode) &&
        <SearchParticipant
          initialSelectedParticipants={initialSelectedParticipants}
          isOpen={this.state.open}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
        >
        </SearchParticipant>
        }
      </Page>
    );
  }
}

ManageCareTeamPage.propTypes = {
  match: PropTypes.object,
  patient: PropTypes.object,
  selectedCareTeam: PropTypes.object,
  getCareTeam: PropTypes.func.isRequired,
  initializeManageCareTeam: PropTypes.func.isRequired,
  getLookUpFormData: PropTypes.func.isRequired,
  onSaveCareTeam: PropTypes.func.isRequired,
  initializeSearchParticipantResult: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  careTeamCategories: PropTypes.array,
  careTeamStatuses: PropTypes.array,
  careTeamReasons: PropTypes.array,
  selectedParticipants: PropTypes.array,
  organization: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
  selectedCareTeam: makeSelectCareTeam(),
  careTeamCategories: makeSelectCareTeamCategories(),
  careTeamStatuses: makeSelectCareTeamStatuses(),
  careTeamReasons: makeSelectCareTeamReasons(),
  selectedParticipants: makeSelectSelectedParticipants(),
  organization: makeSelectOrganization(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeManageCareTeam: () => dispatch(initializeManageCareTeam()),
    getLookUpFormData: () => dispatch(getLookupsAction([CARETEAMCATEGORY, CARETEAMSTATUS, CARETEAMREASON])),
    getCareTeam: (careTeamId) => dispatch(getCareTeam(careTeamId)),
    onSaveCareTeam: (careTeamFormData, handleSubmitting) => dispatch(saveCareTeam(careTeamFormData, handleSubmitting)),
    removeParticipant: (participant) => dispatch(removeParticipant(participant)),
    initializeSearchParticipantResult: () => dispatch(initializeSearchParticipantResult()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageCareTeamPage', reducer });
const withSaga = injectSaga({ key: 'manageCareTeamPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageCareTeamPage);
