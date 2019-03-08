import React from 'react';
import PropTypes from 'prop-types';
import { Header, List } from 'semantic-ui-react';

import { convertTimestampToDate } from '../../../../shared/utils/datetime';

export default function ReadOnlyMetadata({ image }) {
  return (
    <>
      <Header content="Read-only metadata" size="medium" />
      <List>
        <List.Item>
          <List.Header>ID</List.Header>
          {image.id}
        </List.Item>
        <List.Item>
          <List.Header>File name</List.Header>
          {image.name}
        </List.Item>
        <List.Item>
          <List.Header>URL (full size image)</List.Header>
          {image.url}
        </List.Item>
        <List.Item>
          <List.Header>Size (bytes)</List.Header>
          {image.size}
        </List.Item>
        <List.Item>
          <List.Header>Type</List.Header>
          {image.type}
        </List.Item>
        <List.Item>
          <List.Header>Uploaded</List.Header>
          {convertTimestampToDate(image.uploaded)}
        </List.Item>
      </List>
    </>
  );
}

ReadOnlyMetadata.propTypes = {
  image: PropTypes.object.isRequired
};
