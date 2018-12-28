import React from 'react';

import DesktopContainer from '../DesktopContainer/DesktopContainer';
import MobileContainer from '../MobileContainer/MobileContainer';

const ResponsiveContainer = ({ children, userIsAdmin = false }) => (
  <>
    <DesktopContainer userIsAdmin={userIsAdmin}>{children}</DesktopContainer>
    <MobileContainer userIsAdmin={userIsAdmin}>{children}</MobileContainer>
  </>
);

export default ResponsiveContainer;
