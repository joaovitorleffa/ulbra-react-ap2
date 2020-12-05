import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Row, Col } from "react-bootstrap";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import api from "../../../../services/api";
import { getToken } from "../../../../services/auth";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SearchBar({ path, handle }) {
  const { handleSubmit, register } = useForm();
  const [open, setOpen] = useState(false);

  const handleSearch = useCallback(
    (data) => {
      api
        .get(`${path}/${data.search}`, {
          params: {},
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((response) => {
          if (response.data.length === 0) {
            setOpen(true);
            return handle([]);
          }
          handle(response.data);
        });
    },
    [path, handle]
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Row className="mt-3">
      <Col md={4} />
      <Col md={8}>
        <Form onSubmit={handleSubmit(handleSearch)}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  ref={register}
                  name="search"
                  placeholder="Search client"
                />
              </Form.Group>
            </Col>
            <Col>
              <Button type="submit" variant="success">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col md={4} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Nenhum usuário encontrado
        </Alert>
      </Snackbar>
    </Row>
  );
}

export default SearchBar;
