import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Table, Button, Spinner } from "react-bootstrap";

import api from "../../services/api";
import { getToken } from "../../services/auth";
import SearchBar from "../../assets/components/common/SearchBar";

function ContactsView() {
  const history = useHistory();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    api
      .get("/contacts", {
        params: {},
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setContacts(response.data);
      });
  };

  const handleResponse = (id) => {
    history.push(`/admin/contacts/${id}`);
  };

  return (
    <div>
      <SearchBar
        path="contacts/search"
        handle={(data) =>
          data.length !== 0 ? setContacts(data) : loadContacts()
        }
      />
      <Row>
        <Col md={12}>
          <h1>Contatos</h1>
          {contacts.length === 0 ? (
            <Row className="3">
              <Col md={5} />
              <Col md={2}>
                <Spinner animation="grow" variant="primary" />
              </Col>
              <Col md={5} />
            </Row>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mensagem</th>
                  <th>Status</th>
                  <th colSpan="2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{row.idContact}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.message}</td>
                      <td>{row.status}</td>
                      <td>
                        <Button onClick={() => handleResponse(row.idContact)}>
                          Responder
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ContactsView;
