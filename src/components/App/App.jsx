import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from '../auth/Login/Login';
import * as routes from '../../shared/constants/routes';

const Register = lazy(() => import('../auth/Register/Register'));
const ForgotPassword = lazy(() =>
  import('../auth/ForgotPassword/ForgotPassword')
);
const Admin = lazy(() => import('../admin/Admin/Admin'));
const Properties = lazy(() => import('../user/Properties/Properties'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Switch>
          <Route path={routes.REGISTER} component={Register} />
          <Route path={routes.FORGOTPASSWORD} component={ForgotPassword} />
          <Route path={routes.PROPERTIES} component={Properties} />
          <Route path={routes.ADMIN} component={Admin} />
          <Route component={Login} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
