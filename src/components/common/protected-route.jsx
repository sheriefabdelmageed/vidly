import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "./../../services/auth-service";
const ProtectedRoute = ({ path, component: Component, ...props }) => {
  const user = getUser();
  return (
    <Route
      {...props}
      path={path}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

export default ProtectedRoute;
