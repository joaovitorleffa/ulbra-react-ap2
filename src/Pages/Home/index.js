import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import api from '../../services/api';

function Home() {
  const [page, setPage] = useState();

  useEffect(() => {
    api
      .get('/pages/1')
      .then(response => {
        console.log(response.data);
        setPage(response.data.content);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col 
          dangerouslySetInnerHTML={
            {
              __html: page
            }
          }
        />
      </Row>
    </Container>
  );
}

export default Home;
