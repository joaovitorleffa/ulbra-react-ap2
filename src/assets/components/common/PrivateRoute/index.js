import React from "react";
import { Route } from "react-router-dom";
import { isAdmin } from "../../../../services/auth";

function PrivateRoute({ Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin() ? <Component {...props} /> : alert("Sem permissão")
      }
    />
  );
}

export default PrivateRoute;
