import { connect } from 'react-redux';

import Property from '../../../../components/user/Properties/Property/Property';
import { propertyFetch } from '../../../../shared/redux/actions/properties';
import { imagesPropertyFetch } from '../../../../shared/redux/actions/images';
import { fetchSettings } from '../../../../shared/redux/actions/settings';

const mapStateToProps = (state, ownProps) => ({
  property: state.properties.properties.filter(
    (property) => property.id === ownProps.match.params.propertyId
  )[0],
  propertyLoading: state.properties.loading,
  propertyError: state.properties.error,
  images: state.images.images.filter(
    (image) =>
      image.properties.includes(ownProps.match.params.propertyId) &&
      image.active
  ),
  imagesLoading: state.images.loading,
  iamgesError: state.images.error,
  settings: state.settings.settings
});
const mapDispatchToProps = (dispatch) => ({
  boundPropertyFetch: (id) => dispatch(propertyFetch(id)),
  boundImagesPropertyFetch: (id) => dispatch(imagesPropertyFetch(id)),
  boundSettingsFetch: (type) => dispatch(fetchSettings(type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Property);
