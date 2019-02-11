import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Label, Checkbox } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import * as errorMsgs from '../../../../shared/constants/errors';

export default function CreatePropertyForm({ propertyCreate }) {
  return (
    <Formik
      initialValues={{
        name: '',
        brand: '',
        region: '',
        active: false,
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        latitude: '',
        longitude: '',
        contactPerson: '',
        contactPhone: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(errorMsgs.REQ),
        country: Yup.string().required(errorMsgs.REQ)
      })}
      onSubmit={(values, { props, setSubmitting, resetForm }) => {
        setSubmitting(true);
        propertyCreate({
          name: values.name,
          brand: values.brand,
          region: values.region,
          active: values.active,
          address1: values.address1,
          address2: values.address2,
          city: values.city,
          state: values.state,
          country: values.country,
          postalCode: values.postalCode,
          latitude: values.latitude,
          longitude: values.longitude,
          contactPerson: values.contactPerson,
          contactPhone: values.contactPhone
        });
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting
      }) => (
        <Form size="large" onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field error={errors.name && touched.name}>
              <Form.Input
                label="Name"
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name ? (
                <Label pointing>{errors.name}</Label>
              ) : null}
            </Form.Field>
            <Form.Field error={errors.agree && touched.agree}>
              <br />
              <Checkbox
                label="Active"
                id="active"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.active}
              />
              {errors.active && touched.active ? (
                <>
                  <br />
                  <Label pointing>{errors.active}</Label>
                </>
              ) : null}
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field error={errors.brand && touched.brand}>
              <Form.Input
                label="Brand"
                type="text"
                name="brand"
                placeholder="Brand"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.brand}
              />
              {errors.brand && touched.brand ? (
                <Label pointing>{errors.brand}</Label>
              ) : null}
            </Form.Field>
            <Form.Field error={errors.region && touched.region}>
              <Form.Input
                label="Region"
                type="text"
                name="region"
                placeholder="Region"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.company}
              />
              {errors.region && touched.region ? (
                <Label pointing>{errors.region}</Label>
              ) : null}
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field error={errors.address1 && touched.address1}>
              <Form.Input
                label="Address Line 1"
                type="text"
                name="address1"
                placeholder="Address Line 1"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address1}
              />
              {errors.address1 && touched.address1 ? (
                <Label pointing>{errors.address1}</Label>
              ) : null}
            </Form.Field>
            <Form.Field error={errors.address2 && touched.address2}>
              <Form.Input
                label="Address Line 2"
                type="text"
                name="address2"
                placeholder="Address Line 2"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address2}
              />
              {errors.address2 && touched.address2 ? (
                <Label pointing>{errors.address2}</Label>
              ) : null}
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field error={errors.city && touched.city}>
              <Form.Input
                label="City"
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
              />
              {errors.city && touched.city ? (
                <Label pointing>{errors.city}</Label>
              ) : null}
            </Form.Field>
            <Form.Field error={errors.state && touched.state}>
              <Form.Input
                label="State/Province"
                type="text"
                name="state"
                placeholder="State/Province"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.state}
              />
              {errors.state && touched.state ? (
                <Label pointing>{errors.state}</Label>
              ) : null}
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field error={errors.country && touched.country}>
              <Form.Input
                label="Country"
                type="text"
                name="country"
                placeholder="Country"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
              />
              {errors.country && touched.country ? (
                <Label pointing>{errors.country}</Label>
              ) : null}
            </Form.Field>
            <Form.Field error={errors.postalCode && touched.postalCode}>
              <Form.Input
                label="Zip/Postal Code"
                type="text"
                name="postalCode"
                placeholder="Zip/Postal Code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.postalCode}
              />
              {errors.postalCode && touched.postalCode ? (
                <Label pointing>{errors.postalCode}</Label>
              ) : null}
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field error={errors.latitude && touched.latitude}>
              <Form.Input
                label="Latitude"
                type="number"
                name="latitude"
                placeholder="Latitude"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.latitude}
              />
              {errors.latitude && touched.latitude ? (
                <Label pointing>{errors.latitude}</Label>
              ) : null}
            </Form.Field>
            <Form.Field error={errors.longitude && touched.longitude}>
              <Form.Input
                label="Longitude"
                type="number"
                name="longitude"
                placeholder="Longitude"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.longitude}
              />
              {errors.longitude && touched.longitude ? (
                <Label pointing>{errors.longitude}</Label>
              ) : null}
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field error={errors.contactPerson && touched.contactPerson}>
              <Form.Input
                label="Contact Person"
                type="text"
                name="contactPerson"
                placeholder="Contact Person"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contactPerson}
              />
              {errors.contactPerson && touched.contactPerson ? (
                <Label pointing>{errors.contactPerson}</Label>
              ) : null}
            </Form.Field>
            <Form.Field error={errors.contactPhone && touched.contactPhone}>
              <Form.Input
                label="Contact Phone Number"
                type="text"
                name="contactPhone"
                placeholder="Contact Phone Number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contactPhone}
              />
              {errors.contactPhone && touched.contactPhone ? (
                <Label pointing>{errors.contactPhone}</Label>
              ) : null}
            </Form.Field>
          </Form.Group>
          <Button
            type="submit"
            fluid
            size="large"
            primary
            disabled={!isValid || isSubmitting}
          >
            Create Property
          </Button>
        </Form>
      )}
    </Formik>
  );
}

CreatePropertyForm.propTypes = {
  propertyCreate: PropTypes.func.isRequired
};
