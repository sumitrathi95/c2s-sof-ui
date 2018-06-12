/**
 *
 * PatientWorkspacePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import renderCalendarComponent from 'containers/AppointmentsCalendar/render';
import renderTasks from 'containers/Tasks/render';
import renderCareTeamsComponent from 'containers/CareTeams/render';
import renderRelatedPersonsComponent from 'containers/RelatedPersons/render';
import renderPatientAppointmentsComponent from 'containers/PatientAppointments/render';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import PatientDetails from 'components/PatientDetails';
import GoldenLayout from 'components/GoldenLayout';
import Page from 'components/Page';
import reducer from './reducer';
import saga from './saga';
import { flattenPatientData } from './helpers';

export const initialStateMetadata =
  {
    settings: {
      hasHeaders: true,
      constrainDragToContainer: false,
      reorderEnabled: true,
      selectionEnabled: false,
      popoutWholeStack: false,
      blockedPopoutsThrowError: true,
      closePopoutsOnUnload: true,
      showPopoutIcon: false,
      showMaximiseIcon: true,
      showCloseIcon: true,
      responsiveMode: 'onload',
      tabOverlapAllowance: 0,
      reorderOnTabMenuClick: true,
      tabControlOffset: 10,
    },
    dimensions: {
      borderWidth: 10,
      headerHeight: 30,
      minItemWidth: 400,
      minItemHeight: 200,
      dragProxyWidth: 300,
      dragProxyHeight: 200,
    },
    labels: {
      close: 'close',
      maximise: 'maximise',
      minimise: 'minimise',
      popout: 'open in new window',
      popin: 'pop in',
      tabDropdown: 'additional tabs',
    },
    content: [{
      type: 'column',
      content: [
        {
          type: 'row',
          height: 40,
          content: [
            {
              title: 'Tasks',
              type: 'component',
              componentName: 'tasks',
              isClosable: true,
              reorderEnabled: true,
            },
            {
              title: 'Care Teams',
              type: 'component',
              componentName: 'careTeams',
              isClosable: true,
              reorderEnabled: true,
            },
            {
              title: 'Related Persons',
              type: 'component',
              componentName: 'relatedPersons',
              isClosable: true,
              reorderEnabled: true,
            },
          ],
        },
        {
          type: 'row',
          height: 60,
          content: [
            {
              title: 'My Appointments',
              type: 'component',
              componentName: 'appointments',
              isClosable: true,
              reorderEnabled: true,
            },
            {
              title: 'Calendar',
              type: 'component',
              componentName: 'calendar',
              isClosable: true,
              reorderEnabled: true,
            },
          ],
        },
      ],
    }],
    isClosable: true,
    reorderEnabled: true,
    title: '',
    openPopouts: [],
    maximisedItemId: null,
  };

export const componentMetadata = [
  { name: 'tasks', text: 'Tasks', factoryMethod: renderTasks },
  { name: 'appointments', text: 'My Appointments', factoryMethod: renderPatientAppointmentsComponent },
  { name: 'calendar', text: 'Calendar', factoryMethod: renderCalendarComponent },
  { name: 'careTeams', text: 'Care teams', factoryMethod: renderCareTeamsComponent },
  { name: 'relatedPersons', text: 'Related Persons', factoryMethod: renderRelatedPersonsComponent },
];

export class PatientWorkspacePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { patient } = this.props;
    return (
      <Page>
        <Helmet>
          <title>Patient Workspace</title>
          <meta name="description" content="Patient workspace page of Omnibus Care Plan application" />
        </Helmet>
        {patient &&
        <div>
          <PatientDetails
            patient={patient}
            flattenPatientData={flattenPatientData}
          />
          <GoldenLayout
            containerHeight="75vh"
            containerWidth="95vw"
            containerId="golden-patient-workspace"
            componentMetadata={componentMetadata}
            stateMetadata={initialStateMetadata}
          />
        </div>}
      </Page>
    );
  }
}

PatientWorkspacePage.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'patientWorkspacePage', reducer });
const withSaga = injectSaga({ key: 'patientWorkspacePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PatientWorkspacePage);
