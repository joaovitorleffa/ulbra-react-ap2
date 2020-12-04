import React from 'react';

import { Jumbotron, Container } from 'react-bootstrap';

function Header() {
  return (
    <Jumbotron fluid className="mb-0">
      <Container>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
      </Container>
    </Jumbotron>
  );
}

export default Header;