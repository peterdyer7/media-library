import { connect } from 'react-redux';

import AdminProperties from '../../../components/admin/AdminProperites/AdminProperties';
import {
  propertiesFetch,
  propertyCreate,
  propertyClearMsgs,
  propertyDelete
} from '../../../shared/redux/actions/properties';

const mapStateToProps = (state) => ({
  properties: state.properties.properties,
  loading: state.properties.loading,
  error: state.properties.error,
  success: state.properties.success
});

const mapDispatchToProps = (dispatch) => ({
  boundPropertiesFetch: () => dispatch(propertiesFetch()),
  boundPropertyCreate: (property) => dispatch(propertyCreate(property)),
  boundPropertyClearMsgs: () => dispatch(propertyClearMsgs()),
  boundPropertyDelete: (id) => dispatch(propertyDelete(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProperties);
