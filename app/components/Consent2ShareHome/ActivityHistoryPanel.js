import React from 'react';
import { FormattedMessage } from 'react-intl';
import ControlledAccordion from 'components/ControlledAccordion';
import FullWidthPanelDetails from 'components/ControlledAccordion/FullWidthPanelDetails';
import StyledText from 'components/StyledText';
import PanelSection from 'components/PanelSection';
import messages from './messages';


function ActivityHistoryPanel() {
  return (
    <PanelSection>
      <ControlledAccordion
        accordionTitle={
          <StyledText fontSize="16px" whiteSpace>
            <FormattedMessage {...messages.activityHistoryPanelSummary} />
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

ActivityHistoryPanel.propTypes = {};

export default ActivityHistoryPanel;
