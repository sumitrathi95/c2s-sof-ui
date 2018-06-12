/**
 *
 * PrivateLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'styled-css-grid';

import PrivateHeader from 'components/PrivateHeader';
import PrivateNavigation from 'components/PrivateNavigation';
import LayoutGrid from './LayoutGrid';
import HeaderGrid from './HeaderGrid';
import HeaderCell from './HeaderCell';
import HeaderContainer from './HeaderContainer';
import ContentContainer from './ContentContainer';

function PrivateLayout(props) {
  return (
    <LayoutGrid columns={1}>
      <HeaderContainer>
        <HeaderGrid columns={1}>
          <HeaderCell>
            <PrivateHeader user={props.user} />
          </HeaderCell>
          {props.user.role &&
          <Cell>
            <PrivateNavigation
              user={props.user}
              getLinkUrlByRole={props.getLinkUrlByRole}
            />
          </Cell>
          }
        </HeaderGrid>
      </HeaderContainer>
      <ContentContainer>
        <main>{props.children}</main>
      </ContentContainer>
    </LayoutGrid>
  );
}

PrivateLayout.propTypes = {
  children: PropTypes.node,
  user: PropTypes.shape({
    role: PropTypes.string,
  }).isRequired,
  getLinkUrlByRole: PropTypes.func.isRequired,
};

export default PrivateLayout;
