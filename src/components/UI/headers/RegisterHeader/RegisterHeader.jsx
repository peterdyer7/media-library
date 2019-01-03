import React from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';

import { COMPANY_LABEL } from '../../../../shared/constants/company';
import logo from '../../../../assets/logo.png';

export default function RegisterHeader() {
  return (
    <Segment inverted textAlign="center" style={{ margin: '0px' }}>
      <Image alt="Boutique Hotels Logo" src={logo} size="tiny" centered />
      <Header as="h3" inverted>
        {COMPANY_LABEL}
      </Header>
    </Segment>
  );
}
