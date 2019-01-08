import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import AppContainer from './containers/App/AppContainer';
import Root from './components/Root/Root';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Root>
    <AppContainer />
  </Root>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
