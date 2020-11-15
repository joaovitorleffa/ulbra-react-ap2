import React from "react";
import { Switch, Route } from "react-router-dom";
import { isAdmin } from "../../../services/auth";

import Home from "../../../Pages/Home";
import Contacts from "../../../Pages/Contacts";
import Products from "../../../Pages/Products";
import ContactsView from "../../../Pages/ContactsView";
import ContactResponse from "../../../Pages/ContactResponse";
import About from "../../../Pages/About";
import Login from "../../../Pages/Login";
import Admin from "../../../Pages/Admin";

function Section() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/products">
        <Products />
      </Route>
      <Route exact path="/contacts">
        <Contacts />
      </Route>
      <Route path="/users/login">
        <Login />
      </Route>
      <PrivateRoute path="/admin/home" component={Admin} />
      <PrivateRoute
        exact
        path="/admin/contacts/view"
        component={ContactsView}
      />
      <PrivateRoute path="/admin/contacts/:id" component={ContactResponse} />
    </Switch>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin() ? <Component {...props} /> : alert("Sem permissão")
      }
    />
  );
}

export default Section;
