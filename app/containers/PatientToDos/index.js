/**
 *
 * PatientToDos
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeSelectOrganization, makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import Card from 'components/Card';
import { CARE_COORDINATOR_ROLE_CODE, DATE_RANGE, MANAGE_TASK_URL, TO_DO_DEFINITION } from 'containers/App/constants';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import { compose } from 'redux';
import { cancelToDos, getFilterToDos, getPatientToDoMainTask, getPatientToDos } from 'containers/PatientToDos/actions';
import NoResultsFoundText from 'components/NoResultsFoundText';
import { PanelToolbar } from 'components/PanelToolbar';
import {
  makeSelectPatientToDoMainTask,
  makeSelectPatientToDos,
  makeSelectSearchLoading,
} from 'containers/PatientToDos/selectors';
import ToDoList from 'components/ToDoList';
import { getLookupsAction } from 'containers/App/actions';
import { makeSelectToDoFilterDateRanges } from 'containers/App/lookupSelectors';
import H3 from 'components/H3';
import StyledFlatButton from 'components/StyledFlatButton';
import Dialog from 'material-ui/Dialog';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getPractitionerIdByRole } from 'containers/App/helpers';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class PatientToDos extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      toDoLogicalId: '',
    };
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleCancelToDo = this.handleCancelToDo.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
    const { selectedPatient, selectedOrganization, user } = this.props;
    const definition = TO_DO_DEFINITION;
    const patientId = selectedPatient ? selectedPatient.id : null;
    const practitionerId = getPractitionerIdByRole(user);
    const organizationId = selectedOrganization && selectedOrganization.logicalId ? selectedOrganization.logicalId : null;
    if (patientId) {
      if (!organizationId && !practitionerId) {
        this.props.getPatientToDos(patientId, practitionerId, definition);
      } else if (organizationId && practitionerId) {
        this.props.getPatientToDos(patientId, practitionerId, definition);
        this.props.getPatientToDoMainTask(patientId, organizationId, definition, practitionerId);
      }
    }
  }

  getToDoMainTaskId(toDoMainTask) {
    let toDoMintaskId = null;
    if (toDoMainTask && toDoMainTask.length > 0) {
      toDoMintaskId = toDoMainTask[0].reference.split('/')[1];
    }
    return toDoMintaskId;
  }

  handleFilter(dateRange) {
    const definition = TO_DO_DEFINITION;
    const { selectedPatient } = this.props;
    const patientId = selectedPatient ? selectedPatient.id : null;
    const practitionerId = this.getPractitionerId();

    if (patientId && !practitionerId && dateRange) {
      this.props.getFilterToDos(patientId, null, definition, dateRange);
    } else if (patientId && practitionerId && dateRange) {
      this.props.getFilterToDos(patientId, practitionerId, definition, dateRange);
    }
  }

  handleCloseDialog() {
    this.setState({ open: false });
  }

  handleOpenDialog(toDoLogicalId) {
    this.setState({ open: true });
    this.setState({ toDoLogicalId });
  }

  handleCancelToDo() {
    this.setState({ open: false });
    this.props.cancelToDos(this.state.toDoLogicalId);
  }

  render() {
    const { toDos, selectedPatient, loading, toDoMainTask, dateRanges, user } = this.props;
    const patientId = selectedPatient ? selectedPatient.id : null;
    const toDoMainTaskId = this.getToDoMainTaskId(toDoMainTask);
    const practitionerId = getPractitionerIdByRole(user);
    const CREATE_TO_DO_URL = `${MANAGE_TASK_URL}?patientId=${patientId}&isMainTask=false&mainTaskId=${toDoMainTaskId}`;
    const addNewItem = (practitionerId && patientId) ? {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: CREATE_TO_DO_URL,
    } : undefined;
    const filterField = {
      filterTypes: dateRanges,
      filterValueHintText: <FormattedMessage {...messages.selectLabelDateRange} />,
    };
    const actionsButtons = [
      <StyledFlatButton onClick={this.handleCloseDialog}>
        <FormattedMessage {...messages.dialog.buttonLabelClose} />
      </StyledFlatButton>,
      <StyledFlatButton keyboardFocused onClick={this.handleCancelToDo}>
        <FormattedMessage {...messages.dialog.buttonLabelCancelTodo} />
      </StyledFlatButton>,
    ];
    return (
      <Card>
        {loading && <RefreshIndicatorLoading />}
        <PanelToolbar
          addNewItem={addNewItem}
          showToDoSpecificFilters
          allowedAddNewItemRoles={CARE_COORDINATOR_ROLE_CODE}
          filterField={filterField}
          onFilter={this.handleFilter}
        />
        {!loading && isEmpty(toDos) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noToDosFound} />
        </NoResultsFoundText>}
        {!isEmpty(toDos) &&
        <div>
          <ToDoList
            isPatient
            isPractitioner
            toDos={toDos}
            patientId={patientId}
            taskBaseUrl={MANAGE_TASK_URL}
            openDialog={this.handleOpenDialog}
          />
        </div>
        }
        <Dialog
          title={<H3><FormattedMessage {...messages.dialog.title} /></H3>}
          actions={actionsButtons}
          modal
          open={this.state.open}
          autoScrollBodyContent
        >
          <FormattedMessage {...messages.dialog.confirmCancellationMessage} />
        </Dialog>
      </Card>
    );
  }
}

PatientToDos.propTypes = {
  toDos: PropTypes.array.isRequired,
  getPatientToDos: PropTypes.func.isRequired,
  getFilterToDos: PropTypes.func.isRequired,
  getLookups: PropTypes.func.isRequired,
  cancelToDos: PropTypes.func.isRequired,
  getPatientToDoMainTask: PropTypes.func.isRequired,
  selectedPatient: PropTypes.object.isRequired,
  toDoMainTask: PropTypes.array.isRequired,
  dateRanges: PropTypes.array.isRequired,
  user: PropTypes.object,
  selectedOrganization: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  toDos: makeSelectPatientToDos(),
  selectedPatient: makeSelectPatient(),
  toDoMainTask: makeSelectPatientToDoMainTask(),
  loading: makeSelectSearchLoading(),
  user: makeSelectUser(),
  selectedOrganization: makeSelectOrganization(),
  dateRanges: makeSelectToDoFilterDateRanges(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPatientToDos: (patientId, practitionerId, definition) => dispatch(getPatientToDos(patientId, practitionerId, definition)),
    getLookups: () => dispatch(getLookupsAction([DATE_RANGE])),
    getFilterToDos: (patientId, practitionerId, definition, dateRange) => dispatch(getFilterToDos(patientId, practitionerId, definition, dateRange)),
    getPatientToDoMainTask: (patientId, organizationId, definition, practitionerId) => dispatch(getPatientToDoMainTask(patientId, organizationId, definition, practitionerId)),
    cancelToDos: (toDoLogicalId) => dispatch(cancelToDos(toDoLogicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'patientToDos', reducer });
const withSaga = injectSaga({ key: 'patientToDos', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PatientToDos);
