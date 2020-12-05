import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Table, Button, Spinner } from "react-bootstrap";

import api from "../../services/api";
import { getToken } from "../../services/auth";
import SearchBar from "../../assets/components/common/SearchBar";

function ClientsView() {
  const history = useHistory();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = () => {
    api
      .get("/clients", {
        params: {},
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setClients(response.data);
      });
  };

  const handleEdit = (id) => {
    history.push(`/admin/clients/${id}`);
  };

  const handleDelete = (id) => {
    api
      .post(
        `/clients/delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(() => loadClients());
  };

  return (
    <div>
      <SearchBar
        path="clients/search"
        handle={(data) =>
          data.length !== 0 ? setClients(data) : loadClients()
        }
      />
      <Row>
        <Col md={12}>
          <h1>Clientes</h1>
          {clients.length === 0 ? (
            <Row className="mt-3">
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
                  <th>Telefone</th>
                  <th>Endereço</th>
                  <th colSpan="2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{row.idClient}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.phone}</td>
                      <td>{row.address}</td>
                      <td>
                        <Button
                          onClick={() => handleEdit(row.idClient)}
                          variant="warning"
                        >
                          Editar
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() => handleDelete(row.idClient)}
                          variant="danger"
                        >
                          Excluir
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

export default ClientsView;
