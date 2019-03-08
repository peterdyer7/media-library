import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Segment,
  Button,
  Container,
  Dimmer,
  Loader,
  Image as SemanticImage
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import ConfigurableMetadata from '../../../../UI/images/ConfigurableMetadata/ConfigurableMetadata';
import ReadOnlyMetadata from '../../../../UI/images/ReadOnlyMetadata/ReadOnlyMetadata';
import SafeSearch from '../../../../UI/images/SafeSearch/SafeSearch';
import Labels from '../../../../UI/images/Labels/Labels';
import * as routes from '../../../../../shared/constants/routes';

export default function Image({
  image,
  loading,
  error,
  boundImageFetch,
  match
}) {
  useEffect(() => {
    if (!loading) {
      boundImageFetch(match.params.imageId);
    }
  }, []);

  if (error) {
    return <>Error! {error}</>;
  }

  if (loading || Object.keys(image).length === 0) {
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
        <Button
          content="All Images"
          icon="left arrow"
          labelPosition="left"
          as={Link}
          to={`${routes.PROPERTIES}/${match.params.propertyId}${routes.IMAGES}`}
        />
        <Grid stackable padded columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <SemanticImage src={image.url} />
              </Segment>
              <Segment>
                <Button basic as="a" href={image.url} download>
                  Download
                </Button>
              </Segment>
              <Segment>
                <ConfigurableMetadata image={image} />
              </Segment>
              <Segment>
                <ReadOnlyMetadata image={image} />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <SafeSearch safeSearch={image.safeSearch} />
              </Segment>
              <Segment>
                <Labels labels={image.labels} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
}

Image.propTypes = {
  image: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  boundImageFetch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};
