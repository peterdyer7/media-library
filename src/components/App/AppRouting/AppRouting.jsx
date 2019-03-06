import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginContainer from '../../../containers/auth/Login/LoginContainer';
import ResponsiveMenuContainer from '../../../containers/UI/menus/ResponsiveMenu/ResponsiveMenuContainer';
import * as routes from '../../../shared/constants/routes';

const RegisterContainer = lazy(() =>
  import('../../../containers/auth/Register/RegisterContainer')
);
const ForgotPassword = lazy(() =>
  import('../../auth/ForgotPassword/ForgotPassword')
);
const Admin = lazy(() => import('../../admin/Admin/Admin'));
const AccountContainer = lazy(() =>
  import('../../../containers/user/Account/AccountContainer')
);
//const Properties = lazy(() => import('../../user/Properties/Properties'));
const PropertiesContainer = lazy(() =>
  import('../../../containers/user/Properties/ProperitesContainer')
);
const Property = lazy(() => import('../../user/Properties/Property/Property'));

export default function AppRouting({ user }) {
  return (
    <>
      {!!user.uid ? (
        <ResponsiveMenuContainer>
          <Switch>
            {user.role === 'admin' && (
              <Route path={routes.ADMIN} component={Admin} />
            )}
            <Route path={routes.ACCOUNT} component={AccountContainer} />
            <Route
              path={routes.PROPERTIES}
              exact
              component={PropertiesContainer}
            />
            <Route path={routes.PROPERTY} component={Property} />
            <Redirect to={routes.PROPERTIES} />
          </Switch>
        </ResponsiveMenuContainer>
      ) : (
        <Switch>
          <Route path={routes.REGISTER} component={RegisterContainer} />
          <Route path={routes.FORGOTPASSWORD} component={ForgotPassword} />
          <Route component={LoginContainer} />
        </Switch>
      )}
    </>
  );
}

AppRouting.propTypes = {
  user: PropTypes.object.isRequired
};
