import React from "react";
import { Col, Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid>
          <Row>
            <Col sm={6}>{new Date().getFullYear()} ©Cybermate.</Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">Design & Developed by Cybermate Technology Private Limited</div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
