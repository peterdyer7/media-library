import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Confirm } from 'semantic-ui-react';

import * as routes from '../../../../shared/constants/routes';

export default function AdminPropertiesList({
  properties,
  history,
  propertyDelete
}) {
  const [selectedProperty, setSelectedProperty] = useState({
    id: '',
    name: ''
  });
  const [deletePropertyConfirmOpen, setDeletePropertyConfirmOpen] = useState(
    false
  );

  return (
    <>
      <Confirm
        open={deletePropertyConfirmOpen}
        content={`Are you sure you want to delete ${selectedProperty.name}?`}
        onCancel={() => setDeletePropertyConfirmOpen(false)}
        onConfirm={() => {
          propertyDelete(selectedProperty.id);
          setDeletePropertyConfirmOpen(false);
        }}
        size="mini"
      />
      <Table compact celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Property</Table.HeaderCell>
            <Table.HeaderCell>Active</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {properties.map((property) => (
            <Table.Row key={property.id}>
              <Table.Cell>{property.name}</Table.Cell>
              <Table.Cell>
                {property.active ? (
                  <Icon name="dot circle outline" />
                ) : (
                  <Icon name="circle outline" />
                )}
              </Table.Cell>
              <Table.Cell>
                <Button
                  basic
                  compact
                  onClick={() =>
                    history.push(
                      `${routes.ADMIN}${routes.ADMINPROPERTIES}/${property.id}`
                    )
                  }
                >
                  Manage
                </Button>
                <Button
                  basic
                  compact
                  onClick={() => {
                    setSelectedProperty({
                      id: property.id,
                      name: property.name
                    });
                    setDeletePropertyConfirmOpen(true);
                  }}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

AdminPropertiesList.propTypes = {
  properties: PropTypes.array.isRequired,
  propertyDelete: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
