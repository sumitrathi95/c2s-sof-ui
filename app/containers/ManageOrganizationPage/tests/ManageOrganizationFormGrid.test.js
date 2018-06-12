import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ManageOrganizationFormGrid from '../ManageOrganizationFormGrid';

configure({ adapter: new Adapter() });

describe('<ManageOrganizationFormGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageOrganizationFormGrid>{children}</ManageOrganizationFormGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageOrganizationFormGrid>{children}</ManageOrganizationFormGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageOrganizationFormGrid>{children}</ManageOrganizationFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have grid specific styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageOrganizationFormGrid>{children}</ManageOrganizationFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-column-gap', '2vw');
      expect(renderedComponent).toHaveStyleRule('grid-row-gap', '2vh');
    });

    it('should have non-grid specific styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageOrganizationFormGrid>{children}</ManageOrganizationFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('color', '#444');
      expect(renderedComponent).toHaveStyleRule('width', 'auto');
      expect(renderedComponent).toHaveStyleRule('padding-left', '0.5vw');
      expect(renderedComponent).toHaveStyleRule('margin', '0 1vw');
    });
  });
});
