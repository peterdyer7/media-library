import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Icon, Header, Dimmer, Loader } from 'semantic-ui-react';

import ImagesList from './ImagesList/ImagesList';
import UploadImage from './UploadImage/UploadImage';

export default function AdminPropertyImages({
  propertyId,
  images,
  loadingImages,
  errorImages,
  settings,
  loadingSettings,
  errorSettings,
  boundImageUpload,
  boundImagesPropertyFetch,
  boundSettingsFetch
}) {
  useEffect(() => {
    if (Object.keys(settings).length === 0 && !loadingSettings) {
      boundSettingsFetch('imageMetadata');
    }
    // TODO: might be worth evaluating whether this data has already been loaded - save a trip to the back-end
    boundImagesPropertyFetch(propertyId);
  }, []);

  if (errorImages) {
    return <>Error! {errorImages}</>;
  }
  if (errorSettings) {
    return <>Error! {errorSettings}</>;
  }

  if (loadingImages || loadingSettings) {
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
              <UploadImage
                propertyId={propertyId}
                imageUpload={boundImageUpload}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <br />
    </>
  );
}

AdminPropertyImages.propTypes = {
  propertyId: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  loadingImages: PropTypes.bool.isRequired,
  errorImages: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  loadingSettings: PropTypes.bool.isRequired,
  errorSettings: PropTypes.string.isRequired,
  boundImageUpload: PropTypes.func.isRequired,
  boundImagesPropertyFetch: PropTypes.func.isRequired,
  boundSettingsFetch: PropTypes.func.isRequired
};
