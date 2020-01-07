import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import Logger from "@reactioncommerce/logger";
import config from "./config.js";
import { oauthLogin } from "./oauthMethods.js";

/**
 * @see: http://docs.meteor.com/#/full/accounts_oncreateuser
 */
Accounts.onCreateUser((options, user) => {
  const roles = {};

  // If there is not yet an "owner" user, make this one an owner
  const ownerUser = Meteor.users.findOne({ "roles.__global_roles__": "owner" });
  if (!ownerUser) roles.__global_roles__ = ["owner"]; // eslint-disable-line camelcase

  user.roles = roles;

  return user;
});

Meteor.methods({
  "getGraphQLApiUrl": () => config.API_URL,
  "oauth/login": oauthLogin
});

// Init endpoints
import "./i18n/handler.js";
import "./oauthEndpoints.js";

Meteor.startup(() => {
  Logger.info(`Serving Reaction Identity at ${config.ROOT_URL}`);
});
