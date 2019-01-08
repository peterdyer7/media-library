import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Dimmer, Loader, Message } from 'semantic-ui-react';

import ResetPasswordForm from '../../auth/ResetPassword/ResetPasswordForm';

export default function Account({ user, loading, error, boundResetPassword }) {
  const [showReset, setShowReset] = useState(false);

  return (
    <Container text>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
      <h2>User Settings</h2>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
      <Button
        data-testid="show"
        disabled={showReset}
        type="button"
        onClick={() => setShowReset(true)}
      >
        Reset Password
      </Button>
      {showReset && (
        <>
          <br />
          <br />
          <ResetPasswordForm
            show={setShowReset}
            sendResetPassword={boundResetPassword}
          />
        </>
      )}
      {error && <Message error>{error}</Message>}
    </Container>
  );
}

Account.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  boundResetPassword: PropTypes.func.isRequired
};
