import React from 'react';
import { Form, Button, Input, Label, Icon } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import * as errors from '../../../shared/constants/errors';

export default function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(errors.EMAILVALID)
          .required(errors.REQ),
        password: Yup.string().required(errors.REQ)
      })}
      onSubmit={async (values, { setSubmitting, setTouched }) => {
        setSubmitting(true);
        console.log(values);
        setTouched({ email: false, password: false });
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
        <Form size="large" onSubmit={handleSubmit} data-testid="login-form">
          <Form.Field error={errors.email && touched.email}>
            <Input fluid iconPosition="left" placeholder="Email address">
              <Icon name="user" />
              <input
                type="text"
                name="email"
                data-testid="emailInput"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </Input>
            {errors.email && touched.email ? (
              <Label pointing>{errors.email}</Label>
            ) : null}
          </Form.Field>
          <Form.Field error={errors.password && touched.password}>
            <Input fluid iconPosition="left" placeholder="Password">
              <Icon name="lock" />
              <input
                type="password"
                name="password"
                data-testid="passwordInput"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Input>
            {errors.password && touched.password && (
              <Label data-testid="passwordError" pointing>
                {errors.password}
              </Label>
            )}
          </Form.Field>
          <Button
            data-testid="submit"
            type="submit"
            fluid
            size="large"
            primary
            disabled={!isValid || isSubmitting}
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}
