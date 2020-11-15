import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Contacts() {
  const { handleSubmit, register, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    api
      .post("/contacts", data)
      .then((response) => {
        console.log(response);
        history.push("/contacts/view");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Row>
        <Col />
        <Col md={10}>
          <h1>Contacts</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                ref={register({
                  required: "Required",
                })}
                id="name"
                type="text"
                name="name"
                placeholder="Enter name"
              />
              <ErrorMessage errors={errors} name="name" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                ref={register({
                  required: "Required",
                })}
                id="email"
                type="email"
                name="email"
                placeholder="Enter email"
              />
              <ErrorMessage errors={errors} name="email" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="message">Message</Form.Label>
              <Form.Control
                ref={register({
                  required: "Required",
                })}
                as="textarea"
                row={3}
                id="message"
                name="message"
                placeholder="Enter message"
              />
              <ErrorMessage errors={errors} name="message" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Contacts;
