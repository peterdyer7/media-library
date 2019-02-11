import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Message, Dimmer, Loader } from 'semantic-ui-react';

import CreatePropertyForm from './CreatePropertyForm';

export default function CreatePropertyModal({
  modalOpen,
  toggleModal,
  propertyCreate,
  loading,
  error,
  success
}) {
  return (
    <Modal
      trigger={
        <Button type="button" primary onClick={toggleModal}>
          Create Property
        </Button>
      }
      open={modalOpen}
      onClose={toggleModal}
      closeIcon
    >
      <Dimmer active={loading} inverted>
        <Loader inverted />
      </Dimmer>
      <Modal.Header>Create Property</Modal.Header>
      <Modal.Content>
        <CreatePropertyForm propertyCreate={propertyCreate} />
        {success && <Message success>{success}</Message>}
        {error && <Message error>{error}</Message>}
      </Modal.Content>
    </Modal>
  );
}

CreatePropertyModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  propertyCreate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  success: PropTypes.string.isRequired
};
