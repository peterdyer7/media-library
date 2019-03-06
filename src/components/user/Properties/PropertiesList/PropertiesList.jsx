import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import _ from 'lodash';

import * as routes from '../../../../shared/constants/routes';

export default function PropertyList({ properties, history }) {
  const [column, setColumn] = useState(null);
  const [data, setData] = useState(properties);
  const [direction, setDirection] = useState(null);

  function handleSort(clickedColumn) {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      setData(_.sortBy(data, [clickedColumn]));
      setDirection('ascending');
    } else {
      setData(data.reverse());
      setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    }
  }

  return (
    <>
      <br />
      <Table sortable celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={() => handleSort('name')}
            >
              Property
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'country' ? direction : null}
              onClick={() => handleSort('country')}
            >
              Country
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'region' ? direction : null}
              onClick={() => handleSort('region')}
            >
              Region
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'brand' ? direction : null}
              onClick={() => handleSort('brand')}
            >
              Brand
            </Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({ id, name, country, region, brand }) => (
            <Table.Row key={id}>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{country}</Table.Cell>
              <Table.Cell>{region}</Table.Cell>
              <Table.Cell>{brand}</Table.Cell>
              <Table.Cell>
                <Button
                  basic
                  compact
                  onClick={() => history.push(`${routes.PROPERTIES}/${id}`)}
                >
                  View
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <br />
    </>
  );
}

PropertyList.propTypes = {
  properties: PropTypes.array.isRequired,
  history: PropTypes.object
};
