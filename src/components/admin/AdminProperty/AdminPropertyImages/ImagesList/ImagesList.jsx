import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Image, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import * as routes from '../../../../../shared/constants/routes';

export default function ImagesList({ images, propertyId }) {
  return (
    <List divided>
      {images.map((image) => (
        <List.Item key={image.id}>
          <List.Content floated="right">
            <Button
              basic
              as={Link}
              to={`${routes.ADMIN}${routes.ADMINPROPERTIES}/${propertyId}${
                routes.ADMINPROPERTYIMAGES
              }/${image.id}`}
            >
              Edit
            </Button>
          </List.Content>
          {image.active ? (
            <Image
              size="small"
              src={image.thumbUrl ? image.thumbUrl : image.url}
            />
          ) : (
            <Loader active inline />
          )}
          <List.Content>
            <List.Item>
              <List.Header>Caption:</List.Header>
              {image.caption}
            </List.Item>
            <List.Item>
              <List.Header>Category:</List.Header>
              {image.primaryCategory}
            </List.Item>
            <List.Item>
              <List.Header>File name</List.Header>
              {image.name}
            </List.Item>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
}

ImagesList.propTypes = {
  images: PropTypes.array.isRequired,
  propertyId: PropTypes.string.isRequired
};
