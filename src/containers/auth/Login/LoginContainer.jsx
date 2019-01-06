import { connect } from 'react-redux';

import Login from '../../../components/auth/Login/Login';
import { authenticate } from '../../../shared/redux/actions/auth';

const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.auth.error,
  loading: state.auth.loading
});

const mapDispatchToProps = (dispatch) => ({
  boundAuthenticate: (user) => dispatch(authenticate(user, true))
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
