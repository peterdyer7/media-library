import { connect } from 'react-redux';

import TagsSelect from '../../../../components/UI/selects/TagsSelect/TagsSelect';
import { addSetting } from '../../../../shared/redux/actions/settings';

const mapStateToProps = (state) => ({
  tags: state.settings.settings.tags
});

const mapDispatchToProps = (dispatch) => ({
  boundSettingAdd: (type, list, item) => dispatch(addSetting(type, list, item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsSelect);
