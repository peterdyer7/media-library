import React from 'react';
import PropTypes from 'prop-types';
import { Header, Table } from 'semantic-ui-react';

export default function SafeSearch({ safeSearch }) {
  return (
    <>
      <Header content="Explicit content analysis" size="medium" />
      <Table compact unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Result</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row key="adult">
            <Table.Cell>Adult</Table.Cell>
            <Table.Cell>{safeSearch.adult}</Table.Cell>
          </Table.Row>
          <Table.Row key="medical">
            <Table.Cell>Medical</Table.Cell>
            <Table.Cell>{safeSearch.medical}</Table.Cell>
          </Table.Row>
          <Table.Row key="racy">
            <Table.Cell>Racy</Table.Cell>
            <Table.Cell>{safeSearch.racy}</Table.Cell>
          </Table.Row>
          <Table.Row key="spoof">
            <Table.Cell>Spoof</Table.Cell>
            <Table.Cell>{safeSearch.spoof}</Table.Cell>
          </Table.Row>
          <Table.Row key="violence">
            <Table.Cell>Violence</Table.Cell>
            <Table.Cell>{safeSearch.violence}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}

SafeSearch.propTypes = {
  safeSearch: PropTypes.object.isRequired
};
