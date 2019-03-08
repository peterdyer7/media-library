import { connect } from 'react-redux';

import Property from '../../../../components/user/Properties/Property/Property';
import { propertyFetch } from '../../../../shared/redux/actions/properties';

const mapStateToProps = (state, ownProps) => ({
  property: state.properties.properties.filter(
    (property) => property.id === ownProps.match.params.propertyId
  )[0],
  loading: state.properties.loading,
  error: state.properties.error
});
const mapDispatchToProps = (dispatch) => ({
  boundPropertyFetch: (id) => dispatch(propertyFetch(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Property);
