import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';

export default function AdminPropertyDetails({ property }) {
  return (
    <>
      <Table definition compact>
        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>Name</Table.Cell>
            <Table.Cell>{property.name}</Table.Cell>
          </Table.Row>
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
    </>
  );
}

AdminPropertyDetails.propTypes = {
  property: PropTypes.object
};
