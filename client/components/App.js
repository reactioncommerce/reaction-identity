import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../routes.js";
import AuthPage from "./AuthPage.js";

/**
 * App component
 * @returns {React.ReactElement} React component
 */
function App() {
  return (
    <>
      <Switch>
        {
          routes.map((route, index) => (
            <Route
              key={route.path || `app-route-${index}`}
              path={route.path}
              exact={route.exact}
              render={(props) => <AuthPage><route.mainComponent {...props} /></AuthPage>}
            />
          ))
        }
        <Route key="default" component={AuthPage} />
      </Switch>
    </>
  );
}

export default App;
