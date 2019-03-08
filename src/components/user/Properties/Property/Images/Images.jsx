import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Image,
  Button,
  Segment,
  Header,
  Table,
  Grid,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import MultiSettingSelect from '../../../../UI/selects/MultiSettingSelect/MultiSettingSelect';
import * as routes from '../../../../../shared/constants/routes';

export default function Images({
  images,
  loading,
  error,
  propertyId,
  settings,
  boundImagesPropertyFetch,
  boundSettingsFetch
}) {
  const [filteredImages, setFilteredImages] = useState(images);
  const [primaryCategoryFilters, setPrimaryCategoryFilters] = useState([]);
  const [secondaryCategoryFilters, setSecondaryCategoryFilters] = useState([]);
  const [tagFilters, setTagFilters] = useState([]);

  useEffect(() => {
    // TODO: consider looking through the state to see what images exist
    boundImagesPropertyFetch(propertyId);

    if (Object.keys(settings).length === 0) {
      boundSettingsFetch('imageMetadata');
    }
  }, []);

  useEffect(() => {
    let tempImages = images;

    let temp = primaryCategoryFilters.map((v) => v.value);
    if (temp.length > 0) {
      tempImages = tempImages.filter((image) =>
        temp.includes(image.primaryCategory)
      );
    }

    temp = secondaryCategoryFilters.map((v) => v.value);
    if (temp.length > 0) {
      tempImages = tempImages.filter((image) =>
        temp.includes(image.secondaryCategory)
      );
    }

    temp = tagFilters.map((v) => v.value);
    if (temp.length > 0) {
      tempImages = tempImages.filter(
        (image) => image.tags && image.tags.some((r) => temp.includes(r))
      );
    }

    setFilteredImages(tempImages);
  }, [primaryCategoryFilters, secondaryCategoryFilters, tagFilters, images]);

  if (error) {
    return <>Error! {error}</>;
  }

  if (loading || Object.keys(settings).length === 0) {
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
      <Segment>
        <Header size="medium">Filters</Header>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <MultiSettingSelect
                values={settings.primaryCategory}
                label="Category"
                id="primaryCategory"
                handleChange={(values) => setPrimaryCategoryFilters(values)}
              />
            </Grid.Column>
            <Grid.Column>
              <MultiSettingSelect
                values={settings.secondaryCategory}
                label="Alt Category"
                id="secondaryCategory"
                handleChange={(values) => setSecondaryCategoryFilters(values)}
              />
            </Grid.Column>
            <Grid.Column>
              <MultiSettingSelect
                values={settings.tags}
                label="Tags"
                id="tags"
                handleChange={(values) => setTagFilters(values)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Card.Group centered>
        {filteredImages.map((image) => (
          <Card key={image.name}>
            <Image
              src={
                image.repros
                  ? image.repros.small
                    ? image.repros.small
                    : image.url
                  : image.url
              }
              style={{ maxHeight: 220, objectFit: 'cover' }}
            />
            <Card.Content>
              <Card.Header>{image.caption}</Card.Header>
              <Card.Description>
                <Table celled compact definition>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell collapsing>Category</Table.Cell>
                      <Table.Cell>{image.primaryCategory}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>Alt Category</Table.Cell>
                      <Table.Cell>{image.secondaryCategory}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>Tags</Table.Cell>
                      <Table.Cell>
                        {image.tags && image.tags.join(', ')}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button
                basic
                as={Link}
                to={`${routes.PROPERTIES}/${propertyId}${routes.IMAGES}/${
                  image.id
                }`}
              >
                Details
              </Button>
              <Button basic as="a" href={image.url} download>
                Download
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </>
  );
}

Images.propTypes = {
  images: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  propertyId: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  boundImagesPropertyFetch: PropTypes.func.isRequired,
  boundSettingsFetch: PropTypes.func.isRequired
};
