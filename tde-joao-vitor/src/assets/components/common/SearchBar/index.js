import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import api from "../../../../services/api";
import { getToken } from "../../../../services/auth";

import { Button, Form, Row } from "react-bootstrap";

function SearchBar({ path, handle }) {
  const { handleSubmit, register } = useForm();

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
          handle(response.data);
        });
    },
    [path, handle]
  );

  return (
    <Row>
      <Form onSubmit={handleSubmit(handleSearch)}>
        <Form.Group>
          <Form.Control
            ref={register}
            name="search"
            placeholder="Search client"
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Search
        </Button>
      </Form>
    </Row>
  );
}

export default SearchBar;
