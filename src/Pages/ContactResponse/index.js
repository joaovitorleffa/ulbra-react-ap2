import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, Table, Form, Button } from 'react-bootstrap';

import api from '../../services/api';
import { getToken } from '../../services/auth';

function ContactReponse() {
  const { id } = useParams();
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  const [contact, setContact] = useState({});

  useEffect(() => {
    api
      .get(`contacts/${id}`, {
        params: {},
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      .then(response => {
        setContact(response.data);
      });
  }, [id]);

  const onSubmit = (data) => {
    const dataForm = {
      status: data.status,
      description: data.description,
    }
    api
      .post(`contacts/update/${contact.idContact}`, dataForm, {
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
      <h1>Retornar ao Contato</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <thead>

          </thead>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{contact.idContact}</td>
            </tr>
            <tr>
              <th>Nome</th>
              <td>{contact.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{contact.email}</td>
            </tr>
            <tr>
              <th>Mensagem</th>
              <td>{contact.message}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>
                <Form.Control 
                  name="status" 
                  as="select" 
                  value={contact.status} 
                  ref={register}
                  onChange={(e) => setContact({ ...contact, status: e.target.value })}
                >
                  <option value="0">Aberto</option>
                  <option value="1">Fechado</option>
                </Form.Control>
              </td>
            </tr>
            <tr>
              <th>Description</th>
              <td>
                <Form.Group>
                  <Form.Control as="textarea" rows={3}  ref={register} />
                </Form.Group>
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

export default ContactReponse;