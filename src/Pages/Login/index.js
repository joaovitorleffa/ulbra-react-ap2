import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { Row, Col, Form, Button } from "react-bootstrap";

import api from "../../services/api";
import { setToken } from "../../services/auth";

import "./styles.css";

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
        window.location.reload();
      });
  };

  return (
    <div className="mt-5">
      <Row>
        <Col />
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label className="label">User</Form.Label>
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
              <Form.Label className="label">Password</Form.Label>
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
            <Button variant="primary" type="submit" className="button">
              Submit
            </Button>
          </Form>
        </Col>
        <Col />
      </Row>
    </div>
  );
}

export default Login;
