import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import SimpleSchema from "simpl-schema";
import useReactoForm from "reacto-form/cjs/useReactoForm";
import Random from "@reactioncommerce/random";
import Button from "@reactioncommerce/components/Button/v1";
import ErrorsBlock from "@reactioncommerce/components/ErrorsBlock/v1";
import Field from "@reactioncommerce/components/Field/v1";
import InlineAlert from "@reactioncommerce/components/InlineAlert/v1";
import TextInput from "@reactioncommerce/components/TextInput/v1";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

/**
 * @summary Does `Accounts.resetPassword` followed by
 *   calling the "oauth/login" method.
 * @param {Object} input Input
 * @param {String} [input.challenge] Challenge to pass to the "oauth/login" method
 *   after logging in.
 * @param {String} input.token Password reset token to pass to `Accounts.resetPassword`
 * @param {String} input.password New password to pass to `Accounts.resetPassword`
 * @return {Promise<undefined>} Nothing
 */
function callResetPassword({ token, password }) {
  return new Promise((resolve, reject) => {
    Accounts.resetPassword(token, password, (error) => {
      if (error) {
        reject(error);
      } else {
        // Accounts package has logged us in, too, but we don't want that.
        Meteor.logout(() => {
          resolve();
        });
      }
    });
  });
}

const useStyles = makeStyles(() => ({
  inlineAlert: {
    marginBottom: 16
  },
  loginFormTitle: {
    color: "#1999dd",
    fontFamily: "'Source Sans Pro', 'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
    fontSize: 30,
    fontWeight: 400,
    marginBottom: 40,
    textAlign: "center"
  }
}));

const formSchema = new SimpleSchema({
  password: {
    type: String,
    min: 6
  }
});
const validator = formSchema.getFormValidator();

/**
 * @summary ResetPassword React component
 * @param {Object} props Component props
 * @return {React.Node} Rendered component instance
 */
function ResetPassword() {
  const [submitWasSuccessful, setSubmitWasSuccessful] = useState(false);
  const { t } = useTranslation(); // eslint-disable-line id-length
  const uniqueId = useMemo(() => Random.id(), []);
  const classes = useStyles();
  const { token } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    getErrors,
    getInputProps,
    submitForm
  } = useReactoForm({
    async onSubmit(formData) {
      setIsSubmitting(true);
      try {
        await callResetPassword({ token, ...formData });
      } catch (error) {
        setSubmitError(error.message);
        setIsSubmitting(false);
        return { ok: false };
      }
      setSubmitWasSuccessful(true);
      setIsSubmitting(false);
      return { ok: true };
    },
    validator
  });

  return (
    <div>
      <div className={classes.loginFormTitle}>
        {t("updateYourPassword")}
      </div>

      {!submitWasSuccessful &&
        <Field
          errors={getErrors(["password"])}
          isRequired
          label={t("password")}
          labelFor={`password-${uniqueId}`}
          name="password"
        >
          <TextInput
            type="password"
            id={`password-${uniqueId}`}
            {...getInputProps("password")}
          />
          <ErrorsBlock errors={getErrors(["password"])} />
        </Field>
      }

      {submitError &&
        <InlineAlert
          alertType="error"
          className={classes.inlineAlert}
          message={submitError}
        />
      }

      {submitWasSuccessful &&
        <InlineAlert
          alertType="success"
          className={classes.inlineAlert}
          message={t("passwordResetDone")}
        />
      }

      {!submitWasSuccessful &&
        <Button
          actionType="important"
          isFullWidth
          isWaiting={isSubmitting}
          onClick={submitForm}
        >
          {t("setPassword")}
        </Button>
      }
    </div>
  );
}

export default ResetPassword;
