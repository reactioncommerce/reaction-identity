import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Random from "@reactioncommerce/random";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import SimpleSchema from "simpl-schema";
import useReactoForm from "reacto-form/cjs/useReactoForm";
import Button from "@reactioncommerce/components/Button/v1";
import ErrorsBlock from "@reactioncommerce/components/ErrorsBlock/v1";
import Field from "@reactioncommerce/components/Field/v1";
import InlineAlert from "@reactioncommerce/components/InlineAlert/v1";
import TextInput from "@reactioncommerce/components/TextInput/v1";

const sendResetAccountPasswordEmailMutation = gql`
  mutation sendResetAccountPasswordEmail($input: SendResetAccountPasswordEmailInput!) {
    sendResetAccountPasswordEmail(input: $input) {
      email
    }
  }
`;

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
  }
});
const validator = formSchema.getFormValidator();

/**
 * @summary ForgotPassword React component
 * @param {Object} props Component props
 * @return {React.Node} Rendered component instance
 */
function ForgotPassword() {
  const [submitWasSuccessful, setSubmitWasSuccessful] = useState(false);
  const { t } = useTranslation(); // eslint-disable-line id-length
  const uniqueId = useMemo(() => Random.id(), []);
  const classes = useStyles();
  const history = useHistory();

  const [
    sendResetAccountPasswordEmail,
    { error: mutationError, loading: isMutationLoading }
  ] = useMutation(sendResetAccountPasswordEmailMutation, {
    onCompleted() {
      setSubmitWasSuccessful(true);
    }
  });

  const {
    getErrors,
    getInputProps,
    submitForm
  } = useReactoForm({
    async onSubmit({ email }) {
      return sendResetAccountPasswordEmail({
        variables: {
          input: { email }
        }
      });
    },
    validator
  });

  return (
    <div>
      <div className={classes.loginFormTitle}>
        {t("forgotPassword")}
      </div>

      <Field
        name="email"
        isRequired
        errors={getErrors(["email"])}
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

      {mutationError &&
        <InlineAlert
          alertType="error"
          className={classes.inlineAlert}
          message={mutationError.message.replace("GraphQL error: ", "")}
        />
      }
      {submitWasSuccessful &&
        <InlineAlert
          alertType="success"
          className={classes.inlineAlert}
          message={t("passwordResetSend")}
        />
      }
      <Button
        actionType="important"
        isFullWidth
        isWaiting={isMutationLoading}
        onClick={submitForm}
      >
        {t("resetYourPassword")}
      </Button>
      <Button
        isDisabled={isMutationLoading}
        isFullWidth
        isShortHeight
        isTextOnly
        onClick={() => { history.push({ pathname: "/account/login", search: location.search }); }}
      >
        {t("signIn")}
      </Button>
    </div>
  );
}

export default ForgotPassword;
