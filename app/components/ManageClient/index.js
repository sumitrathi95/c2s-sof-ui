/**
 *
 * ManageClient
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import teal from 'material-ui-next/colors/teal';
import { FormattedMessage } from 'react-intl';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import { Cell, Grid } from 'styled-css-grid';

import StyledImage from 'components/StyledImage';
import StyledText from 'components/StyledText';
import HorizontalAlignment from 'components/HorizontalAlignment';
import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import StyledDialog from 'components/StyledDialog';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import StyledRaisedButton from 'components/StyledRaisedButton';
import ManageClientForm from './ManageClientForm';
import messages from './messages';

// import styled from 'styled-components';

class ManageClient extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static SMART_APP_LOGO_SRC_PREFIX = 'data:image/png;base64,';
  static SMART_APP_LOGO_ALT_SUFFIX = ' Logo';

  constructor(props) {
    super(props);
    this.state = {
      isClientDialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isClientDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isClientDialogOpen: false,
    });
  }

  render() {
    const {
      onSaveClient, smartApps, onDeleteClient,
    } = this.props;

    return (
      <div>
        <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
          <StyledAddCircleIcon color={teal['500']} />
          <FormattedMessage {...messages.addClient} />
        </AddNewItemButton>
        <Grid columns={5} justifyContent="space-around" gap="16px">
          {smartApps && smartApps.map(({ clientId, clientName, appIcon }) => (
            <Cell key={clientId} middle>
              <HorizontalAlignment position="center">
                <Grid columns={1}>
                  <Cell>
                    <StyledImage
                      height="180px"
                      width="180px"
                      alt={`${clientName}${ManageClient.SMART_APP_LOGO_ALT_SUFFIX}`}
                      src={`${ManageClient.SMART_APP_LOGO_SRC_PREFIX}${appIcon}`}
                    />
                  </Cell>
                  <Cell center>
                    <StyledText fontSize="20px">{clientName}</StyledText>
                  </Cell>
                  <Cell center>
                    <StyledRaisedButton onClick={() => onDeleteClient && onDeleteClient(clientId)}>
                      Delete
                    </StyledRaisedButton>
                  </Cell>
                </Grid>
              </HorizontalAlignment>
            </Cell>
          ))}
        </Grid>
        <StyledDialog
          open={this.state.isClientDialogOpen}
          onClose={this.handleCloseDialog}
          fullWidth
        >
          <DialogTitle>
            <FormattedMessage {...messages.dialogHeader} />
          </DialogTitle>
          <DialogContent>
            <ManageClientForm
              handleCloseDialog={this.handleCloseDialog}
              onSaveClient={onSaveClient}
            />
          </DialogContent>
        </StyledDialog>
      </div>
    );
  }
}

ManageClient.propTypes = {
  onSaveClient: PropTypes.func,
  onDeleteClient: PropTypes.func,
  smartApps: PropTypes.arrayOf(PropTypes.shape({
    clientId: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    appIcon: PropTypes.string,
  })),
};

export default ManageClient;
