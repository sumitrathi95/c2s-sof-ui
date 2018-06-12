/**
 *
 * TaskTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import sizeMeHOC from 'utils/SizeMeUtils';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import ExpansionTableRow from 'components/ExpansionTableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import {
  EXPANDED_TABLE_COLUMNS,
  STATUS_CODE_CANCELLED,
  SUMMARIZED_TABLE_COLUMNS,
} from 'components/TaskTable/constants';
import TaskExpansionRowDetails from './TaskExpansionRowDetails';
import messages from './messages';

function TaskTable({ elements, cancelTask, patientId, communicationBaseUrl, taskBaseUrl, relativeTop, isExpanded }) {
  function createTableHeaders() {
    const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
    return (
      <TableHeader columns={columns} relativeTop={relativeTop}>
        <TableHeaderColumn />
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderActivityType} /></TableHeaderColumn>
        <TableHeaderColumn> <FormattedMessage {...messages.columnHeaderTaskOwner} /></TableHeaderColumn>
        {isExpanded &&
        <TableHeaderColumn> <FormattedMessage {...messages.columnHeaderDescription} /></TableHeaderColumn>
        }
        {isExpanded &&
        <TableHeaderColumn> <FormattedMessage {...messages.columnHeaderCreatedOn} /></TableHeaderColumn>
        }
        {!isExpanded ?
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskEndDate} /></TableHeaderColumn>
          :
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskPeriod} /></TableHeaderColumn>
        }
        {isExpanded &&
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderLastModified} /></TableHeaderColumn>
        }
        {isExpanded &&
        <TableHeaderColumn><FormattedMessage {...messages.subTasks} /></TableHeaderColumn>
        }
        {isExpanded &&
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
        }
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
      </TableHeader>
    );
  }

  function createTableRows(task) {
    const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
    const { logicalId, definition, status, description, authoredOn, executionPeriod, owner, lastModified, remainingSubtasks, totalSubtasks } = task;
    const menuItems = [{
      primaryText: <FormattedMessage {...messages.editTask} />,
      linkTo: {
        pathname: `${taskBaseUrl}/${logicalId}`,
        search: `?patientId=${patientId}&isMainTask=true`,
      },
    }, {
      primaryText: <FormattedMessage {...messages.addSubTask} />,
      linkTo: {
        pathname: `${taskBaseUrl}`,
        search: `?patientId=${patientId}&isMainTask=false&mainTaskId=${logicalId}`,
      },
    }, {
      primaryText: <FormattedMessage {...messages.addCommunication} />,
      linkTo: {
        pathname: `${communicationBaseUrl}`,
        search: `?patientId=${patientId}&taskId=${logicalId}`,
      },
    }, {
      primaryText: <FormattedMessage {...messages.cancelTask} />,
      disabled: status.code === STATUS_CODE_CANCELLED,
      onClick: () => cancelTask(logicalId),
    }];
    return (
      <ExpansionTableRow
        key={logicalId}
        columns={columns}
        expansionTableRowDetails={<TaskExpansionRowDetails task={task} />}
      >
        <TableRowColumn>{definition && definition.display}</TableRowColumn>
        <TableRowColumn>{owner && owner.display} </TableRowColumn>
        {isExpanded &&
        <TableRowColumn>{description}</TableRowColumn>
        }
        {isExpanded &&
        <TableRowColumn>{authoredOn}</TableRowColumn>
        }
        {!isExpanded ?
          <TableRowColumn>{executionPeriod && executionPeriod.end} </TableRowColumn>
          :
          <TableRowColumn>{executionPeriod && executionPeriod.start}
            - {executionPeriod && executionPeriod.end} </TableRowColumn>
        }
        {isExpanded &&
        <TableRowColumn>{lastModified} </TableRowColumn>
        }
        {isExpanded &&
        <TableRowColumn>{remainingSubtasks}/{totalSubtasks} tasks remaining</TableRowColumn>
        }
        {isExpanded &&
        <TableRowColumn>{status && status.display}</TableRowColumn>
        }
        <TableRowColumn>
          <NavigationIconMenu menuItems={menuItems} />
        </TableRowColumn>
      </ExpansionTableRow>
    );
  }

  return (
    <Table>
      {createTableHeaders()}
      {!isEmpty(elements) && elements.map((element) => createTableRows(element))}
    </Table>
  );
}

TaskTable.propTypes = {
  isExpanded: PropTypes.bool,
  relativeTop: PropTypes.number.isRequired,
  cancelTask: PropTypes.func.isRequired,
  patientId: PropTypes.string.isRequired,
  communicationBaseUrl: PropTypes.string.isRequired,
  taskBaseUrl: PropTypes.string.isRequired,
  elements: PropTypes.arrayOf(PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    definition: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
    status: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
    priority: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
    authoredOn: PropTypes.string,
    executionPeriod: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
    agent: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
    owner: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
    totalSubtasks: PropTypes.number.isRequired,
    remainingSubtasks: PropTypes.number.isRequired,
  })),
};

export default sizeMeHOC(TaskTable);
