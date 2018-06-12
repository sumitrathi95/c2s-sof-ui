/**
 *
 * PractitionerConsents
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEqual from 'lodash/isEqual';

import {
  CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE,
  DEFAULT_START_PAGE_NUMBER, PATIENT_ROLE_CODE,
  PCP_ROLE_CODE,
} from 'containers/App/constants';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Card from 'components/Card';
import ContentSection from 'components/ContentSection';
import ConsentTable from 'components/ConsentTable';
import { PanelToolbar } from 'components/PanelToolbar';
import makeSelectPractitionerConsents from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getConsents, initializeConsents } from './actions';

export class PractitionerConsents extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static initalState = {
    relativeTop: 0,
    isShowSearchResult: false,
    listConsents: {
      currentPage: 1,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      ...PractitionerConsents.initalState,
    };
    this.handleListPageClick = this.handleListPageClick.bind(this);
    this.onSize = this.onSize.bind(this);
  }

  componentDidMount() {
    this.props.getConsents({
      pageNumber: DEFAULT_START_PAGE_NUMBER,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { consent } = this.props;
    const { consent: newConsent } = nextProps;
    if (!isEqual(consent, newConsent)) {
      this.props.initializeConsents([newConsent]);
      this.setState({ ...PractitionerConsents.initalState });
    }
  }

  onSize(size) {
    this.setState({ relativeTop: size.height });
  }

  handleListPageClick(currentPage) {
    this.props.getConsents({ pageNumber: currentPage });
  }

  render() {
    const { consents } = this.props;
    const consentData = {
      loading: consents.listConsents.loading,
      data: consents.listConsents.data,
      currentPage: consents.listConsents.currentPage,
      totalNumberOfPages: consents.listConsents.totalNumberOfPages,
      currentPageSize: consents.listConsents.currentPageSize,
      totalElements: consents.listConsents.totalElements,
      handlePageClick: this.handleListPageClick,
    };

    return (
      <Card>
        <PanelToolbar
          allowedAddNewItemRoles={[PATIENT_ROLE_CODE, CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE, PCP_ROLE_CODE]}
          showSearchIcon={false}
          showFilterIcon={false}
          showUploadIcon={false}
          showSettingIcon={false}
        />
        <ContentSection>
          <ConsentTable
            relativeTop={this.state.relativeTop}
            consentData={consentData}
            allowedAttestConsentRoles={PATIENT_ROLE_CODE}
          />
        </ContentSection>
      </Card>
    );
  }
}

PractitionerConsents.propTypes = {
  initializeConsents: PropTypes.func.isRequired,
  consent: PropTypes.object,
  getConsents: PropTypes.func.isRequired,
  consents: PropTypes.shape({
    listConsents: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      currentPage: PropTypes.number.isRequired,
      totalNumberOfPages: PropTypes.number.isRequired,
      currentPageSize: PropTypes.number,
      totalElements: PropTypes.number,
      data: PropTypes.array,
      error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.bool,
      ]),
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  consents: makeSelectPractitionerConsents(),
  selectedPatient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeConsents: (consents) => dispatch(initializeConsents(consents)),
    getConsents: (query) => dispatch(getConsents(query)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitionerConsents', reducer });
const withSaga = injectSaga({ key: 'practitionerConsents', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PractitionerConsents);
