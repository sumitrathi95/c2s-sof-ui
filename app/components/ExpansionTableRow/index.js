/**
 *
 * ExpansionTableRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import TableRowColumn from 'components/TableRowColumn';
import TableRow from 'components/TableRow';
import StyledIconButton from 'components/StyledIconButton';
import StyledTableRowDetails from './StyledTableRowDetails';
import ExpansionTableRowDetails from './ExpansionTableRowDetails';

class ExpansionTableRow extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      expansionRowOpen: false,
      expansionRowHeight: 0,
    };
    this.handleRowOpen = this.handleRowOpen.bind(this);
    this.handleOnSize = this.handleOnSize.bind(this);
  }

  handleRowOpen() {
    this.setState({ expansionRowOpen: !this.state.expansionRowOpen });
  }

  handleOnSize(size) {
    this.setState({ expansionRowHeight: size.height });
  }

  render() {
    const {
      children,
      columns,
      onClick,
      onKeyPress,
      role,
      tabIndex,
      expansionTableRowDetails,
      ...other
    } = this.props;
    return (
      <div>
        <TableRow
          columns={columns}
          role={role}
          onClick={onClick}
          onKeyPress={onKeyPress}
          tabIndex={tabIndex}
          {...other}
        >
          <TableRowColumn>
            <StyledIconButton svgIconSize="small" size="x-small" onClick={this.handleRowOpen}>
              {this.state.expansionRowOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </StyledIconButton>
          </TableRowColumn>
          {children}
        </TableRow>
        <StyledTableRowDetails
          expanded={this.state.expansionRowOpen}
          height={`${this.state.expansionRowHeight + 20}px`}
        >
          <ExpansionTableRowDetails onSize={this.handleOnSize}>
            {expansionTableRowDetails}
          </ExpansionTableRowDetails>
        </StyledTableRowDetails>
      </div>
    );
  }
}

ExpansionTableRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.oneOf([TableRowColumn]),
    }),
    PropTypes.bool,
  ])),
  columns: PropTypes.string,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  role: PropTypes.string,
  tabIndex: PropTypes.string,
  expansionTableRowDetails: PropTypes.node.isRequired,
};

export default ExpansionTableRow;
