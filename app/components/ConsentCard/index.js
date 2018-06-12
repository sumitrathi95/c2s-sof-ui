/**
 *
 * ConsentCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';

import TextLabelGroup from 'components/TextLabelGroup';
import HorizontalAlignment from 'components/HorizontalAlignment';
import ConsentCardGrid from './ConsentCardGrid';
import ConsentCardHeaderCell from './ConsentCardHeaderCell';
import ConsentCartHeader from './ConsentCartHeader';
import ConsentCardContentCell from './ConsentCardContentCell';
import ConsentOptions from './ConsentOptions';
import messages from './messages';


function ConsentCard(props) { // eslint-disable-line react/prefer-stateless-function
  const { consent } = props;
  return (
    <ConsentCardGrid columns={1}>
      <ConsentCardHeaderCell>
        <ConsentCartHeader consent={consent} />
      </ConsentCardHeaderCell>
      <ConsentCardContentCell>
        <Grid columns={2}>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.consentStatus} />}
              text={consent.status}
            />
          </Cell>
          <Cell>
            <HorizontalAlignment position="end">
              <ConsentOptions consent={consent} />
            </HorizontalAlignment>
          </Cell>
        </Grid>
      </ConsentCardContentCell>
    </ConsentCardGrid>
  );
}

ConsentCard.propTypes = {
  consent: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    status: PropTypes.string,
    fromActor: PropTypes.array,
    toActor: PropTypes.array,
    period: PropTypes.shape({
      start: PropTypes.date,
      end: PropTypes.date,
    }),
  }).isRequired,
};

export default ConsentCard;
