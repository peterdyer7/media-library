import React from 'react';
import PropTypes from 'prop-types';
import { Table, Grid, Icon } from 'semantic-ui-react';

import PropertyMap from '../PropertyMap/PropertyMap';

export default function Detail({ property }) {
  if (!property) {
    return <>No property selected.</>;
  }

  return (
    <Grid stackable columns={2}>
      <Grid.Column>
        <Table definition compact>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>Brand</Table.Cell>
              <Table.Cell>{property.brand}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Region</Table.Cell>
              <Table.Cell>{property.region}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Active</Table.Cell>
              <Table.Cell>
                {property.active ? (
                  <Icon name="dot circle outline" />
                ) : (
                  <Icon name="circle outline" />
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Address line 1</Table.Cell>
              <Table.Cell>{property.address1}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Address line 2</Table.Cell>
              <Table.Cell>{property.address2}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>City</Table.Cell>
              <Table.Cell>{property.city}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>State/Province</Table.Cell>
              <Table.Cell>{property.state}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Country</Table.Cell>
              <Table.Cell>{property.country}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Zip/Postal Code</Table.Cell>
              <Table.Cell>{property.postalCode}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Latitude</Table.Cell>
              <Table.Cell>{property.latitude}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Longitude</Table.Cell>
              <Table.Cell>{property.longitude}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Contact person</Table.Cell>
              <Table.Cell>{property.contactPerson}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>Contact phone number</Table.Cell>
              <Table.Cell>{property.contactPhone}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Grid.Column>
      <Grid.Column>
        {property.latitude && property.longitude && (
          <PropertyMap
            latitude={property.latitude}
            longitude={property.longitude}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

Detail.propTypes = {
  property: PropTypes.object.isRequired
};
