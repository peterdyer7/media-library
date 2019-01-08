import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Label } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import * as errors from '../../../shared/constants/errors';

export default function ResetPasswordForm({ show, sendResetPassword }) {
  return (
    <Formik
      initialValues={{ newPassword: '' }}
      validationSchema={Yup.object().shape({
        newPassword: Yup.string()
          .required(errors.REQ)
          .min(6, errors.PASSMIN)
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        sendResetPassword(values.newPassword);
        show(false);
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
        <>
          <Form onSubmit={handleSubmit} data-testid="resetpassword-form">
            <Form.Field error={errors.newPassword && touched.newPassword}>
              <input
                type="password"
                name="newPassword"
                data-testid="newPasswordInput"
                placeholder="New password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.newPassword && touched.newPassword ? (
                <Label pointing>{errors.newPassword}</Label>
              ) : null}
            </Form.Field>

            <Button
              data-testid="submit"
              type="submit"
              size="small"
              primary
              disabled={!isValid || isSubmitting}
            >
              Update
            </Button>
            <Button
              data-testid="cancel"
              type="button"
              size="small"
              secondary
              onClick={() => show(false)}
            >
              Cancel
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
}

ResetPasswordForm.propTypes = {
  show: PropTypes.func,
  sendResetPassword: PropTypes.func.isRequired
};
