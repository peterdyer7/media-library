import React from 'react';
import PropTypes from 'prop-types';
import {
  Segment,
  Message,
  Container,
  Grid,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import RegisterForm from './RegisterForm';
import RegisterHeader from '../../UI/headers/RegisterHeader/RegisterHeader';
import { BACKGROUND_COLOR } from '../../../shared/constants/company';
import * as routes from '../../../shared/constants/routes';

export default function Register({ error, loading, boundAuthenticate, user }) {
  return (
    <div
      style={{
        height: '100vh',
        overflowX: 'hidden',
        backgroundColor: BACKGROUND_COLOR
      }}
    >
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
      <Grid centered verticalAlign="top">
        <Grid.Row verticalAlign="top" style={{ paddingBottom: '0em' }}>
          <Grid.Column>
            <RegisterHeader />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row verticalAlign="top">
          <Grid.Column>
            <Container>
              <Segment textAlign="left">
                <RegisterForm sendAuth={boundAuthenticate} />
                {error && <Message error>{error}</Message>}
                <Message warning>
                  <Message.List>
                    <Message.Item>
                      Already signed up?
                      {'  '}
                      <Link to={routes.LOGIN}>Login here</Link>
                    </Message.Item>
                    <Message.Item>
                      Forgot your password?
                      {'  '}
                      <Link to={routes.FORGOTPASSWORD}>Reset</Link>
                    </Message.Item>
                  </Message.List>
                </Message>
              </Segment>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <span data-testid="userId" style={{ visibility: 'hidden' }}>
        {user && user.userId}
      </span>
    </div>
  );
}

Register.propTypes = {
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  boundAuthenticate: PropTypes.func.isRequired
};
