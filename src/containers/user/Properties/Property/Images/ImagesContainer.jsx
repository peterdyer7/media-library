import { connect } from 'react-redux';

import Images from '../../../../../components/user/Properties/Property/Images/Images';
import { imagesPropertyFetch } from '../../../../../shared/redux/actions/images';
import { fetchSettings } from '../../../../../shared/redux/actions/settings';

const mapStateToProps = (state, ownProps) => ({
  images: state.images.images.filter(
    (image) => image.properties.includes(ownProps.propertyId) && image.active
  ),
  loading: state.images.loading,
  error: state.images.error,
  settings: state.settings.settings
});
const mapDispatchToProps = (dispatch) => ({
  boundImagesPropertyFetch: (id) => dispatch(imagesPropertyFetch(id)),
  boundSettingsFetch: (type) => dispatch(fetchSettings(type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Images);
