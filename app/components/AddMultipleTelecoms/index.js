/**
 *
 * AddMultipleTelecoms
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import Dialog from 'material-ui/Dialog';

import FormSubtitle from 'components/FormSubtitle';
import teal from 'material-ui-next/colors/teal';
import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import AddMultipleTelecomsForm from './AddMultipleTelecomsForm';
import AddedTelecomsTable from './AddedTelecomsTable';
import messages from './messages';

class AddMultipleTelecoms extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isTelecomsDialogOpen: false,
      editingTelecom: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditTelecom = this.handleEditTelecom.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isTelecomsDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isTelecomsDialogOpen: false,
      editingTelecom: null,
    });
  }

  handleEditTelecom(index, telecom) {
    this.setState((prevState) => ({
      isTelecomsDialogOpen: !prevState.isTelecomsDialogOpen,
      editingTelecom: { index, telecom },
    }));
  }

  render() {
    const { telecomSystems, telecomUses, telecoms, errors } = this.props;
    const addedTelecomsFormProps = {
      telecomSystems,
      telecomUses,
    };
    const addedTelecomsTableProps = {
      telecoms,
      errors,
    };
    return (
      <div>
        <div>
          <FormSubtitle margin="1vh 0 0 0">
            <FormattedMessage {...messages.header} />
          </FormSubtitle>
          <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
            <StyledAddCircleIcon color={teal['500']} />
            <FormattedMessage {...messages.addTelecomsButton} />
          </AddNewItemButton>
          <FieldArray
            name="telecoms"
            render={(arrayHelpers) => (
              <div>
                <Dialog
                  title="Add Contacts"
                  modal={false}
                  open={this.state.isTelecomsDialogOpen}
                  onRequestClose={this.handleCloseDialog}
                >
                  <AddMultipleTelecomsForm
                    initialValues={this.state.editingTelecom}
                    onAddTelecom={arrayHelpers.push}
                    onRemoveTelecom={arrayHelpers.remove}
                    handleCloseDialog={this.handleCloseDialog}
                    {...addedTelecomsFormProps}
                  />
                </Dialog>
                <AddedTelecomsTable
                  handleEditTelecom={this.handleEditTelecom}
                  arrayHelpers={arrayHelpers}
                  {...addedTelecomsTableProps}
                />
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

AddMultipleTelecoms.propTypes = {
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  telecomUses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })).isRequired,
  telecoms: PropTypes.arrayOf(PropTypes.shape({
    system: PropTypes.string,
    value: PropTypes.string,
    use: PropTypes.string,
  })),
  errors: PropTypes.object,
};

export default AddMultipleTelecoms;
