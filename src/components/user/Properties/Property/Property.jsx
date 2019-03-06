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
import Images from './Images/Images';
import Image from './Image/Image';
import * as routes from '../../../../shared/constants/routes';

export default function Property({
  propertyError,
  propertyLoading,
  property,
  imagesError,
  imagesLoading,
  images,
  settings,
  match,
  boundPropertyFetch,
  boundImagesPropertyFetch,
  boundSettingsFetch
}) {
  useEffect(() => {
    if (!property) {
      boundPropertyFetch(match.params.propertyId);
    }
    // TODO: consider looking through the state to see what images exist
    boundImagesPropertyFetch(match.params.propertyId);

    if (Object.keys(settings).length === 0) {
      boundSettingsFetch('imageMetadata');
    }
  }, []);

  if (propertyError) {
    return <>Error! {propertyError}</>;
  }

  if (imagesError) {
    return <>Error! {imagesError}</>;
  }

  if (!property || propertyLoading || imagesLoading) {
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
              <Images
                images={images}
                settings={settings}
                propertyId={match.params.propertyId}
              />
            )}
          />
          <Route path={routes.PROPERTY + routes.IMAGE} component={Image} />
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
  propertyError: PropTypes.string.isRequired,
  propertyLoading: PropTypes.bool.isRequired,
  imagesError: PropTypes.string,
  imagesLoading: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  boundPropertyFetch: PropTypes.func.isRequired,
  boundImagesPropertyFetch: PropTypes.func.isRequired,
  boundSettingsFetch: PropTypes.func.isRequired
};
