/**
 *
 * PractitionerAppointments
 *
 */

import CenterAlign from 'components/Align/CenterAlign';
import AppointmentTable from 'components/AppointmentTable';
import Card from 'components/Card';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import FilterSection from 'components/FilterSection';
import InfoSection from 'components/InfoSection';
import { PanelToolbar } from 'components/PanelToolbar';
import RecordsRange from 'components/RecordsRange';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import StatusCheckbox from 'components/StatusCheckbox';
import SizedStickyDiv from 'components/StickyDiv/SizedStickyDiv';
import { getLookupsAction } from 'containers/App/actions';
import {
  APPOINTMENT_STATUS,
  APPOINTMENT_TYPE,
  DEFAULT_START_PAGE_NUMBER,
  MANAGE_COMMUNICATION_URL,
} from 'containers/App/constants';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { makeSelectAppointmentStatuses, makeSelectAppointmentTypes } from 'containers/App/lookupSelectors';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Cell } from 'styled-css-grid';
import injectReducer from 'utils/injectReducer';

import injectSaga from 'utils/injectSaga';
import {
  acceptPractitionerAppointment,
  cancelPractitionerAppointment,
  declinePractitionerAppointment,
  getPractitionerAppointments,
  tentativePractitionerAppointment,
} from './actions';
import messages from './messages';
import NoPractitionerAppointmentsMessage from './NoPractitionerAppointmentsMessage';
import reducer from './reducer';
import saga from './saga';
import { makeSelectPractitionerAppointments, makeSelectShowPastAppointments } from './selectors';

export class PractitionerAppointments extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      panelHeight: 0,
      filterHeight: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);
    this.acceptAppointment = this.acceptAppointment.bind(this);
    this.declineAppointment = this.declineAppointment.bind(this);
    this.tentativeAppointment = this.tentativeAppointment.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleFilterResize = this.handleFilterResize.bind(this);
  }

  componentDidMount() {
    this.props.getUpcomingAppointments({
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      showPastAppointments: false,
    });
    this.props.getLookupData();
  }

  handlePanelResize(size) {
    this.setState({ panelHeight: size.height });
  }

  handleFilterResize(size) {
    this.setState({ filterHeight: size.height });
  }

  handlePageClick(page) {
    this.props.getUpcomingAppointments({ pageNumber: page });
  }

  handleCheck(event, checked) {
    const practitionerId = (this.props.user && this.props.user.fhirResource) ? this.props.user.fhirResource.logicalId : null;
    this.props.getUpcomingAppointments({
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      practitionerId,
      showPastAppointments: checked,
    });
  }

  cancelAppointment(logicalId) {
    this.props.cancelAppointment(logicalId);
  }

  acceptAppointment(logicalId) {
    this.props.acceptAppointment(logicalId, {
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      showPastAppointments: false,
    });
  }

  declineAppointment(logicalId) {
    this.props.declineAppointment(logicalId, {
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      showPastAppointments: false,
    });
  }

  tentativeAppointment(logicalId) {
    this.props.tentativeAppointment(logicalId, {
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      showPastAppointments: false,
    });
  }

  render() {
    const communicationBaseUrl = MANAGE_COMMUNICATION_URL;
    const { practitionerAppointments: { loading, data }, appointmentTypes, appointmentStatuses } = this.props;
    const showPastAppFilter = true;
    return (
      <div>
        <Card>
          <PanelToolbar showSearchIcon={false} onSize={this.handlePanelResize} />
          {showPastAppFilter &&
          <SizedStickyDiv onSize={this.handleFilterResize} top={`${this.state.panelHeight}px`}>
            <FilterSection>
              <CheckboxFilterGrid>
                <Cell>
                  <StatusCheckbox
                    messages={messages.showPastAppointments}
                    elementId="showPastAppointmentsCheckBox"
                    checked={this.props.showPastAppointments}
                    handleCheck={this.handleCheck}
                  />
                </Cell>
              </CheckboxFilterGrid>
            </FilterSection>
          </SizedStickyDiv>
          }
          {loading &&
          <RefreshIndicatorLoading />}
          {!loading && isEmpty(data) &&
          <NoPractitionerAppointmentsMessage>{
            <FormattedMessage {...messages.noUpcomingAppointments} />}</NoPractitionerAppointmentsMessage>}
          {!isEmpty(data) && !isEmpty(data.elements) &&
          <InfoSection margin="0 0 10px 0">
            <CenterAlign>
              <AppointmentTable
                elements={data.elements}
                appointmentStatuses={appointmentStatuses}
                appointmentTypes={appointmentTypes}
                cancelAppointment={this.cancelAppointment}
                acceptAppointment={this.acceptAppointment}
                declineAppointment={this.declineAppointment}
                tentativeAppointment={this.tentativeAppointment}
                communicationBaseUrl={communicationBaseUrl}
                relativeTop={this.state.panelHeight + this.state.filterHeight}
              />
              <CenterAlignedUltimatePagination
                currentPage={data.currentPage}
                totalPages={data.totalNumberOfPages}
                onChange={this.handlePageClick}
              />
              <RecordsRange
                currentPage={data.currentPage}
                totalPages={data.totalNumberOfPages}
                totalElements={data.totalElements}
                currentPageSize={data.currentPageSize}
              />
            </CenterAlign>
          </InfoSection>
          }
        </Card>
      </div>
    );
  }
}

PractitionerAppointments.propTypes = {
  getUpcomingAppointments: PropTypes.func.isRequired,
  getLookupData: PropTypes.func.isRequired,
  appointmentTypes: PropTypes.array,
  appointmentStatuses: PropTypes.array,
  practitionerAppointments: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      elements: PropTypes.array,
    }),
  }),
  cancelAppointment: PropTypes.func.isRequired,
  acceptAppointment: PropTypes.func.isRequired,
  declineAppointment: PropTypes.func.isRequired,
  tentativeAppointment: PropTypes.func.isRequired,
  user: PropTypes.object,
  showPastAppointments: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  practitionerAppointments: makeSelectPractitionerAppointments(),
  appointmentTypes: makeSelectAppointmentTypes(),
  appointmentStatuses: makeSelectAppointmentStatuses(),
  user: makeSelectUser(),
  showPastAppointments: makeSelectShowPastAppointments(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUpcomingAppointments: (query, showPastAppointments) => dispatch(getPractitionerAppointments(query, showPastAppointments)),
    getLookupData: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE])),
    cancelAppointment: (id) => dispatch(cancelPractitionerAppointment(id)),
    acceptAppointment: (id, query) => dispatch(acceptPractitionerAppointment(id, query)),
    declineAppointment: (id, query) => dispatch(declinePractitionerAppointment(id, query)),
    tentativeAppointment: (id, query) => dispatch(tentativePractitionerAppointment(id, query)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitionerAppointments', reducer });
const withSaga = injectSaga({ key: 'practitionerAppointments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PractitionerAppointments);
