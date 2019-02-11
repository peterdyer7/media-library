import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

import AdminPropertiesList from './AdminPropertiesList/AdminPropertiesList';
import CreatePropertyModal from './CreateProperty/CreatePropertyModal';

export default function AdminProperties({
  properties,
  error,
  success,
  loading,
  boundPropertiesFetch,
  boundPropertyCreate,
  boundPropertyDelete,
  boundPropertyClearMsgs,
  history
}) {
  const [createPropertyModalOpen, setCreatePropertyModalOpen] = useState(false);

  useEffect(() => {
    boundPropertiesFetch();
  }, []);

  if (error) {
    return <>Error! {error}</>;
  }

  if (loading) {
    return (
      <>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
      </>
    );
  }

  return (
    <Container>
      <AdminPropertiesList
        properties={properties}
        propertyDelete={boundPropertyDelete}
        history={history}
      />
      <CreatePropertyModal
        modalOpen={createPropertyModalOpen}
        toggleModal={() => {
          setCreatePropertyModalOpen(!createPropertyModalOpen);
          boundPropertyClearMsgs();
        }}
        propertyCreate={boundPropertyCreate}
        loading={loading}
        error={error}
        success={success}
      />
      <br />
      <br />
    </Container>
  );
}

AdminProperties.propTypes = {
  properties: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  success: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  boundPropertiesFetch: PropTypes.func.isRequired,
  boundPropertyCreate: PropTypes.func.isRequired,
  boundPropertyDelete: PropTypes.func.isRequired,
  boundPropertyClearMsgs: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
