import React from "react";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./assets/components/Navbar";
import Section from "./assets/components/Section";
import Footer from "./assets/components/Footer";

function App() {
  return (
    <Container fluid>
      <Router>
        <Navbar />
        <Section />
        <Footer />
      </Router>
    </Container>
  );
}

export default App;
