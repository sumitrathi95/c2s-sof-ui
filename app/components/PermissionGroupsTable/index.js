/**
 *
 * PermissionGroupsTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import TableHeaderColumn from 'components/TableHeaderColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import messages from './messages';
import { PERMISSION_GROUPS_TABLE_COLUMNS } from './constants';
// import styled from 'styled-components';
const elements = [
  { logicalId: '1', name: 'Administrator', description: ' Responsible for granting access and permission to other users.' },
  { logicalId: '2', name: 'Care Manager', description: ' Supervises care coordinators and the management of patients.' },
  { logicalId: '3', name: 'Care Coordinator', description: 'A care coordinator supervises interdisciplinary care by bringing together different specialists whose help the patient may need.' },
];

const columns = PERMISSION_GROUPS_TABLE_COLUMNS;
const menuItems = [{
  primaryText: <FormattedMessage {...messages.manageGroup} />,
  disabled: true,
}];

function createTableHeaders() {
  return (
    <TableHeader columns={columns}>
      <TableHeaderColumn><FormattedMessage {...messages.permissionGroup} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.description} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.action} /></TableHeaderColumn>
    </TableHeader>
  );
}

function createTableRows() {
  return (
    <div>
      {elements && elements.map((permissionGroup) => (
        <TableRow key={permissionGroup.logicalId} columns={columns}>
          <TableRowColumn>
            {permissionGroup.name}
          </TableRowColumn>
          <TableRowColumn>
            {permissionGroup.description}
          </TableRowColumn>
          <TableRowColumn>
            <NavigationIconMenu menuItems={menuItems} />
          </TableRowColumn>
        </TableRow>
        ))}
    </div>
  );
}

function PermissionGroupsTable() { // eslint-disable-line react/prefer-stateless-function
  return (
    <Table>
      {createTableHeaders()}
      {createTableRows()}
    </Table>
  );
}

PermissionGroupsTable.propTypes = {

};

export default PermissionGroupsTable;
