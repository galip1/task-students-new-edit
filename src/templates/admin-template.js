import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "../components/admin/sidebar";

const AdminTemplate = ({ children }) => {
  return (
    <Container fluid style={{ backgroundColor: "white" }}>
      <Row>
        <Col lg={3} xxl="2" className="p-0">
          <SideBar />
        </Col>
        <Col lg={9} xxl="10" className="p-5">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminTemplate;
