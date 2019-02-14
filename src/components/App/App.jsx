import React, { Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import AppRouting from './AppRouting/AppRouting';

export default function App({ user, boundAuthCheck }) {
  useEffect(() => {
    boundAuthCheck();
  }, []);

  return (
    <Suspense
      fallback={
        <Dimmer active>
          <Loader />
        </Dimmer>
      }
    >
      <BrowserRouter>
        <AppRouting user={user} />
      </BrowserRouter>
    </Suspense>
  );
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  boundAuthCheck: PropTypes.func.isRequired
};
