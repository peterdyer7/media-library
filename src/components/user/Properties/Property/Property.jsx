import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  Button,
  Header,
  Dimmer,
  Loader,
  Container
} from 'semantic-ui-react';
import { Link, NavLink, Switch, Route, Redirect } from 'react-router-dom';

import Detail from './Detail/Detail';
import ImagesContainer from '../../../../containers/user/Properties/Property/Images/ImagesContainer';
import ImageContainer from '../../../../containers/user/Properties/Property/Image/ImageContainer';
import * as routes from '../../../../shared/constants/routes';

export default function Property({
  property,
  error,
  loading,
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

  if (loading || !property) {
    return (
      <>
        <Dimmer active>
          <Loader />
        </Dimmer>
      </>
    );
  }

  return (
    <>
      <Container>
        <br />
        <Button
          content="All Properties"
          icon="left arrow"
          labelPosition="left"
          as={Link}
          to={routes.PROPERTIES}
        />
        <Header as="h3" textAlign="center">
          {property.name}
        </Header>
        <Menu pointing secondary>
          <Menu.Item
            name="Images"
            as={NavLink}
            to={match.url + routes.IMAGES}
          />
          <Menu.Item
            name="Details"
            as={NavLink}
            to={match.url + routes.DETAILS}
          />
        </Menu>
        <Switch>
          <Route
            path={match.url + routes.IMAGES}
            exact
            render={() => (
              <ImagesContainer propertyId={match.params.propertyId} />
            )}
          />
          <Route
            path={routes.PROPERTY + routes.IMAGE}
            component={ImageContainer}
            //render={() => <ImageContainer />}
          />
          <Route
            path={match.url + routes.DETAILS}
            render={() => <Detail property={property} />}
          />
          <Redirect to={match.url + routes.IMAGES} />
        </Switch>
      </Container>
    </>
  );
}

Property.propTypes = {
  match: PropTypes.object.isRequired,
  property: PropTypes.object,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  boundPropertyFetch: PropTypes.func.isRequired
};
