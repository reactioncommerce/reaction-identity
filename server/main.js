import { Meteor } from "meteor/meteor";
import Logger from "@reactioncommerce/logger";
import config from "./config.js";
import { oauthLogin } from "./oauthMethods.js";

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
