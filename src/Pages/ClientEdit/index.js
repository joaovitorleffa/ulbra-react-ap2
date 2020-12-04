import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, Table, Form, Button } from 'react-bootstrap';

import api from '../../services/api';
import { getToken } from '../../services/auth';

function ClientEdit() {
  const { id } = useParams();
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  const [client, setClient] = useState({});

  useEffect(() => {
    api
      .get(`clients/${id}`, {
        params: {},
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      .then(response => {
        setClient(response.data);
      });
  }, [id]);

  const onSubmit = (data) => {
    const dataForm = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    }
    api
      .post(`clients/update/${client.idClient}`, dataForm, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        }
      })
      .then()
      .finally(() => {
        history.goBack();
      });
  }

  return (
    <Container>
      <h1>Editar Cliente</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <thead>

          </thead>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{client.idClient}</td>
            </tr>
            <tr>
                <th>Nome</th>
                <td>
                  <Form.Control 
                    name="name"
                    value={client.name}
                    onChange={(e) => setClient({ ...client, name: e.target.value })}
                    ref={register}
                  />
                </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                <Form.Control 
                    name="email"
                    value={client.email}
                    onChange={(e) => setClient({ ...client, email: e.target.value })}
                    ref={register}
                />
              </td>
            </tr>
            <tr>
              <th>Telefone</th>
              <td>
                <Form.Control 
                    name="phone"
                    value={client.phone}
                    onChange={(e) => setClient({ ...client, phone: e.target.value })}
                    ref={register}
                />
              </td>
            </tr>
            <tr>
              <th>Status</th>
              <td>
                <Form.Control 
                    name="address"
                    value={client.address}
                    onChange={(e) => setClient({ ...client, address: e.target.value })}
                    ref={register}  
                />
              </td>
            </tr>
            <tr>
              <Button type="submit">Salvar</Button>
            </tr>
          </tbody>
        </Table>
      </Form>
    </Container>
  );
}

export default ClientEdit;