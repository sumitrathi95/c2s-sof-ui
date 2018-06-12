/**
*
* ToDoAccordion
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import NotificationPriorityHigh from '@material-ui/icons/PriorityHigh';
import ActionEvent from '@material-ui/icons/Event';
import ContentFlag from '@material-ui/icons/Flag';

import Divider from 'material-ui-next/Divider';
import { FormattedMessage } from 'react-intl';

import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui-next/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ToDoCardCell from 'components/ToDoCardCell';
import { Cell, Grid } from 'styled-css-grid';
import Align from 'components/Align';
import Padding from 'components/Padding';
import NavigationIconMenu from 'components/NavigationIconMenu';
import { DUE_TODAY, OVER_DUE, UPCOMING } from 'components/ToDoAccordion/constants';
import messages from './messages';

class ToDoAccordion extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      expansionPanelOpen: false,
    };
    this.handlePanelOpen = this.handlePanelOpen.bind(this);
  }

  getStatusWithIcon(statusStr) {
    let statusElement = null;
    if (statusStr === UPCOMING) {
      statusElement = (<div><ContentFlag /><FormattedMessage {...messages.todoStatusUpcoming} /></div>);
    } else if (statusStr === OVER_DUE) {
      statusElement = (<div><NotificationPriorityHigh /><FormattedMessage {...messages.todoStatusOverdue} /></div>);
    } else if (statusStr === DUE_TODAY) {
      statusElement = (<div><ActionEvent /><FormattedMessage {...messages.todoStatusDueToday} /></div>);
    }
    return statusElement;
  }

  handlePanelOpen() {
    this.setState({ expansionPanelOpen: !this.state.expansionPanelOpen });
  }
  render() {
    const {
      description,
      status,
      taskBaseUrl,
      isPractitioner,
      isPatient,
      openDialog,
      patientId,
      dueDate,
      patientName,
      toDoLogicalId,
      columns,
    } = this.props;
    const dueDateStr = dueDate ? 'Due '.concat(dueDate) : '';
    const patientNameStr = ((isPatient && isPractitioner) || isPractitioner) ? patientName : '';
    const editTodoUrl = `${taskBaseUrl}/${toDoLogicalId}?patientId=${patientId}&isMainTask=false`;
    const menuItems = [{
      primaryText: <FormattedMessage {...messages.editToDo} />,
      linkTo: `${editTodoUrl}`,
    }, {
      primaryText: <FormattedMessage {...messages.cancelToDo} />,
      onClick: () => openDialog(toDoLogicalId),
    }];
    return (
      <Padding bottom={'5px'} >
        <ExpansionPanel expanded={this.state.expansionPanelOpen} >
          <ExpansionPanelSummary >
            <ToDoCardCell top={1} left={1} width={14}>
              <Grid columns={columns} gap="">
                <Cell>
                  {this.state.expansionPanelOpen ?
                    <ExpandLessIcon onClick={this.handlePanelOpen} /> :
                    <ExpandMoreIcon onClick={this.handlePanelOpen} />
                  }
                </Cell>
                <Cell>
                  <strong>
                    {dueDateStr}
                  </strong>
                </Cell>
                {!isPatient &&
                  <Align variant="right">
                    <strong>{patientNameStr}</strong>
                  </Align>
                }
                <Cell>
                  <Align variant="right">
                    <strong>
                      {this.getStatusWithIcon(status)}
                    </strong>
                  </Align>
                </Cell>
                { isPatient &&
                  <Cell>
                    <Align variant="right">
                      <NavigationIconMenu menuItems={menuItems} />
                    </Align>
                  </Cell>
                 }
              </Grid>
            </ToDoCardCell>
          </ExpansionPanelSummary>
          <Divider light />
          <ExpansionPanelDetails>
            <ToDoCardCell top={2} left={1} width={12}>
              <p>{ description }</p>
            </ToDoCardCell>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Padding>
    );
  }
}

ToDoAccordion.propTypes = {
  isPatient: PropTypes.bool,
  columns: PropTypes.string,
  toDoLogicalId: PropTypes.string,
  isPractitioner: PropTypes.bool.isRequired,
  taskBaseUrl: PropTypes.string,
  patientId: PropTypes.string,
  description: PropTypes.string.isRequired,
  dueDate: PropTypes.string,
  patientName: PropTypes.string,
  status: PropTypes.string.isRequired,
  openDialog: PropTypes.func,
};

export default ToDoAccordion;
