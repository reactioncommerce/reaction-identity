import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import queryString from "query-string";
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
 * @summary Does `Accounts.changePassword`
 * @param {Object} input Input
 * @param {String} input.email Email address for which we're changing the password
 * @param {String} input.oldPassword Old password to pass to `Accounts.changePassword`
 * @param {String} input.newPassword New password to pass to `Accounts.changePassword`
 * @return {Promise<undefined>} Nothing
 */
function callChangePassword({ email, oldPassword, newPassword }) {
  return new Promise((resolve, reject) => {
    // `changePassword` works only when logged in, but we can log in
    // just before calling it because we have the old password.
    Meteor.loginWithPassword(email, oldPassword, (meteorLoginError) => {
      if (meteorLoginError) {
        reject(meteorLoginError);
      } else {
        Accounts.changePassword(oldPassword, newPassword, (error) => {
          Meteor.logout((logoutError) => {
            if (error || logoutError) {
              reject(error || logoutError);
            } else {
              resolve();
            }
          });
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
  email: {
    type: String,
    min: 3
  },
  newPassword: {
    type: String,
    min: 6
  },
  oldPassword: {
    type: String
  }
});
const validator = formSchema.getFormValidator();

/**
 * @summary ChangePassword React component
 * @param {Object} props Component props
 * @return {React.Node} Rendered component instance
 */
function ChangePassword() {
  const [submitWasSuccessful, setSubmitWasSuccessful] = useState(false);
  const { t } = useTranslation(); // eslint-disable-line id-length
  const uniqueId = useMemo(() => Random.id(), []);
  const classes = useStyles();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { email, from } = queryString.parse(location.search);
  const formDocRef = useRef({ email });

  const {
    getErrors,
    getInputProps,
    submitForm
  } = useReactoForm({
    async onSubmit(formData) {
      setIsSubmitting(true);
      try {
        await callChangePassword(formData);
      } catch (error) {
        setSubmitError(error.message);
        setIsSubmitting(false);
        return { ok: false };
      }
      setIsSubmitting(false);
      setSubmitWasSuccessful(true);
      setTimeout(() => {
        if (from) window.location.href = from;
      }, 2000);
      return { ok: true };
    },
    validator,
    value: formDocRef.current
  });

  return (
    <div>
      <div className={classes.loginFormTitle}>
        {t("changePassword")}
      </div>

      <Field
        isRequired
        errors={getErrors(["email"])}
        name="email"
        label={t("emailAddress")}
        labelFor={`email-${uniqueId}`}
      >
        <TextInput
          type="email"
          id={`email-${uniqueId}`}
          {...getInputProps("email")}
        />
        <ErrorsBlock errors={getErrors(["email"])} />
      </Field>
      <Field
        errors={getErrors(["oldPassword"])}
        isRequired
        label={t("currentPassword")}
        labelFor={`oldPassword-${uniqueId}`}
        name="oldPassword"
      >
        <TextInput
          type="password"
          id={`oldPassword-${uniqueId}`}
          {...getInputProps("oldPassword")}
        />
        <ErrorsBlock errors={getErrors(["oldPassword"])} />
      </Field>
      <Field
        errors={getErrors(["newPassword"])}
        isRequired
        label={t("newPassword")}
        labelFor={`newPassword-${uniqueId}`}
        name="newPassword"
      >
        <TextInput
          type="password"
          id={`newPassword-${uniqueId}`}
          {...getInputProps("newPassword")}
        />
        <ErrorsBlock errors={getErrors(["newPassword"])} />
      </Field>

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
          message={t("passwordChanged")}
        />
      }

      <Button
        actionType="important"
        isFullWidth
        isWaiting={isSubmitting}
        onClick={submitForm}
      >
        {t("changePassword")}
      </Button>
    </div>
  );
}

export default ChangePassword;
