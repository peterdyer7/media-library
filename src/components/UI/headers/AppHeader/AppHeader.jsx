import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';
import { COMPANY_LABEL } from '../../../../shared/constants/company';
import logo from '../../../../assets/logo.png';

export default function AppHeader({ mobile }) {
  return (
    <Container text>
      <Header
        as="h1"
        inverted
        style={{
          fontSize: mobile ? '1em' : '2em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '0em' : '0em'
        }}
      >
        <Image src={logo} size="huge" /> {COMPANY_LABEL}
      </Header>
    </Container>
  );
}
