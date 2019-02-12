import { connect } from 'react-redux';

import AdminSettings from '../../../components/admin/AdminSettings/AdminSettings';
import {
  fetchSettings,
  addSetting,
  removeSetting
} from '../../../shared/redux/actions/settings';

const mapStateToProps = (state) => ({
  settings: state.settings.settings,
  loading: state.settings.loading,
  error: state.settings.error
});

const mapDispatchToProps = (dispatch) => ({
  boundSettingsFetch: (type) => dispatch(fetchSettings(type)),
  boundSettingAdd: (type, list, item) => dispatch(addSetting(type, list, item)),
  boundSettingRemove: (type, list, item) =>
    dispatch(removeSetting(type, list, item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminSettings);
