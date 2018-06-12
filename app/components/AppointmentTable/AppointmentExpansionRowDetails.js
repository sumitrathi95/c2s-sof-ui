import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import startCase from 'lodash/startCase';
import camelCase from 'lodash/camelCase';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import StyledText from 'components/StyledText/index';
import Align from 'components/Align/index';
import { getRoleName } from 'utils/CommunicationUtils';
import messages from './messages';

function AppointmentExpansionRowDetails({ participants, appointmentType }) {
  const column = '2.5fr 3fr 3.5fr 3fr';
  return (
    <div>
      <InfoSection>
        <Grid columns={'100%'} justifyContent="space-between">
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.appointmentType} />}
              text={appointmentType}
            />
          </Cell>
        </Grid>
        <Grid columns={'100%'} justifyContent="space-between">
          <Cell>
            <StyledText>
              <Align variant={'left'}>
                {<FormattedMessage {...messages.expansionRowDetails.participants} />}
              </Align>
            </StyledText>
          </Cell>
        </Grid>
      </InfoSection>
      <Table>
        <TableHeader columns={column}>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.appointmentName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.participantType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.participationType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.status} /></TableHeaderColumn>
        </TableHeader>
        {participants && participants.length > 0 ?
          participants.map((participant) => {
            const { actorName, actorReference, participationStatusCode, participationTypeDisplay } = participant;
            return (
              <TableRow key={uniqueId()} columns={column}>
                <TableRowColumn>{actorName}</TableRowColumn>
                <TableRowColumn>{getRoleName(actorReference)}</TableRowColumn>
                <TableRowColumn>{startCase(camelCase(participationTypeDisplay))}</TableRowColumn>
                <TableRowColumn>{startCase(camelCase(participationStatusCode))}</TableRowColumn>
              </TableRow>
            );
          }) : (
            <TableRow>
              <TableRowColumn>
                <span><FormattedMessage {...messages.expansionRowDetails.noParticipantAdded} /></span>
              </TableRowColumn>
            </TableRow>)
        }
      </Table>
    </div>
  );
}

AppointmentExpansionRowDetails.propTypes = {
  participants: PropTypes.array,
  appointmentType: PropTypes.string,
};

export default AppointmentExpansionRowDetails;
