import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Register from '../auth/Register/Register';
import ForgotPassword from '../auth/ForgotPassword/ForgotPassword';
import Login from '../auth/Login/Login';
import Properties from '../user/Properties/Properties';
import Admin from '../admin/Admin/Admin';
import * as routes from '../../shared/constants/routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.REGISTER} component={Register} />
        <Route path={routes.FORGOTPASSWORD} component={ForgotPassword} />
        <Route path={routes.PROPERTIES} component={Properties} />
        <Route path={routes.ADMIN} component={Admin} />
        <Route component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
