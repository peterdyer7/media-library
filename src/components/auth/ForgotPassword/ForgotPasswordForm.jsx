import React from 'react';
import { Form, Button, Label, Message } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { forgotPassword } from '../../../shared/firebase/auth/auth';
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
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setSubmitting(true);
        try {
          await forgotPassword(values.email);
          setStatus({ sent: true, success: true, message: 'Email sent' });
        } catch (err) {
          setStatus({ sent: true, success: false, message: err.message });
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        status,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting
      }) => (
        <>
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
          {status && status.sent && (
            <Message
              data-testid="message"
              success={status.success}
              error={!status.success}
            >
              {status.message}
            </Message>
          )}
        </>
      )}
    </Formik>
  );
}
