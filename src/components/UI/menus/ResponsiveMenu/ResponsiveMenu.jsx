import React from 'react';
import PropTypes from 'prop-types';

import DesktopMenu from '../DesktopMenu/DesktopMenu';
import MobileMenu from '../MobileMenu/MobileMenu';

export default function ResponsiveMenu({
  children,
  userIsAdmin = false,
  user,
  boundLogout
}) {
  return (
    <>
      <DesktopMenu userIsAdmin={userIsAdmin} user={user} logout={boundLogout}>
        {children}
      </DesktopMenu>
      <MobileMenu userIsAdmin={userIsAdmin} user={user} logout={boundLogout}>
        {children}
      </MobileMenu>
    </>
  );
}

ResponsiveMenu.propTypes = {
  children: PropTypes.element.isRequired,
  userIsAdmin: PropTypes.bool,
  user: PropTypes.object.isRequired,
  boundLogout: PropTypes.func.isRequired
};
