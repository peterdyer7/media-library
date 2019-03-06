import { connect } from 'react-redux';

import Properties from '../../../components/user/Properties/Properties';
import { propertiesFetch } from '../../../shared/redux/actions/properties';

const mapStateToProps = (state) => ({
  properties: state.properties.properties,
  loading: state.properties.loading,
  error: state.properties.error,
  success: state.properties.success
});

const mapDispatchToProps = (dispatch) => ({
  boundPropertiesFetch: () => dispatch(propertiesFetch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Properties);
