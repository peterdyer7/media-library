import { connect } from 'react-redux';

import SimpleSettingSelect from '../../../../components/UI/selects/SimpleSettingSelect/SimpleSettingSelect';

const mapStateToProps = (state, ownProps) => ({
  settingList: state.settings.settings[ownProps.setting]
});

const SimpleSettingSelectContainer = connect(mapStateToProps)(
  SimpleSettingSelect
);

export default SimpleSettingSelectContainer;
