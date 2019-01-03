import React from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import * as errors from '../../../shared/constants/errors';

export default function ForgotPasswordForm() {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(errors.EMAILVALID)
          .required(errors.REQ)
      })}
      onSubmit={async (values, { setSubmitting, setTouched }) => {
        setSubmitting(true);
        console.log(values);
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
        isSubmitting
      }) => (
        <Form
          size="large"
          onSubmit={handleSubmit}
          data-testid="forgotpassword-form"
        >
          <Form.Field error={errors.email && touched.email}>
            <label>Email address</label>
            <input
              type="text"
              name="email"
              data-testid="emailInput"
              placeholder="Email address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Label pointing>{errors.email}</Label>
            ) : null}
          </Form.Field>

          <Button
            data-testid="submit"
            type="submit"
            fluid
            size="large"
            primary
            disabled={!isValid || isSubmitting}
          >
            Send Email
          </Button>
        </Form>
      )}
    </Formik>
  );
}
