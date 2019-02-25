import { connect } from 'react-redux';

import AdminPropertyImages from '../../../../../components/admin/AdminProperty/AdminPropertyImages/AdminPropertyImages';

import {
  imagesPropertyFetch,
  imageUpload
} from '../../../../../shared/redux/actions/images';
import { fetchSettings } from '../../../../../shared/redux/actions/settings';

const mapStateToProps = (state, ownProps) => ({
  images: state.images.images.filter((image) =>
    image.properties.includes(ownProps.propertyId)
  ),
  loadingImages: state.images.loading,
  errorImages: state.images.error,
  settings: state.settings.settings,
  loadingSettings: state.settings.loading,
  errorSettings: state.settings.error
});

const mapDispatchToProps = (dispatch) => ({
  boundImageUpload: (propertyId, image, metadata) =>
    dispatch(imageUpload(propertyId, image, metadata)),
  boundImagesPropertyFetch: (id) => dispatch(imagesPropertyFetch(id)),
  boundSettingsFetch: (type) => dispatch(fetchSettings(type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPropertyImages);
