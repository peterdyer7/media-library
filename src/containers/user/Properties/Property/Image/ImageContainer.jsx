import { connect } from 'react-redux';

import Image from '../../../../../components/user/Properties/Property/Image/Image';
import { imageFetch } from '../../../../../shared/redux/actions/images';

const mapStateToProps = (state) => ({
  image: state.images.selectedImage,
  loading: state.images.loading,
  error: state.images.error
});

const mapDispatchToProps = (dispatch) => ({
  boundImageFetch: (imageId) => dispatch(imageFetch(imageId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Image);
