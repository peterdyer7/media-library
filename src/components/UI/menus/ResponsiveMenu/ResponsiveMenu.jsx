import React from 'react';
import PropTypes from 'prop-types';

import DesktopMenu from '../DesktopMenu/DesktopMenu';
import MobileMenu from '../MobileMenu/MobileMenu';

export default function ResponsiveMenu({ children, user, boundLogout }) {
  return (
    <>
      <DesktopMenu user={user} logout={boundLogout}>
        {children}
      </DesktopMenu>
      <MobileMenu user={user} logout={boundLogout}>
        {children}
      </MobileMenu>
    </>
  );
}

ResponsiveMenu.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object.isRequired,
  boundLogout: PropTypes.func.isRequired
};
