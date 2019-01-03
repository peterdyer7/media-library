import React, { useEffect } from 'react';
import { Segment, Message, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';
import LoginHeader from '../../UI/headers/LoginHeader/LoginHeader';
import {
  BACKGROUND_COLOR,
  COMPANY_NAME
} from '../../../shared/constants/company';
import * as routes from '../../../shared/constants/routes';
import image from '../../../assets/home.jpg';

export default function Login() {
  useEffect(() => {
    import('../../user/Properties/Properties');
  }, []);
  return (
    <div
      style={{
        height: '100vh',
        overflowX: 'hidden',
        backgroundColor: BACKGROUND_COLOR
      }}
    >
      <Grid style={{ height: '100%' }} stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column
            style={{ maxWidth: 450 }}
            floated="right"
            width={5}
            textAlign="center"
            verticalAlign="middle"
          >
            <Grid.Row>
              <LoginHeader />
            </Grid.Row>
            <Grid.Row>
              <Segment textAlign="left">
                <LoginForm />
                <Message warning>
                  <Message.List>
                    <Message.Item>
                      New to us?
                      {'  '}
                      <Link to={routes.REGISTER}>Register here</Link>
                    </Message.Item>
                    <Message.Item>
                      Forgot your password?
                      {'  '}
                      <Link to={routes.FORGOTPASSWORD}>Reset</Link>
                    </Message.Item>
                  </Message.List>
                </Message>
              </Segment>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column floated="left" width={8} only="tablet computer">
            <Image
              alt={COMPANY_NAME}
              bordered
              rounded
              size="huge"
              src={image}
              centered
              style={{ minWidth: '600px' }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
