import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import InfoSection from 'components/InfoSection';
import StyledText from 'components/StyledText';
import TextLabelGroup from 'components/TextLabelGroup';
import messages from './messages';


function CommunicationExpansionRowDetails({ communication }) {
  const { payloadContent, note, notDoneReasonValue, recipient } = communication;
  return (
    <div>
      <InfoSection>
        <Grid columns={'100%'} justifyContent="space-between">
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.noCommunicatonReason} />}
              text={notDoneReasonValue}
            />
          </Cell>
        </Grid>
        <Grid columns={'50% 50%'} justifyContent="space-between">
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.message} />}
              text={payloadContent}
            />
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.note} />}
              text={note}
            />
          </Cell>
        </Grid>
        <Grid columns={'100%'} justifyContent="space-between">
          <Cell>
            <StyledText >
              {<FormattedMessage {...messages.expansionRowDetails.recipients} />}
            </StyledText>
          </Cell>
        </Grid>
      </InfoSection>
      <Table>
        <TableHeader columns={'4fr 4fr'}>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.columnHeaderName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.columnHeaderRole} /></TableHeaderColumn>
        </TableHeader>
        {recipient && recipient.map((entry) => {
          const { reference, display } = entry;
          return (
            <TableRow key={reference} columns={'4fr 4fr'}>
              <TableRowColumn>{display}</TableRowColumn>
              <TableRowColumn>{reference}</TableRowColumn>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
}

CommunicationExpansionRowDetails.propTypes = {
  communication: PropTypes.object.isRequired,
};

export default CommunicationExpansionRowDetails;
