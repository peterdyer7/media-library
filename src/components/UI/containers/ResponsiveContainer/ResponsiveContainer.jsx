import React from 'react';

import DesktopContainer from '../DesktopContainer/DesktopContainer';
import MobileContainer from '../MobileContainer/MobileContainer';

const ResponsiveContainer = ({ children }) => (
  <>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </>
);

export default ResponsiveContainer;
