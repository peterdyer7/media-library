import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Header, Message } from 'semantic-ui-react';
import UploadImageForm from './UploadImageForm';

export default function UploadImage({ propertyId, imageUpload }) {
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onDrop = (accepted, rejected) => {
    setAccepted(accepted);
    setRejected(rejected);
  };

  const handleReset = () => {
    setAccepted([]);
    setRejected([]);
  };

  return (
    <>
      <div className="dropzone">
        <Dropzone
          accept="image/jpeg, image/png"
          disabled={false}
          multiple={false}
          onDrop={onDrop}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              style={{
                width: 200,
                height: 200,
                borderWidth: 2,
                borderColor: '#666',
                borderStyle: 'dashed',
                borderRadius: 5
              }}
            >
              <input {...getInputProps()} />
              <Header
                size="medium"
                textAlign="center"
                style={{ paddingTop: '1em' }}
              >
                Drop image here, or click to select file to upload.
              </Header>
              <Header size="small" textAlign="center">
                Only *.jpeg and *.png images will be accepted
              </Header>
            </div>
          )}
        </Dropzone>
      </div>

      {rejected[0] && (
        <Message error>{rejected[0].name} is not a supported file type</Message>
      )}

      {accepted[0] && (
        <UploadImageForm
          isUpload={true}
          imageFile={accepted[0]}
          propertyId={propertyId}
          imageUpload={imageUpload}
          handleReset={handleReset}
        />
      )}
    </>
  );
}

UploadImage.propTypes = {
  propertyId: PropTypes.string.isRequired,
  imageUpload: PropTypes.func.isRequired
};
