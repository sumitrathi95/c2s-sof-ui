/**
 *
 * SearchParticipant
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, Formik } from 'formik';
import yup from 'yup';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import uniqueId from 'lodash/uniqueId';
import MenuItem from 'material-ui/MenuItem';
import ActionSearch from '@material-ui/icons/Search';
import { Cell, Grid } from 'styled-css-grid';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { mapSearchParticipantName } from 'utils/CareTeamUtils';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import Table from 'components/Table';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import TableHeader from 'components/TableHeader';
import DatePickerWithoutBlur from 'components/DatePickerWithoutBlur';
import SelectFieldWithoutOnClick from 'components/SelectFieldWithoutOnClick';
import StyledRaisedButton from 'components/StyledRaisedButton';
import FormSubtitle from 'components/FormSubtitle';
import StyledFlatButton from 'components/StyledFlatButton';
import WideDialog from 'components/WideDialog';
import { makeSelectParticipantRoles, makeSelectParticipantTypes } from 'containers/App/lookupSelectors';
import { DATE_PICKER_MODE, PARTICIPANTROLE, PARTICIPANTTYPE } from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import { makeSelectOrganization, makeSelectPatient } from 'containers/App/contextSelectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { addParticipants, getSearchParticipant, initializeSearchParticipant } from './actions';
import { makeSelectSearchParticipantResults } from './selectors';
import ParticipantName from './ParticipantName';
import ParticipantSearchContainer from './ParticipantSearchContainer';
import AddParticipantDialogIconButton from './AddParticipantDialogIconButton';

export class SearchParticipant extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  componentDidMount() {
    this.props.getLookUpFormData();
    this.props.initializeSearchParticipant(this.props.initialSelectedParticipants);
  }

  addParticipant(participant) {
    this.handleDialogClose();
    const selected = [];
    selected.push(participant);
    this.props.addParticipants(selected);
  }

  handleDialogClose() {
    this.setState({ open: false });
    this.props.handleClose();
  }

  handleSearch(values) {
    const { name, member } = values;
    const orgId = (this.props.organization) ? this.props.organization.logicalId : undefined;
    this.props.searchParticipant(name, member, this.props.patient.id, orgId);
  }

  createSearchResultHeader() {
    return (
      <Table>
        <TableHeader>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderName} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderRole} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderStartDate} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderEndDate} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderAction} />}</TableHeaderColumn>
        </TableHeader>
      </Table>
    );
  }

  createSearchResultRows() {
    const today = new Date();
    const participantRoles = this.props.participantRoles;
    return this.props.searchParticipantResult.map((participant) => (
      <Formik
        key={uniqueId()}
        initialValues={{}}
        onSubmit={(values, actions) => {
          const { roleCode, startDate, endDate } = values;
          const role = find(this.props.participantRoles, { code: roleCode });
          const smallParticipant = {
            roleCode,
            startDate: startDate.toLocaleDateString(),
            endDate: endDate.toLocaleDateString(),
            roleDisplay: role.display,
            memberId: participant.member.id,
            memberType: participant.member.type,
            name: mapSearchParticipantName(participant),
          };
          this.addParticipant(smallParticipant);
          actions.setSubmitting(false);
        }}
        validationSchema={() =>
          yup.lazy((values) => {
            let startDate = new Date();
            if (values.startDate) {
              startDate = values.startDate;
            }
            return yup.object().shape({
              roleCode: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              startDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
              endDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(startDate.toLocaleDateString(), (<FormattedMessage {...messages.validation.minEndDate} />)),
            });
          })}
        render={(formikProps) => {
          const { isSubmitting, dirty, isValid } = formikProps;
          return (
            <Form>
              <Table>
                <TableRow key={uniqueId()}>
                  <TableRowColumn>
                    <Grid columns={5}>
                      <Cell middle>
                        <ParticipantName>
                          {mapSearchParticipantName(participant)}
                        </ParticipantName>
                      </Cell>
                      <Cell middle>
                        <SelectFieldWithoutOnClick
                          name="roleCode"
                          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.participantRole} />}
                        >
                          {participantRoles && participantRoles.map((participantRole) =>
                            (<MenuItem
                              key={uniqueId()}
                              value={participantRole.code}
                              primaryText={participantRole.display}
                            />),
                          )}
                        </SelectFieldWithoutOnClick>
                      </Cell>
                      <Cell middle>
                        <DatePickerWithoutBlur
                          fullWidth
                          name="startDate"
                          minDate={today}
                          mode={DATE_PICKER_MODE.LANDSCAPE}
                          hintText={<FormattedMessage {...messages.hintText.startDate} />}
                          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startDate} />}
                        />
                      </Cell>
                      <Cell middle>
                        <DatePickerWithoutBlur
                          fullWidth
                          name="endDate"
                          minDate={today}
                          mode={DATE_PICKER_MODE.LANDSCAPE}
                          hintText={<FormattedMessage {...messages.hintText.endDate} />}
                          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endDate} />}
                        />
                      </Cell>
                      <Cell middle>
                        <StyledRaisedButton
                          type="submit"
                          value={participant}
                          disabled={!dirty || isSubmitting || !isValid}
                        >
                          <FormattedMessage {...messages.addParticipantBtnLabel} />
                        </StyledRaisedButton>
                      </Cell>
                    </Grid>
                  </TableRowColumn>
                </TableRow>
              </Table>
            </Form>
          );
        }}
      />
    ));
  }

  createNoSearchResultTable() {
    return (<Table>
      <TableHeader>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderName} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderRole} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderStartDate} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderEndDate} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderAction} />}</TableHeaderColumn>
      </TableHeader>
      <TableRow key={uniqueId()}>
        <TableRowColumn> {<FormattedMessage {...messages.noSearchParticipantResult} />}</TableRowColumn>
        <TableRowColumn> </TableRowColumn>
        <TableRowColumn> </TableRowColumn>
        <TableRowColumn> </TableRowColumn>
      </TableRow>
    </Table>);
  }

  render() {
    const { participantTypes, isOpen, searchParticipantResult } = this.props;
    const actionsButtons = [
      <StyledFlatButton onClick={this.handleDialogClose}>
        <FormattedMessage {...messages.addParticipantDialogCancelBtnLabel} />
      </StyledFlatButton>,
    ];
    return (
      <WideDialog
        actions={actionsButtons}
        modal={false}
        open={isOpen}
        autoScrollBodyContent
      >
        <FormSubtitle margin="0">
          <FormattedMessage {...messages.addParticipantDialogTitle} />
        </FormSubtitle>
        <Formik
          onSubmit={(values, actions) => {
            this.handleSearch(values);
            actions.setSubmitting(false);
          }}
          validationSchema={yup.object().shape({
            member: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
          })}
          render={(formikProps) => {
            const { isSubmitting, dirty, isValid } = formikProps;
            return (
              <Form>
                <ParticipantSearchContainer>
                  <Grid columns={3}>
                    <Cell>
                      <TextField
                        name="name"
                        fullWidth
                        hintText={<FormattedMessage {...messages.hintText.practitionerName} />}
                        floatingLabelText={<FormattedMessage {...messages.floatingLabelText.practitionerName} />}
                      />
                    </Cell>
                    <Cell>
                      <SelectField
                        name="member"
                        fullWidth
                        floatingLabelText={<FormattedMessage {...messages.floatingLabelText.practitionerMember} />}
                      >
                        {participantTypes && participantTypes.map((member) =>
                          <MenuItem key={member.code} value={member.code} primaryText={member.display} />,
                        )
                        }
                      </SelectField>
                    </Cell>
                    <Cell>
                      <AddParticipantDialogIconButton
                        tooltip={<FormattedMessage {...messages.searchButtonTooltip} />}
                        type="submit"
                        disabled={!dirty || isSubmitting || !isValid}
                      >
                        <ActionSearch />
                      </AddParticipantDialogIconButton>
                    </Cell>
                  </Grid>
                </ParticipantSearchContainer>
              </Form>
            );
          }}
        />
        {searchParticipantResult && searchParticipantResult.length > 0 && this.createSearchResultHeader()}
        {searchParticipantResult && searchParticipantResult.length > 0 && this.createSearchResultRows()}
        {searchParticipantResult && searchParticipantResult.length === 0 && this.createNoSearchResultTable()}
      </WideDialog>
    );
  }
}

SearchParticipant.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  initialSelectedParticipants: PropTypes.array,
  searchParticipant: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  initializeSearchParticipant: PropTypes.func.isRequired,
  addParticipants: PropTypes.func.isRequired,
  getLookUpFormData: PropTypes.func.isRequired,
  searchParticipantResult: PropTypes.array,
  participantRoles: PropTypes.array,
  patient: PropTypes.object,
  participantTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    definition: PropTypes.string,
    system: PropTypes.string,
  })),
  organization: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  participantTypes: makeSelectParticipantTypes(),
  searchParticipantResult: makeSelectSearchParticipantResults(),
  participantRoles: makeSelectParticipantRoles(),
  patient: makeSelectPatient(),
  organization: makeSelectOrganization(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookUpFormData: () => dispatch(getLookupsAction([PARTICIPANTTYPE, PARTICIPANTROLE])),
    searchParticipant: (name, member, patientId, organizationId) => dispatch(getSearchParticipant(name, member, patientId, organizationId)),
    addParticipants: (participant) => dispatch(addParticipants(participant)),
    initializeSearchParticipant: (initialSelectedParticipants) => dispatch(initializeSearchParticipant(initialSelectedParticipants)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchParticipant', reducer });
const withSaga = injectSaga({ key: 'searchParticipant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchParticipant);
