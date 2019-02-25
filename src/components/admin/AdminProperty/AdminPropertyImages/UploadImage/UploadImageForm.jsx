import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Label, List } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import SimpleSettingSelectContainer from '../../../../../containers/UI/forms/SimpleSettingSelect/SimpleSettingSelectContainer';
import TagsSelectContainer from '../../../../../containers/UI/forms/TagsSelect/TagsSelectContainer';
import * as errors from '../../../../../shared/constants/errors';

export default function UploadImageForm({
  isUpload,
  image,
  imageFile,
  propertyId,
  imageUpload,
  imageUpdate,
  handleReset
}) {
  return (
    <Formik
      initialValues={{
        caption: image ? (image.caption ? image.caption : '') : '',
        primaryCategory: image
          ? image.primaryCategory
            ? { value: image.primaryCategory, label: image.primaryCategory }
            : null
          : null,
        secondaryCategory: image
          ? image.secondaryCategory
            ? {
                value: image.secondaryCategory,
                label: image.secondaryCategory
              }
            : null
          : null,
        tags: image
          ? image.tags
            ? image.tags.map((t) => ({ value: t, label: t }))
            : null
          : null
      }}
      validationSchema={Yup.object().shape({
        caption: Yup.string().required(errors.REQ),
        primaryCategory: Yup.mixed().required(errors.REQ)
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        if (isUpload) {
          imageUpload(propertyId, imageFile, {
            caption: values.caption,
            primaryCategory: values.primaryCategory.value,
            secondaryCategory: values.secondaryCategory
              ? values.secondaryCategory.value
              : null,
            tags: values.tags ? values.tags.map((t) => t.value) : null
          });
          handleReset();
        } else {
          imageUpdate({
            ...image,
            caption: values.caption,
            primaryCategory: values.primaryCategory.value,
            secondaryCategory: values.secondaryCategory
              ? values.secondaryCategory.value
              : null,
            tags: values.tags ? values.tags.map((t) => t.value) : null
          });
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        isValid,
        isSubmitting
      }) => (
        <>
          {isUpload && (
            <List>
              <List.Item>
                <List.Header>File</List.Header>
                {imageFile.name}
              </List.Item>
            </List>
          )}
          <Form size="small" onSubmit={handleSubmit}>
            <Form.Field error={errors.caption && touched.caption}>
              <label>Caption</label>
              <input
                type="text"
                name="caption"
                placeholder="Caption"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.caption}
              />
              {!!errors.caption && touched.caption && (
                <Label pointing>{errors.caption}</Label>
              )}
            </Form.Field>
            <SimpleSettingSelectContainer
              value={values.primaryCategory}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.primaryCategory}
              touched={touched.primaryCategory}
              setting="primaryCategory"
              settingLabel="Category"
            />
            <SimpleSettingSelectContainer
              value={values.secondaryCategory}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.secondaryCategory}
              touched={touched.secondaryCategory}
              setting="secondaryCategory"
              settingLabel="Alternate Category"
            />
            <TagsSelectContainer
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              value={values.tags}
              error={errors.tags}
              touched={touched.tags}
            />
            <Button
              type="submit"
              fluid
              size="large"
              primary
              disabled={!isValid || isSubmitting}
            >
              {isUpload ? <>Upload</> : <>Update</>}
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
}

UploadImageForm.propTypes = {
  isUpload: PropTypes.bool.isRequired,
  image: PropTypes.object,
  imageFile: PropTypes.object,
  propertyId: PropTypes.string.isRequired,
  imageUpload: PropTypes.func,
  imageUpdate: PropTypes.func,
  handleReset: PropTypes.func.isRequired
};
