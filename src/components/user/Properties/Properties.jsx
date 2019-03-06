import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Message, Dimmer, Loader } from 'semantic-ui-react';

import PropertiesList from './PropertiesList/PropertiesList';

export default function Properties({
  properties,
  loading,
  error,
  boundPropertiesFetch,
  history
}) {
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
    <>
      <Container>
        <br />
        <Message>
          <Message.Header>Select a Property</Message.Header>Click the View
          button to see and download media for the specified property.
        </Message>
        <PropertiesList properties={properties} history={history} />
      </Container>
    </>
  );
}

Properties.propTypes = {
  properties: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  boundPropertiesFetch: PropTypes.func.isRequired,
  history: PropTypes.object
};
