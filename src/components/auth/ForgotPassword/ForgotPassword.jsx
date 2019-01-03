import React from 'react';
import {
  Segment,
  Message,
  Container,
  Header,
  Grid,
  GridColumn
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import ForgotPassordForm from './ForgotPasswordForm';
import RegisterHeader from '../../UI/headers/RegisterHeader/RegisterHeader';
import { BACKGROUND_COLOR } from '../../../shared/constants/company';
import * as routes from '../../../shared/constants/routes';

export default function ForgotPassword() {
  return (
    <div
      style={{
        height: '100vh',
        overflowX: 'hidden',
        backgroundColor: BACKGROUND_COLOR
      }}
    >
      <Grid centered verticalAlign="top">
        <Grid.Row verticalAlign="top" style={{ paddingBottom: '0em' }}>
          <GridColumn>
            <RegisterHeader />
          </GridColumn>
        </Grid.Row>
        <Grid.Row verticalAlign="top">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Container>
              <Segment textAlign="left">
                <Header size="medium">Forgot Password</Header>
                <p>
                  Enter your email address and we will send you a link to reset
                  your password.
                </p>
                <ForgotPassordForm />
                <Message warning>
                  <Link to={routes.LOGIN}>Return to Login</Link>
                </Message>
              </Segment>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
