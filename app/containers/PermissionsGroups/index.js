/**
 *
 * PermissionsGroups
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dialog from 'material-ui/Dialog';
import { compose } from 'redux';
import { FieldArray } from 'formik';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import teal from 'material-ui-next/colors/teal';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import AddPermissionGroupForm from 'components/AddPermissionGroupForm';

import PermissionGroupsTable from 'components/PermissionGroupsTable';
import makeSelectPermissionsGroups from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class PermissionsGroups extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      editingPermissionGroup: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditPermissionGroup = this.handleEditPermissionGroup.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isDialogOpen: false,
      editingPermissionGroup: null,
    });
  }

  handleEditPermissionGroup(index, permissionGroup) {
    this.setState((prevState) => ({
      isDialogOpen: !prevState.isDialogOpen,
      editingPermissionGroup: { index, permissionGroup },
    }));
  }

  render() {
    return (
      <div>
        <div>
          <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
            <StyledAddCircleIcon color={teal['500']} />
            <FormattedMessage {...messages.newPermissionsGroup} />
          </AddNewItemButton>
        </div>
        <FieldArray
          name="permissionGroup"
          render={() => (
            <div>
              <Dialog
                modal={false}
                open={this.state.isDialogOpen}
                onRequestClose={this.handleCloseDialog}
                title="Create Permission Group"
              >
                <AddPermissionGroupForm
                  initialValues={this.state.editingPermissionGroup}
                  handleCloseDialog={this.handleCloseDialog}
                />
              </Dialog>
            </div>
          )}
        />
        <PermissionGroupsTable />
      </div>
    );
  }
}

PermissionsGroups.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  permissionsgroups: makeSelectPermissionsGroups(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'permissionsGroups', reducer });
const withSaga = injectSaga({ key: 'permissionsGroups', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PermissionsGroups);
