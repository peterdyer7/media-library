import { connect } from 'react-redux';

import ResponsiveMenu from '../../../../components/UI/menus/ResponsiveMenu/ResponsiveMenu';
import { logout } from '../../../../shared/redux/actions/auth';

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  boundLogout: () => dispatch(logout())
});

const ResponsiveMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponsiveMenu);

export default ResponsiveMenuContainer;
