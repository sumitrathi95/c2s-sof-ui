/**
 *
 * PractitionerWorkspacePage
 *
 */

import renderCalendarComponent from 'containers/AppointmentsCalendar/render';
import GoldenLayout from 'components/GoldenLayout';
import Page from 'components/Page';
import renderUnderConstructionComponent from 'components/UnderConstruction/render';
import { BENEFITS_SPECIALIST_ROLE_CODE, CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE, FRONT_OFFICE_ROLE_CODE, HEALTH_ASSISTANT_ROLE_CODE, ORGANIZATION_ADMIN_ROLE_CODE, PCP_ROLE_CODE } from 'containers/App/constants';
import { makeSelectUser } from 'containers/App/contextSelectors';
import renderCommunicationsComponent from 'containers/Communications/render';
import renderHealthcareServicesComponent from 'containers/HealthcareServices/render';
import renderLocationsComponent from 'containers/Locations/render';
import renderPatientsComponent from 'containers/Patients/render';
import renderPractitionerUpcomingAppointmentsComponent from 'containers/PractitionerAppointments/render';
import renderPractitionersComponent from 'containers/Practitioners/render';
import renderPractitionerToDosComponent from 'containers/PractitionerToDos/render';
import renderTasksComponent from 'containers/Tasks/render';
import renderUpcomingTasksComponent from 'containers/UpcomingTasks/render';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';

import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import makeSelectPractitionerWorkspacePage from './selectors';


const baseLayout = {
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
    borderGrabWidth: 15,
    minItemHeight: 200,
    minItemWidth: 500,
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
  isClosable: true,
  reorderEnabled: true,
  title: '',
  openPopouts: [],
  maximisedItemId: null,
};

