import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Responsive,
  Sidebar,
  Menu,
  Segment,
  Icon,
  Container
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import AppHeader from '../../headers/AppHeader/AppHeader';
import * as routes from '../../../../shared/constants/routes';

export default function MobileMenu({
  children,
  userIsAdmin = false,
  user,
  logout
}) {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  return (
    <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          inverted
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item>Hello {user.firstName}</Menu.Item>
          <Menu.Item
            name="properties"
            as={NavLink}
            to={routes.PROPERTIES}
            onClick={() => setSidebarOpened(false)}
          >
            Properties
          </Menu.Item>
          {userIsAdmin && (
            <Menu.Item
              name="admin"
              as={NavLink}
              to={routes.ADMIN}
              onClick={() => setSidebarOpened(false)}
            >
              Admin
            </Menu.Item>
          )}
          <Menu.Item
            name="settings"
            as={NavLink}
            to={routes.ACCOUNT}
            onClick={() => setSidebarOpened(false)}
          >
            Settings
          </Menu.Item>
          <Menu.Item name="logout" onClick={logout}>
            Log out
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher
          dimmed={sidebarOpened}
          onClick={() => (sidebarOpened ? setSidebarOpened(false) : null)}
          style={{ minHeight: '100vh' }}
        >
          <Segment
            inverted
            textAlign="center"
            vertical
            style={{ minHeight: '100px', padding: '1em 0em' }}
          >
            <AppHeader mobile />
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={() => setSidebarOpened(!sidebarOpened)}>
                  <Icon name="sidebar" />
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Responsive>
  );
}

MobileMenu.propTypes = {
  children: PropTypes.element.isRequired,
  userIsAdmin: PropTypes.bool,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};
