import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { Container, Row, Col } from 'react-bootstrap';

function About() {
  const [page, setPage] = useState();

  useEffect(() => {
    api
      .get('/pages/2')
      .then(response => {
        setPage(response.data.content);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <Container>
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

export default About;