/**
 *
 * PatientPage
 *
 */

import renderPatientToDosComponent from 'containers/PatientToDos/render';
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Page from 'components/Page';
import GoldenLayout from 'components/GoldenLayout';
import renderCalendarComponent from 'components/Calendar/render';
import renderPatientAppointmentsComponent from 'containers/PatientAppointments/render';
import renderCommunicationsComponent from 'containers/Communications/render';
import renderTasksComponent from 'containers/Tasks/render';
import renderCareTeamsComponent from 'containers/CareTeams/render';
import PatientDetails from 'components/PatientDetails';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import { getPatient, refreshPatient } from 'containers/App/contextActions';
import { flattenPatientData } from 'containers/PatientWorkspacePage/helpers';

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
      minItemHeight: 400,
      minItemWidth: 200,
      headerHeight: 30,
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
            }, {
              title: 'Care teams',
              type: 'component',
              componentName: 'careTeams',
              isClosable: true,
              reorderEnabled: true,
            }, {
              title: 'MY TO DO',
              type: 'component',
              componentName: 'toDos',
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
            }, {
              title: 'Communications',
              type: 'component',
              componentName: 'communications',
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
  { name: 'tasks', text: 'Tasks', factoryMethod: renderTasksComponent },
  { name: 'appointments', text: 'My Appointments', factoryMethod: renderPatientAppointmentsComponent },
  { name: 'communications', text: 'Communications', factoryMethod: renderCommunicationsComponent },
  { name: 'toDos', text: 'My To Do', factoryMethod: renderPatientToDosComponent },
  { name: 'calendar', text: 'Calendar', factoryMethod: renderCalendarComponent },
  { name: 'careTeams', text: 'Care teams', factoryMethod: renderCareTeamsComponent },
];

export class PatientPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const patientId = this.props.match.params.id;
    const { patient } = this.props;
    if (patient && patient.id && patient.id === patientId) {
      this.props.refreshPatient();
    } else {
      this.props.getPatient(patientId);
    }
  }

  render() {
    const { patient } = this.props;
    const patientDetailsProps = { patient };
    return (
      <Page>
        <Helmet>
          <title>Patient</title>
          <meta name="description" content="Patient page of Omnibus Care Plan application" />
        </Helmet>

        {patient &&
        <div>
          <PatientDetails
            {...patientDetailsProps}
            flattenPatientData={flattenPatientData}
          />
          <GoldenLayout
            containerId="golden-patient"
            containerHeight="75vh"
            containerWidth="95vw"
            componentMetadata={componentMetadata}
            stateMetadata={initialStateMetadata}
          />
        </div>}
      </Page>
    );
  }
}

PatientPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
  refreshPatient: PropTypes.func,
  getPatient: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    refreshPatient: () => dispatch(refreshPatient()),
    getPatient: (logicalId) => dispatch(getPatient(logicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(PatientPage);
