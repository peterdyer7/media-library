import React from 'react';
import PropTypes from 'prop-types';
import { Container, Menu } from 'semantic-ui-react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import * as routes from '../../../shared/constants/routes';
import AdminProperties from '../AdminProperites/AdminProperties';
import AdminProperty from '../AdminProperty/AdminProperty';
import AdminSettings from '../AdminSettings/AdminSettings';

export default function Admin({ match }) {
  return (
    <>
      <br />
      <Container>
        <Menu pointing secondary>
          <Menu.Item
            name="Properties"
            as={NavLink}
            to={match.url + routes.ADMINPROPERTIES}
          />
          <Menu.Item
            name="Settings"
            as={NavLink}
            to={match.url + routes.ADMINSETTINGS}
          />
        </Menu>
        <Switch>
          <Route
            path={match.path + routes.ADMINPROPERTIES}
            exact
            component={AdminProperties}
          />
          <Route
            path={match.path + routes.ADMINPROPERTY}
            component={AdminProperty}
          />
          <Route
            path={match.path + routes.ADMINSETTINGS}
            component={AdminSettings}
          />
          <Redirect to={match.path + routes.ADMINPROPERTIES} />
        </Switch>
      </Container>
    </>
  );
}

Admin.propTypes = {
  match: PropTypes.object.isRequired
};
