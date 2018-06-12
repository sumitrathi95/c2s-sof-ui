import React from 'react';
import { FormattedMessage } from 'react-intl';
import ControlledAccordion from 'components/ControlledAccordion';
import FullWidthPanelDetails from 'components/ControlledAccordion/FullWidthPanelDetails';
import StyledText from 'components/StyledText';
import PanelSection from 'components/PanelSection';
import messages from './messages';


function CareTeamPanel() {
  return (
    <PanelSection>
      <ControlledAccordion
        accordionTitle={
          <StyledText fontSize="16px" whiteSpace>
            <FormattedMessage {...messages.careTeamPanelSummary} />
          </StyledText>
        }
      >
        <FullWidthPanelDetails>
          Under Construction
        </FullWidthPanelDetails>
      </ControlledAccordion>
    </PanelSection>
  );
}

CareTeamPanel.propTypes = {};

export default CareTeamPanel;
