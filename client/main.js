import React, { createContext, Suspense } from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter, Route } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import App from "./components/App.js";
import Loading from "./components/Loading.js";
import Logger from "./Logger.js";
import "./i18n.js";

const RouterContext = createContext(null);

/**
 * @summary Asks the server what the GraphQL API URL is and returns it.
 * @return {Promise<String>} The GraphQL API URL
 */
function getGraphQlApiUrl() {
  return new Promise((resolve, reject) => {
    Meteor.call("getGraphQLApiUrl", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * @summary Initialize the app
 * @return {Promise<undefined>} Nothing
 */
async function init() {
  const graphQlApiUrl = await getGraphQlApiUrl();

  const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: graphQlApiUrl }),
    cache: new InMemoryCache()
  });

  ReactDOM.render(
    (
      <Suspense fallback={<Loading />}>
        <ApolloProvider client={apolloClient}>
          <BrowserRouter>
            <Route>
              {(routeProps) => (
                <RouterContext.Provider value={routeProps}>
                  <App />
                </RouterContext.Provider>
              )}
            </Route>
          </BrowserRouter>
        </ApolloProvider>
      </Suspense>
    ),
    document.getElementById("react-root")
  );
}

init().catch((error) => {
  Logger.error(error);
});
