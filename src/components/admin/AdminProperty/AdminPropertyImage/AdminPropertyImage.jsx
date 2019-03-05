import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Header,
  Dimmer,
  Loader,
  Container,
  Image,
  Grid,
  Segment,
  Confirm
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import UploadImageForm from '../AdminPropertyImages/UploadImage/UploadImageForm';
import ReadOnlyMetadata from './ReadOnlyMetadata/ReadOnlyMetadata';
import * as routes from '../../../../shared/constants/routes';
import SafeSearch from './SafeSearch/SafeSearch';
import Labels from './Labels/Labels';

export default function AdminPropertyImage({
  history,
  match,
  image,
  loadingImages,
  errorImages,
  boundImageFetch,
  boundImageUpdate,
  boundImageDelete,
  settings,
  loadingSettings,
  errorSettings,
  boundSettingsFetch
}) {
  const [deleteImageConfirmOpen, setDeleteImageConfirmOpen] = useState(false);

  useEffect(() => {
    if (!loadingImages) {
      boundImageFetch(match.params.imageId);
    }

    if (Object.keys(settings).length === 0) {
      boundSettingsFetch('imageMetadata');
    }
  }, []);

  const handleConfirm = () => {
    boundImageDelete(image);
    setDeleteImageConfirmOpen(!deleteImageConfirmOpen);
    history.goBack();
  };

  if (errorImages) {
    return <>Error! {errorImages}</>;
  }
  if (errorSettings) {
    return <>Error! {errorSettings}</>;
  }

  if (Object.keys(image).length === 0 || loadingImages || loadingSettings) {
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
          to={`${routes.ADMIN}${routes.ADMINPROPERTIES}/${
            match.params.propertyId
          }${routes.ADMINPROPERTYIMAGES}`}
        />

        {image && (
          <>
            <Grid stackable padded columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Segment>
                    <Image src={image.url} />
                  </Segment>

                  <Segment>
                    <Header content="Configurable metadata" size="medium" />
                    <UploadImageForm
                      isUpload={false}
                      image={image}
                      imageUpdate={boundImageUpdate}
                    />
                  </Segment>
                  <Button
                    color="red"
                    id="deleteButton"
                    basic
                    compact
                    size="tiny"
                    onClick={() =>
                      setDeleteImageConfirmOpen(!deleteImageConfirmOpen)
                    }
                  >
                    Delete image?
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <ReadOnlyMetadata image={image} />
                  </Segment>
                  <Segment>
                    <SafeSearch safeSearch={image.safeSearch} />
                  </Segment>
                  <Segment>
                    <Labels labels={image.labels} />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </>
        )}
      </Container>
      <Confirm
        open={deleteImageConfirmOpen}
        content={`Are you sure you want to delete this image?`}
        onCancel={() => setDeleteImageConfirmOpen(!deleteImageConfirmOpen)}
        onConfirm={handleConfirm}
        size="mini"
      />
    </>
  );
}

AdminPropertyImage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired,
  image: PropTypes.object,
  loadingImages: PropTypes.bool,
  errorImages: PropTypes.string,
  boundImageFetch: PropTypes.func.isRequired,
  boundImageUpdate: PropTypes.func.isRequired,
  boundImageDelete: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  loadingSettings: PropTypes.bool,
  errorSettings: PropTypes.string,
  boundSettingsFetch: PropTypes.func.isRequired
};
