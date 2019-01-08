import { connect } from 'react-redux';

import Account from '../../../components/user/Account/Account';
import { resetPassword } from '../../../shared/redux/actions/auth';

const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.auth.error,
  loading: state.auth.loading
});

const mapDispatchToProps = (dispatch) => ({
  boundResetPassword: (newPassword) => dispatch(resetPassword(newPassword))
});

const AccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);

export default AccountContainer;
