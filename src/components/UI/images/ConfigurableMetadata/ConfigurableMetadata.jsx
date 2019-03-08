import React from 'react';
import PropTypes from 'prop-types';
import { Header, List } from 'semantic-ui-react';

export default function ConfigurableMetadata({ image }) {
  return (
    <>
      <Header content="Configurable metadata" size="medium" />
      <List>
        <List.Item>
          <List.Header>Category</List.Header>
          {image.primaryCategory}
        </List.Item>
        <List.Item>
          <List.Header>Alt category</List.Header>
          {image.secondaryCategory ? image.secondaryCategory : <br />}
        </List.Item>
        <List.Item>
          <List.Header>Tags</List.Header>
          {image.tags ? image.tags.join(', ') : <br />}
        </List.Item>
      </List>
    </>
  );
}

ConfigurableMetadata.propTypes = {
  image: PropTypes.object.isRequired
};
