import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { setToken } from "../../services/auth";

function Login() {
  const { handleSubmit, register, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    const userData = {
      user: data.user,
      pass: data.password,
    };

    api
      .post("users/login", userData)
      .then((response) => {
        response.data.token && setToken(response.data.token);
      })
      .finally(() => {
        history.push("/admin/home");
      });
  };

  return (
    <Container>
      <Row>
        <Col />
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>User</Form.Label>
              <Form.Control
                ref={register({
                  required: "Required",
                })}
                id="user"
                name="user"
                type="text"
                placeholder="Enter user"
              />
              <ErrorMessage errors={errors} name="user" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={register({
                  required: "Required",
                })}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
              <ErrorMessage errors={errors} name="password" />
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

export default Login;
