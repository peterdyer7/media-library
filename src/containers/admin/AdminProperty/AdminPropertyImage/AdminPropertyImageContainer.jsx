import { connect } from 'react-redux';

import AdminPropertyImage from '../../../../components/admin/AdminProperty/AdminPropertyImage/AdminPropertyImage';
import {
  imageFetch,
  imageUpdate,
  imageDelete
} from '../../../../shared/redux/actions/images';
import { fetchSettings } from '../../../../shared/redux/actions/settings';

const mapStateToProps = (state, ownProps) => ({
  image: state.images.selectedImage,
  loadingImages: state.images.loading,
  errorImages: state.images.error,
  settings: state.settings.settings,
  loadingSettings: state.settings.loading,
  errorSettings: state.settings.error
});

const mapDispatchToProps = (dispatch) => ({
  boundImageFetch: (imageId) => dispatch(imageFetch(imageId)),
  boundImageUpdate: (image) => dispatch(imageUpdate(image)),
  boundSettingsFetch: (type) => dispatch(fetchSettings(type)),
  boundImageDelete: (image) => dispatch(imageDelete(image))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPropertyImage);
