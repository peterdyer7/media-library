import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'semantic-ui-react';

export default function AddSettingModal({
  toggleModal,
  modalOpen,
  settingLabel,
  setting,
  type,
  addSetting
}) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addSetting(type, setting, value);
    toggleModal();
  };

  return (
    <Modal
      trigger={
        <Button
          id="addButton"
          floated="right"
          primary
          size="tiny"
          onClick={toggleModal}
        >
          Add Setting
        </Button>
      }
      open={modalOpen}
      onClose={toggleModal}
      size="mini"
    >
      <Modal.Header>{settingLabel} - Add Setting</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit} size="large">
          <Form.Field inline>
            <label>Setting:</label>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </Form.Field>
          <Button primary content="Add" type="submit" />
          <Button secondary content="Cancel" onClick={toggleModal} />
        </Form>
      </Modal.Content>
    </Modal>
  );
}

AddSettingModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  settingLabel: PropTypes.string.isRequired,
  setting: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  addSetting: PropTypes.func.isRequired
};
