import React, { useState } from 'react';
import { Form, Button, Label, Checkbox, Confirm } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import * as errors from '../../../shared/constants/errors';
import { TERMS } from '../../../shared/constants/company';

export default function RegisterForm() {
  const [termsConfirmOpen, setTermsConfirmOpen] = useState(false);

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        password1: '',
        password2: '',
        agree: false
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required(errors.REQ),
        lastName: Yup.string().required(errors.REQ),
        company: Yup.string().required(errors.REQ),
        email: Yup.string()
          .email(errors.EMAILVALID)
          .required(errors.REQ),
        password1: Yup.string()
          .required(errors.REQ)
          .min(6, errors.PASSMIN),
        password2: Yup.string()
          .required(errors.REQ)
          .oneOf([Yup.ref('password1')], errors.PASSMATCH),
        agree: Yup.boolean().oneOf([true], errors.AGREETC)
      })}
      onSubmit={async (values, { setSubmitting, setTouched }) => {
        setSubmitting(true);
        console.log(values);
        setTouched({ email: false });
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
        isValid,
        isSubmitting,
        setFieldValue
      }) => (
        <Form size="large" onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field error={errors.firstName && touched.firstName}>
              <Form.Input
                label="First name"
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              {errors.firstName && touched.firstName ? (
                <Label pointing>{errors.firstName}</Label>
              ) : null}
            </Form.Field>
            <Form.Field error={errors.lastName && touched.lastName}>
              <Form.Input
                label="Last name"
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              {errors.lastName && touched.lastName ? (
                <Label pointing>{errors.lastName}</Label>
              ) : null}
            </Form.Field>
          </Form.Group>
          <Form.Field error={errors.company && touched.company}>
            <Form.Input
              label="Company"
              type="text"
              name="company"
              placeholder="Company"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.company}
            />
            {errors.company && touched.company ? (
              <Label pointing>{errors.company}</Label>
            ) : null}
          </Form.Field>
          <Form.Field error={errors.email && touched.email}>
            <Form.Input
              label="Email address"
              type="text"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Label pointing>{errors.email}</Label>
            ) : null}
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field error={errors.password1 && touched.password1}>
              <Form.Input
                label="Password"
                type="password"
                name="password1"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password1}
              />
              {errors.password1 && touched.password1 ? (
                <Label pointing>{errors.password1}</Label>
              ) : null}
            </Form.Field>
            <Form.Field error={errors.password2 && touched.password2}>
              <Form.Input
                label="Confirm password"
                type="password"
                name="password2"
                placeholder="Confirm password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password2}
              />
              {errors.password2 && touched.password2 ? (
                <Label pointing>{errors.password2}</Label>
              ) : null}
            </Form.Field>
          </Form.Group>
          <Form.Field error={errors.agree && touched.agree}>
            <Checkbox
              label="I agree to the"
              id="agree"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.agree}
            />
            &nbsp;&nbsp;
            <Button
              type="button"
              basic
              compact
              color="black"
              onClick={() => {
                setTermsConfirmOpen(true);
              }}
            >
              Terms and Conditions
            </Button>
            <Confirm
              open={termsConfirmOpen}
              cancelButton="Disagree"
              confirmButton="Agree"
              onCancel={() => {
                setFieldValue('agree', false);
                setTermsConfirmOpen(false);
              }}
              onConfirm={() => {
                setFieldValue('agree', true);
                setTermsConfirmOpen(false);
              }}
              content={TERMS}
              size="large"
            />
            {errors.agree && touched.agree ? (
              <>
                <br />
                <Label pointing>{errors.agree}</Label>
              </>
            ) : null}
          </Form.Field>

          <Button
            type="submit"
            fluid
            size="large"
            primary
            disabled={!isValid || isSubmitting}
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
}
