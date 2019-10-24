import { Meteor } from "meteor/meteor";
import config from "./config.js";
import { oauthLogin } from "./oauthMethods.js";

Meteor.methods({
  "getGraphQLApiUrl": () => config.API_URL,
  "oauth/login": oauthLogin
});

// Init endpoints
import "./i18n/handler.js";
import "./oauthEndpoints.js";
