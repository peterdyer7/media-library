import React from 'react';
import PropTypes from 'prop-types';
import { Header, Table } from 'semantic-ui-react';

export default function Labels({ labels }) {
  return (
    <>
      <Header content="Lables detected" size="medium" />
      <Table compact unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Label</Table.HeaderCell>
            <Table.HeaderCell>Confidence</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {labels.map((label, index) => (
            <Table.Row key={index}>
              <Table.Cell>{label.description}</Table.Cell>
              <Table.Cell>{(label.score * 100).toFixed(2)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

Labels.propTypes = {
  labels: PropTypes.array.isRequired
};
