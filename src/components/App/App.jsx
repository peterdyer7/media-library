import React, { lazy, Suspense, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import LoginContainer from '../../containers/auth/Login/LoginContainer';
import ResponsiveMenuContainer from '../../containers/UI/menus/ResponsiveMenu/ResponsiveMenuContainer';
import * as routes from '../../shared/constants/routes';

const RegisterContainer = lazy(() =>
  import('../../containers/auth/Register/RegisterContainer')
);
const ForgotPassword = lazy(() =>
  import('../auth/ForgotPassword/ForgotPassword')
);
const Admin = lazy(() => import('../admin/Admin/Admin'));
const AccountContainer = lazy(() =>
  import('../../containers/user/Account/AccountContainer')
);
const Properties = lazy(() => import('../user/Properties/Properties'));

export default function App({ user, boundAuthCheck }) {
  const [userIsAdmin] = useState(true);

  useEffect(() => {
    boundAuthCheck();
  }, []);

  let availableRoutes = (
    <Switch>
      <Route path={routes.REGISTER} component={RegisterContainer} />
      <Route path={routes.FORGOTPASSWORD} component={ForgotPassword} />
      <Route component={LoginContainer} />
    </Switch>
  );
  if (user.uid) {
    availableRoutes = (
      <ResponsiveMenuContainer userIsAdmin={userIsAdmin}>
        <Switch>
          {userIsAdmin && <Route path={routes.ADMIN} component={Admin} />}
          <Route path={routes.ACCOUNT} component={AccountContainer} />
          <Route path={routes.PROPERTIES} component={Properties} />
          <Redirect to={routes.PROPERTIES} />
        </Switch>
      </ResponsiveMenuContainer>
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>{availableRoutes}</BrowserRouter>
    </Suspense>
  );
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  boundAuthCheck: PropTypes.func.isRequired
};
