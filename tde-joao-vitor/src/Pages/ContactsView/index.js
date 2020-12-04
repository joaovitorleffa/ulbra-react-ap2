import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SearchBar from "../../assets/components/common/SearchBar";
import ReactLoading from "react-loading";

import { getToken } from "../../services/auth";
import api from "../../services/api";

function ContactsView() {
  const history = useHistory();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
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
  }, []);

  const handleResponse = (id) => {
    history.push(`/admin/contacts/${id}`);
  };

  return (
    <Container>
      <Row>
        <SearchBar path="clients/search" handle={(data) => setContacts(data)} />
      </Row>
      <Row>
        <Col />
        <Col md={10}>
          <h1>View</h1>
          {contacts.length === 0 ? (
            <ReactLoading type="spin" color="green" className="loading" />
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
        <Col />
      </Row>
    </Container>
  );
}

export default ContactsView;
