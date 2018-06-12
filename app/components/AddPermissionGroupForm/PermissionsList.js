import React from 'react';
import Subheader from 'material-ui/Subheader';
import ArrowFowardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StyledIconButton from 'components/StyledIconButton';
import { Cell, Grid } from 'styled-css-grid';
import StyledListItem from './StyledListItem';
import StyledList from './StyledList';
import PermissionAddButtonsSection from './PermissionAddButtonsSection';

function PermissionsList() {
  return (
    <div>
      <Grid columns={5}>
        <Cell row={1} width={2}>
          <Subheader>Permissions</Subheader>
          <StyledList defaultValue={1}>
            <StyledListItem
              value={1}
              primaryText="A user can create an organization"
            />
            <StyledListItem
              value={2}
              primaryText="A user can read an organization"
            />
            <StyledListItem
              value={3}
              primaryText="A user can update an organization"
            />
            <StyledListItem
              value={4}
              primaryText="A user can delete an organization"
            />
            <StyledListItem
              value={5}
              primaryText="A user can create a location"
            />
            <StyledListItem
              value={6}
              primaryText="A user can read a location"
            />
            <StyledListItem
              value={7}
              primaryText="A user can update a location"
            />
            <StyledListItem
              value={8}
              primaryText="A user can delete a location"
            />
            <StyledListItem
              value={9}
              primaryText="A user can create a practitioner"
            />
            <StyledListItem
              value={10}
              primaryText="A user can read a practitioner"
            />
            <StyledListItem
              value={11}
              primaryText="A user can update a practitioner"
            />
            <StyledListItem
              value={12}
              primaryText="A user can delete a practitioner"
            />
            <StyledListItem
              value={13}
              primaryText="A user can create a patient"
            />
            <StyledListItem
              value={14}
              primaryText="A user can read a patient"
            />
            <StyledListItem
              value={15}
              primaryText="A user can update a patient"
            />
            <StyledListItem
              value={16}
              primaryText="A user can delete a patient"
            />
          </StyledList>
        </Cell>
        <Cell row={1} width={1}>
          <PermissionAddButtonsSection>
            <Grid columns={1}>
              <StyledIconButton svgIconSize="large">
                <ArrowFowardIcon />
              </StyledIconButton>
              <StyledIconButton svgIconSize="large">
                <ArrowBackIcon />
              </StyledIconButton>
            </Grid>
          </PermissionAddButtonsSection>
        </Cell>
        <Cell row={1} width={2}>
          <Subheader>Added Permissions</Subheader>
          <StyledList defaultValue={1}>
          </StyledList>
        </Cell>
      </Grid>
    </div>
  );
}

PermissionsList.propTypes = {};

export default PermissionsList;
