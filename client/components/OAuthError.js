import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const useStyles = makeStyles(() => ({
  pageTitle: {
    color: "#1999dd",
    fontFamily: "'Source Sans Pro', 'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
    fontSize: 30,
    fontWeight: 400,
    marginBottom: 40,
    textAlign: "center"
  },
  generalText: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 40,
    textAlign: "center"
  },
  text: {
    textAlign: "center"
  }
}));

/**
 * @summary OAuthError React component
 * @param {Object} props Component props
 * @return {React.Node} Rendered component instance
 */
function OAuthError() {
  const classes = useStyles();
  const { t } = useTranslation(); // eslint-disable-line id-length
  const location = useLocation();
  const {
    error_description: errorDescription,
    error_hint: errorHint
  } = queryString.parse(location.search);

  return (
    <div>
      <div className={classes.pageTitle}>
        {t("error")}
      </div>
      <div className={classes.generalText}>
        {t("authError")}
      </div>
      <div className={classes.text}>
        {errorDescription} {errorHint}
      </div>
    </div>
  );
}

export default OAuthError;