export class PractitionerWorkspacePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static componentMetadata = [
    { name: 'communications', text: 'COMMUNICATIONS', factoryMethod: renderCommunicationsComponent },
    { name: 'practitioners', text: 'PRACTITIONERS', factoryMethod: renderPractitionersComponent },
    { name: 'patients', text: 'PATIENTS', factoryMethod: renderPatientsComponent },
    { name: 'locations', text: 'LOCATIONS', factoryMethod: renderLocationsComponent },
    { name: 'healthcareServices', text: 'HEALTHCARE SERVICES', factoryMethod: renderHealthcareServicesComponent },
    { name: 'upcomingTasks', text: 'TASKS', factoryMethod: renderUpcomingTasksComponent },
    { name: 'tasks', text: 'TASKS', factoryMethod: renderTasksComponent },
    { name: 'toDos', text: 'MY TO DO', factoryMethod: renderPractitionerToDosComponent },
    { name: 'calendar', text: 'CALENDAR', factoryMethod: renderCalendarComponent },
    { name: 'assessments', text: 'ASSESSMENTS', factoryMethod: renderUnderConstructionComponent },
    {
      name: 'upcomingAppointments',
      text: 'APPOINTMENTS',
      factoryMethod: renderPractitionerUpcomingAppointmentsComponent,
    },
  ];

  static orgAdminLayout = {
    ...baseLayout,
    content: [{
      type: 'row',
      isClosable: true,
      reorderEnabled: true,
      title: '',
      content: [{
        type: 'column',
        isClosable: true,
        reorderEnabled: true,
        title: '',
        width: 50,
        content: [{
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          height: 100,
          content: [{
            title: 'LOCATIONS',
            type: 'component',
            componentName: 'locations',
            isClosable: true,
            reorderEnabled: true,
          },
          ],
        }, {
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          width: 50,
          height: 100,
          content: [{
            title: 'Practitioners',
            type: 'component',
            componentName: 'practitioners',
            isClosable: true,
            reorderEnabled: true,
          },
          ],
        },
        ],
      }, {
        type: 'column',
        isClosable: true,
        reorderEnabled: true,
        title: '',
        width: 50,
        content: [{
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          height: 100,
          content: [{
            title: 'Healthcare Services',
            type: 'component',
            componentName: 'healthcareServices',
            isClosable: true,
            reorderEnabled: true,
          },
          ],
        }, {
          type: 'stack',
          width: 50,
          height: 100,
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          content: [{
            title: 'Patients',
            type: 'component',
            componentName: 'patients',
            isClosable: true,
            reorderEnabled: true,
          },
          ],
        },
        ],
      },
      ],
    },
    ],
  };

  static careManagerLayout = {
    ...baseLayout,
    content: [{
      type: 'column',
      content: [
        {
          type: 'row',
          content: [
            {
              title: 'Upcoming Appointments',
              type: 'component',
              componentName: 'upcomingAppointments',
              isClosable: true,
              reorderEnabled: true,
            }, {
              title: 'Patients',
              type: 'component',
              componentName: 'patients',
              isClosable: true,
              reorderEnabled: true,
            },
          ],
        }, {
          type: 'row',
          height: 60,
          content: [
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
  };

  static careCoordinatorLayout = {
    ...baseLayout,
    content: [
      {
        type: 'column',
        content: [
          {
            type: 'row',
            content: [
              {
                title: 'MY TO DO',
                type: 'component',
                componentName: 'toDos',
                isClosable: true,
                reorderEnabled: true,
              }, {
                title: 'Upcoming Appointments',
                type: 'component',
                componentName: 'upcomingAppointments',
                isClosable: true,
                reorderEnabled: true,
              }, {
                title: 'Upcoming tasks',
                type: 'component',
                componentName: 'upcomingTasks',
                isClosable: true,
                reorderEnabled: true,
              },
            ],
          }, {
            type: 'row',
            content: [
              {
                title: 'CALENDAR',
                type: 'component',
                componentName: 'calendar',
                isClosable: true,
                reorderEnabled: true,
              },
            ],
          }, {
            type: 'row',
            content: [
              {
                title: 'PATIENTS',
                type: 'component',
                componentName: 'patients',
                isClosable: true,
                reorderEnabled: true,
              },
            ],
          },
        ],
      },
    ],
  };

  static
  pcpLayout = {
    ...baseLayout,
    content: [{
      type: 'column',
      content: [
        {
          type: 'row',
          content: [
            {
              title: 'MY TO DO',
              type: 'component',
              componentName: 'toDos',
              isClosable: true,
              reorderEnabled: true,
            }, {
              title: 'Patient\'s Tasks',
              type: 'component',
              componentName: 'tasks',
              isClosable: true,
              reorderEnabled: true,
            }, {
              title: 'Upcoming Appointments',
              type: 'component',
              componentName: 'upcomingAppointments',
              isClosable: true,
              reorderEnabled: true,
            },
          ],
        }, {
          type: 'row',
          height: 60,
          content: [
            {
              title: 'CALENDAR',
              type: 'component',
              componentName: 'calendar',
              isClosable: true,
              reorderEnabled: true,
            }, {
              title: 'PATIENTS',
              type: 'component',
              componentName: 'patients',
              isClosable: true,
              reorderEnabled: true,
            },
          ],
        },
      ],
    }],
  };

  static
  benefitsSpecialistLayout = {
    ...baseLayout,
    content: [{
      type: 'column',
      isClosable: true,
      reorderEnabled: true,
      title: '',
      content: [{
        type: 'row',
        isClosable: true,
        reorderEnabled: true,
        title: '',
        height: 80,
        content: [{
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          width: 50,
          height: 80,
          content: [{
            title: 'Communications',
            type: 'component',
            componentName: 'communications',
            isClosable: true,
            reorderEnabled: true,
          }],
        }, {
          type: 'stack',
          width: 50,
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          content: [{
            title: 'Upcoming Appointments',
            type: 'component',
            componentName: 'upcomingAppointments',
            isClosable: true,
            reorderEnabled: true,
          }],
        }],
      }, {
        type: 'stack',
        header: {},
        isClosable: true,
        reorderEnabled: true,
        title: '',
        activeItemIndex: 0,
        height: 80,
        content: [{
          title: 'Patients',
          type: 'component',
          componentName: 'patients',
          isClosable: true,
          reorderEnabled: true,
        }],
      }],
    }],
  };

  static
  frontOfficeLayout = {
    ...baseLayout,
    content: [{
      type: 'column',
      content: [
        {
          type: 'row',
          height: 40,
          content: [
            {
              title: 'Upcoming Appointments',
              type: 'component',
              componentName: 'upcomingAppointments',
              isClosable: true,
              reorderEnabled: true,
            }, {
              title: 'Patients',
              type: 'component',
              componentName: 'patients',
              isClosable: true,
              reorderEnabled: true,
            },
          ],
        },
        {
          title: 'Calendar',
          type: 'component',
          componentName: 'calendar',
          isClosable: true,
          reorderEnabled: true,
        },
      ],
    }],
  };

  static
  healthAssistantLayout = {
    ...baseLayout,
    content: [{
      type: 'column',
      isClosable: true,
      reorderEnabled: true,
      title: '',
      content: [{
        type: 'row',
        isClosable: true,
        reorderEnabled: true,
        title: '',
        height: 80,
        content: [{
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          width: 50,
          height: 80,
          content: [{
            title: 'Communications',
            type: 'component',
            componentName: 'communications',
            isClosable: true,
            reorderEnabled: true,
          }],
        }, {
          type: 'stack',
          width: 50,
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          content: [{
            title: 'Assessments',
            type: 'component',
            componentName: 'assessments',
            isClosable: true,
            reorderEnabled: true,
          }],
        }],
      }, {
        type: 'stack',
        header: {},
        isClosable: true,
        reorderEnabled: true,
        title: '',
        activeItemIndex: 0,
        height: 80,
        content: [{
          title: 'Patients',
          type: 'component',
          componentName: 'patients',
          isClosable: true,
          reorderEnabled: true,
        }],
      }],
    }],
  };

  constructor(props) {
    super(props);
    this.getStateMetadataForRole = this.getStateMetadataForRole.bind(this);
  }

  getStateMetadataForRole() {
    const { user: { role } } = this.props;
    switch (role) {
      case ORGANIZATION_ADMIN_ROLE_CODE:
        return PractitionerWorkspacePage.orgAdminLayout;
      case CARE_MANAGER_ROLE_CODE:
        return PractitionerWorkspacePage.careManagerLayout;
      case CARE_COORDINATOR_ROLE_CODE:
        return PractitionerWorkspacePage.careCoordinatorLayout;
      case PCP_ROLE_CODE:
        return PractitionerWorkspacePage.pcpLayout;
      case BENEFITS_SPECIALIST_ROLE_CODE:
        return PractitionerWorkspacePage.benefitsSpecialistLayout;
      case HEALTH_ASSISTANT_ROLE_CODE:
        return PractitionerWorkspacePage.healthAssistantLayout;
      case FRONT_OFFICE_ROLE_CODE:
        return PractitionerWorkspacePage.frontOfficeLayout;
      default:
        return null;
    }
  }

  render() {
    const stateMetadata = this.getStateMetadataForRole();
    return (
      <div>
        <Helmet>
          <title>Practitioner Workspace</title>
          <meta name="description" content="Practitioner workspace page of Omnibus Care Plan application" />
        </Helmet>
        {stateMetadata &&
        <Page>
          <GoldenLayout
            containerHeight="88vh"
            containerWidth="95vw"
            containerId="golden-practitioner-workspace"
            componentMetadata={PractitionerWorkspacePage.componentMetadata}
            stateMetadata={stateMetadata}
          />
        </Page>
        }
      </div>
    );
  }
}

PractitionerWorkspacePage.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  practitionerworkspacepage: makeSelectPractitionerWorkspacePage(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitionerWorkspacePage', reducer });
const withSaga = injectSaga({ key: 'practitionerWorkspacePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PractitionerWorkspacePage);
