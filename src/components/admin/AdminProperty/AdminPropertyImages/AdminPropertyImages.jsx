import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Icon, Header } from 'semantic-ui-react';

import ImagesList from './ImagesList/ImagesList';

export default function AdminPropertyImages({ images = [], propertyId }) {
  return (
    <>
      <Grid stackable columns={2}>
        <Grid.Row>
          <Grid.Column width={10}>
            <Segment>
              <ImagesList images={images} propertyId={propertyId} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Header size="small">
                <Icon name="upload" size="huge" />
                Upload Image
              </Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <br />
    </>
  );
}

AdminPropertyImages.propTypes = {
  images: PropTypes.array,
  propertyId: PropTypes.string.isRequired
};
