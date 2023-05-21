import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { getToken } from "../utils/storage/index";

const PrivateRoute = ({
  component: Component,
  rolesUser,
  rolesRoute,
  ...rest
}) => {
  const hasToken = getToken();
  // console.log(rolesUser);
  // console.log(rolesRoute);
  return (
    <Route
      {...rest}
      render={(props) =>
        hasToken && (!rolesRoute || rolesUser === rolesRoute) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/Signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
};

export default PrivateRoute;
