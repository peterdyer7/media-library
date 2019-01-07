import { connect } from 'react-redux';

import Register from '../../../components/auth/Register/Register';
import { authenticate } from '../../../shared/redux/actions/auth';

const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.auth.error,
  loading: state.auth.loading
});

const mapDispatchToProps = (dispatch) => ({
  boundAuthenticate: (user) => dispatch(authenticate(user, false))
});

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterContainer;
