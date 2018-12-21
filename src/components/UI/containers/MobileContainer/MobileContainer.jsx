import React, { useState } from 'react';
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

export default function MobileContainer({ children }) {
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
          <Menu.Item
            name="properties"
            as={NavLink}
            to={routes.PROPERTIES}
            onClick={() => setSidebarOpened(false)}
          >
            Properties
          </Menu.Item>
          <Menu.Item
            name="admin"
            as={NavLink}
            to={routes.ADMIN}
            onClick={() => setSidebarOpened(false)}
          >
            Admin
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
