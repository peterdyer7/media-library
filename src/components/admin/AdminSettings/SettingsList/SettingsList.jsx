import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Header, Confirm } from 'semantic-ui-react';

import AddSettingModal from '../AddSettingModal/AddSettingModal';

export default function SettingsList({
  settingLabel = '',
  setting,
  type,
  settings = [],
  allowAdd = false,
  allowDelete = false,
  addSetting,
  removeSetting
}) {
  const [addSettingModalOpen, setAddSettingModalOpen] = useState(false);
  const [deleteSettingConfirmOpen, setDeleteSettingConfirmOpen] = useState(
    false
  );
  const [settingToDelete, setSettingToDelete] = useState('');

  return (
    <>
      <Header size="small">{settingLabel}</Header>
      <Table compact unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Setting</Table.HeaderCell>
            {allowDelete && <Table.HeaderCell>Actions</Table.HeaderCell>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {settings.map((setting) => (
            <Table.Row key={setting}>
              <Table.Cell>{setting}</Table.Cell>
              {allowDelete && (
                <Table.Cell>
                  <Button
                    id="deleteButton"
                    basic
                    compact
                    size="tiny"
                    onClick={() => {
                      setSettingToDelete(setting);
                      setDeleteSettingConfirmOpen(!deleteSettingConfirmOpen);
                    }}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="2">
              {allowAdd && (
                <AddSettingModal
                  toggleModal={() =>
                    setAddSettingModalOpen(!addSettingModalOpen)
                  }
                  modalOpen={addSettingModalOpen}
                  settingLabel={settingLabel}
                  setting={setting}
                  type={type}
                  addSetting={addSetting}
                />
              )}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <Confirm
        open={deleteSettingConfirmOpen}
        content={`Are you sure you want to delete ${settingToDelete}?`}
        onCancel={() => setDeleteSettingConfirmOpen(false)}
        onConfirm={() => {
          removeSetting(type, setting, settingToDelete);
          setDeleteSettingConfirmOpen(false);
        }}
        size="mini"
      />
    </>
  );
}

SettingsList.propTypes = {
  settingLabel: PropTypes.string.isRequired,
  setting: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  settings: PropTypes.array,
  allowAdd: PropTypes.bool.isRequired,
  allowDelete: PropTypes.bool.isRequired,
  addSetting: PropTypes.func.isRequired,
  removeSetting: PropTypes.func.isRequired
};
