import { connect } from 'react-redux';

import App from '../../components/App/App';
import { authCheck } from '../../shared/redux/actions/auth';

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  boundAuthCheck: () => dispatch(authCheck())
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
