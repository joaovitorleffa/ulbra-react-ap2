import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { isAdmin, deleteToken } from "../../../services/auth";

function CustomNavBar() {
  const [admin, setAdmin] = useState(false);
  const history = useHistory();

  const logout = () => {
    deleteToken();
    setAdmin(false);
    history.push("/users/login");
  };

  useEffect(() => {
    setAdmin(isAdmin());
  }, []);

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">React Bootstrap</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link>
          <Link exact to="/">
            Home
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/about">About</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/products">Products</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/contacts">Contacts</Link>
        </Nav.Link>
      </Nav>
      <Nav>
        {admin ? (
          <>
            <Nav.Link>
              <Link onClick={logout}>Logout</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/admin/contacts/view">View contacts</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/admin/clients/view">View clients</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/admin/clients">Clients</Link>
            </Nav.Link>
          </>
        ) : (
          <Nav.Link>
            <Link to="/users/login">Login</Link>
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
}

export default CustomNavBar;
