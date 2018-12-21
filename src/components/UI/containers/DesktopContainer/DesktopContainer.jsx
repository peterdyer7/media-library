import React from 'react';
import { Responsive, Segment, Menu, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import AppHeader from '../../headers/AppHeader/AppHeader';
import * as routes from '../../../../shared/constants/routes';

export default function DesktopContainer({ children }) {
  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Segment
        inverted
        textAlign="center"
        vertical
        style={{ padding: '1em 0em' }}
      >
        <AppHeader />
        <Menu inverted pointing secondary size="large">
          <Container>
            <Menu.Item name="properties" as={NavLink} to={routes.PROPERTIES}>
              Properties
            </Menu.Item>
            <Menu.Item name="admin" as={NavLink} to={routes.ADMIN}>
              Admin
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
      {children}
    </Responsive>
  );
}
