import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import SearchBar from "../../assets/components/common/SearchBar";

import { getToken } from "../../services/auth";
import api from "../../services/api";

function ClientsView() {
  const history = useHistory();
  const [clients, setClients] = useState([]);

  useEffect(() => {
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
  }, []);

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
      .then((res) => console.log(res.data));
  };

  return (
    <Container>
      <SearchBar path="clients/search" handle={(data) => setClients(data)} />

      <Col md={10}>
        <h1>View</h1>
        {clients.length === 0 ? (
          <ReactLoading type="spin" color="green" className="loading" />
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
                      <Button onClick={() => handleEdit(row.idClient)}>
                        Editar
                      </Button>
                    </td>
                    <td>
                      <Button onClick={() => handleDelete(row.idClient)}>
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
      <Col />
    </Container>
  );
}

export default ClientsView;
