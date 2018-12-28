import React, { lazy, Suspense, useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from '../auth/Login/Login';
import ResponsiveContainer from '../UI/containers/ResponsiveContainer/ResponsiveContainer';
import * as routes from '../../shared/constants/routes';

const Register = lazy(() => import('../auth/Register/Register'));
const ForgotPassword = lazy(() =>
  import('../auth/ForgotPassword/ForgotPassword')
);
const Admin = lazy(() => import('../admin/Admin/Admin'));
const Properties = lazy(() => import('../user/Properties/Properties'));

function App() {
  const [userLoggedIn] = useState(true);
  const [userIsAdmin] = useState(false);

  let availableRoutes = (
    <Switch>
      <Route path={routes.REGISTER} component={Register} />
      <Route path={routes.FORGOTPASSWORD} component={ForgotPassword} />
      <Route component={Login} />
    </Switch>
  );
  if (userLoggedIn) {
    availableRoutes = (
      <ResponsiveContainer userIsAdmin={userIsAdmin}>
        <Switch>
          {userIsAdmin && <Route path={routes.ADMIN} component={Admin} />}
          <Route component={Properties} />
        </Switch>
      </ResponsiveContainer>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>{availableRoutes}</BrowserRouter>
    </Suspense>
  );
}

export default App;
