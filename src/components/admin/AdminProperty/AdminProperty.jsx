import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Dimmer, Loader, Menu } from 'semantic-ui-react';
import { Link, NavLink, Switch, Route, Redirect } from 'react-router-dom';

import AdminPropertyDetails from './AdminPropertyDetails/AdminPropertyDetails';
//import AdminPropertyImages from './AdminPropertyImages/AdminPropertyImages';
import AdminPropertyImagesContainer from '../../../containers/admin/AdminProperties/AdminProperty/AdminPropertyImages/AdminPropertyImagesContainer';
import AdminPropertyImage from './AdminPropertyImage/AdminPropertyImage';
import * as routes from '../../../shared/constants/routes';

export default function AdminProperty({
  error,
  loading,
  property,
  match,
  boundPropertyFetch
}) {
  useEffect(() => {
    if (!property) {
      boundPropertyFetch(match.params.propertyId);
    }
  }, []);

  if (error) {
    return <>Error! {error}</>;
  }

  if (loading) {
    return (
      <>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
      </>
    );
  }

  return (
    <>
      <Button
        content="All Properties"
        icon="left arrow"
        labelPosition="left"
        as={Link}
        to={routes.ADMIN + routes.ADMINPROPERTIES}
      />
      {property && (
        <Header as="h3" textAlign="center">
          {property.name}
        </Header>
      )}
      <Menu pointing secondary>
        <Menu.Item
          name="Details"
          as={NavLink}
          to={match.url + routes.ADMINPROPERTYDETAILS}
        />
        <Menu.Item
          name="Images"
          as={NavLink}
          to={match.url + routes.ADMINPROPERTYIMAGES}
        />
      </Menu>
      <Switch>
        <Route
          path={match.url + routes.ADMINPROPERTYDETAILS}
          render={() => <AdminPropertyDetails property={property} />}
        />
        <Route
          path={match.url + routes.ADMINPROPERTYIMAGES}
          exact
          render={() => (
            <AdminPropertyImagesContainer
              propertyId={match.params.propertyId}
            />
          )}
        />
        <Route
          path={routes.ADMIN + routes.ADMINPROPERTY + routes.ADMINPROPERTYIMAGE}
          component={AdminPropertyImage}
        />
        <Redirect to={match.url + routes.ADMINPROPERTYDETAILS} />
      </Switch>
    </>
  );
}

AdminProperty.propTypes = {
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  property: PropTypes.object,
  match: PropTypes.object.isRequired,
  boundPropertyFetch: PropTypes.func.isRequired
};
