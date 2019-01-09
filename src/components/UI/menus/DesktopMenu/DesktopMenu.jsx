import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, Segment, Menu, Container, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import AppHeader from '../../headers/AppHeader/AppHeader';
import * as routes from '../../../../shared/constants/routes';

export default function DesktopMenu({ children, user, logout }) {
  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Segment
        inverted
        textAlign="center"
        vertical
        style={{ padding: '1em 0em' }}
      >
        <AppHeader />
        <Container>
          <Menu inverted size="large">
            <Menu.Item name="properties" as={NavLink} to={routes.PROPERTIES}>
              Properties
            </Menu.Item>
            {user.role === 'admin' && (
              <Menu.Item name="admin" as={NavLink} to={routes.ADMIN}>
                Admin
              </Menu.Item>
            )}
            <Menu.Menu position="right">
              <Menu.Item>Hello {user.firstName}</Menu.Item>
              <Menu.Item name="account" as={NavLink} to={routes.ACCOUNT}>
                <Icon name="setting" />
                Settings
              </Menu.Item>
              <Menu.Item onClick={logout}>
                <Icon name="log out" />
                Logout
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
      </Segment>
      {children}
    </Responsive>
  );
}

DesktopMenu.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};
