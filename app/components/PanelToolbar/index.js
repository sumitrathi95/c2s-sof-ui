/**
 *
 * PanelToolbar
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ToolbarGroup } from 'material-ui/Toolbar';
import AddCircle from '@material-ui/icons/AddCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import FileUploadIcon from '@material-ui/icons/FileUpload';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import FilterIcon from '@material-ui/icons/FilterList';
import common from 'material-ui-next/colors/common';
import isUndefined from 'lodash/isUndefined';

import sizeMeHOC from 'utils/SizeMeUtils';
import ShowHideWrapper, { functionalRoles } from 'containers/ShowHideWrapper';
import StyledTooltip from 'components/StyledTooltip';
import StyledIconButton from 'components/StyledIconButton';
import FilterBar from 'components/FilterBar';
import StickyDiv from 'components/StickyDiv';
import SearchBar from 'components/SearchBar';
import StyledToolbar from 'components/StyledToolbar';
import AddNewItemButton from './AddNewItemButton';
import messages from './messages';

const white = common.white;

export class PanelToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSearchBar: props.showSearchBarByDefault,
      isShowFilter: false,
    };
    this.handleShowSearchBar = this.handleShowSearchBar.bind(this);
    this.handleShowFilter = this.handleShowFilter.bind(this);
  }

  handleShowFilter() {
    this.setState({ isShowFilter: !this.state.isShowFilter });
    this.setState({ isShowSearchBar: false });
  }

  handleShowSearchBar() {
    this.setState({ isShowSearchBar: !this.state.isShowSearchBar });
    this.setState({ isShowFilter: false });
  }

  renderPanelToolBar() {
    const {
      allowedAddNewItemRoles,
      showUploadIcon,
      showSettingIcon,
      showFilterIcon,
      showSearchIcon,
      addNewItem,
      onSearch,
      searchField,
      showToDoSpecificFilters,
      onFilter,
      filterField,
      hideToolbar,
    } = this.props;
    return (
      <div>
        {!hideToolbar &&
        <StyledToolbar
          color="#91AAB3"
          height="20px"
        >
          <ToolbarGroup firstChild>
            {!isUndefined(addNewItem) &&
            <ShowHideWrapper allowedRoles={allowedAddNewItemRoles}>
              <AddNewItemButton component={Link} to={addNewItem.linkUrl}>
                <StyledIconButton size="x-small" svgIconSize="small" disableIconHover>
                  <AddCircle color={white} />
                </StyledIconButton>
                {addNewItem.labelName}
              </AddNewItemButton>
            </ShowHideWrapper>
            }
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            {showUploadIcon &&
            <StyledTooltip title={<FormattedMessage {...messages.uploadFiles} />}>
              <StyledIconButton svgIconSize="small">
                <FileUploadIcon color={white} />
              </StyledIconButton>
            </StyledTooltip>
            }
            {showSettingIcon &&
            <StyledTooltip title={<FormattedMessage {...messages.settings} />}>
              <StyledIconButton svgIconSize="small">
                <SettingsIcon color={white} />
              </StyledIconButton>
            </StyledTooltip>
            }
            {showFilterIcon &&
            <StyledTooltip
              title={this.state.isShowFilter ?
                <FormattedMessage {...messages.cancelFilter} /> :
                <FormattedMessage {...messages.filter} />}
            >
              <StyledIconButton svgIconSize="small" onClick={this.handleShowFilter}>
                {this.state.isShowFilter ?
                  <CancelIcon color={white} /> : <FilterIcon color={white} />
                }
              </StyledIconButton>
            </StyledTooltip>
            }
            {showSearchIcon &&
            <StyledTooltip
              title={this.state.isShowSearchBar ?
                <FormattedMessage {...messages.cancelSearch} /> :
                <FormattedMessage {...messages.search} />}
            >
              <StyledIconButton svgIconSize="small" onClick={this.handleShowSearchBar}>
                {this.state.isShowSearchBar ?
                  <CancelIcon color={white} /> : <SearchIcon color={white} />
                }
              </StyledIconButton>
            </StyledTooltip>
            }
          </ToolbarGroup>
        </StyledToolbar>}
        {this.state.isShowSearchBar &&
        <SearchBar
          onSearch={onSearch}
          searchField={searchField}
          showToDoSpecificFilters={showToDoSpecificFilters}
        />
        }
        {this.state.isShowFilter &&
        <FilterBar
          onFilter={onFilter}
          filterField={filterField}
          showFilter={showToDoSpecificFilters}
        />
        }
      </div>
    );
  }

  render() {
    const {
      sticky,
    } = this.props;
    let renderContent = (
      <div>{this.renderPanelToolBar()}</div>
    );
    if (sticky) {
      renderContent = (
        <StickyDiv>{this.renderPanelToolBar()}</StickyDiv>
      );
    }

    return renderContent;
  }
}

PanelToolbar.propTypes = {
  sticky: PropTypes.bool,
  allowedAddNewItemRoles: PropTypes.oneOfType([
    PropTypes.oneOf(functionalRoles).isRequired,
    PropTypes.arrayOf(
      PropTypes.oneOf(functionalRoles).isRequired,
    ),
  ]),
  showToDoSpecificFilters: PropTypes.bool,
  showUploadIcon: PropTypes.bool,
  showSettingIcon: PropTypes.bool,
  showFilterIcon: PropTypes.bool,
  showSearchIcon: PropTypes.bool,
  showSearchBarByDefault: PropTypes.bool,
  addNewItem: PropTypes.shape({
    labelName: PropTypes.node.isRequired,
    linkUrl: PropTypes.string.isRequired,
  }),
  onSearch: PropTypes.func,
  onFilter: PropTypes.func,
  filterField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(PropTypes.shape({
      dateRangeCode: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })),
    filterValueHintText: PropTypes.node.isRequired,
  }),
  searchField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })),
    searchValueHintText: PropTypes.node.isRequired,
  }),
  hideToolbar: PropTypes.bool,
};

PanelToolbar.defaultProps = {
  sticky: true,
  addNewItem: undefined,
  showUploadIcon: true,
  showSettingIcon: true,
  showFilterIcon: true,
  showSearchIcon: true,
  showSearchBarByDefault: false,
  showFilter: true,
  showToDoSpecificFilters: false,
  hideToolbar: false,
};

export default sizeMeHOC(PanelToolbar);
