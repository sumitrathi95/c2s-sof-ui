import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';

import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import messages from './messages';

function PatientExpansionRowDetails({ patient }) {
  const { addresses, name, identifier, telecoms, active, birthDate, genderCode, birthSex } = patient;
  return (
    <InfoSection>
      <Grid columns={'60% 40%'} justifyContent="space-between">
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.name} />}
            text={name}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.identifiers} />}
            text={identifier}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.addresses} />}
            text={addresses}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.telecoms} />}
            text={telecoms}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.status} />}
            text={active ?
              <FormattedMessage {...messages.active} /> :
              <FormattedMessage {...messages.inactive} />
            }
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.dob} />}
            text={birthDate}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.gender} />}
            text={genderCode}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.birthSex} />}
            text={birthSex}
          />
        </Cell>
      </Grid>
    </InfoSection>
  );
}

PatientExpansionRowDetails.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    identifier: PropTypes.string,
    active: PropTypes.bool,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.string,
    telecoms: PropTypes.string,
    birthDate: PropTypes.string,
    genderCode: PropTypes.string,
    birthSex: PropTypes.string,
  }).isRequired,
};

export default PatientExpansionRowDetails;
