import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../../../Pages/Home";
import Contacts from "../../../Pages/Contacts";
import Products from "../../../Pages/Products";
import ContactsView from "../../../Pages/ContactsView";
import ContactResponse from "../../../Pages/ContactResponse";
import About from "../../../Pages/About";
import Login from "../../../Pages/Login";
import Admin from "../../../Pages/Admin";
import ClientsView from "../../../Pages/ClientsView";
import ClientEdit from "../../../Pages/ClientEdit";
import Clients from "../../../Pages/Clients";

import "./styles.css";

import PrivateRoute from "../common/PrivateRoute";

function Section() {
  return (
    <div className="section">
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
        <PrivateRoute path="/admin/clients/view" component={ClientsView} />
        <PrivateRoute path="/admin/clients/:id" component={ClientEdit} />]
        <PrivateRoute path="/admin/clients" component={Clients} />
      </Switch>
    </div>
  );
}

export default Section;
