import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "../components/admin/sidebar";
import { useAppSelector } from "../store/hooks";
import Header from "../components/common/header/header";

const AdminTemplate = ({ children }) => {
  const { dataSlice } = useAppSelector((state) => state.data);
  return (
    <Container fluid style={{ backgroundColor: "white" }}>
      <Row>
        {dataSlice ? (
          <Col xs={0} lg={0} xxl={0} className="p-0">
            <SideBar />
          </Col>
        ) : (
          <Col lg={3} xxl={2} className="p-0">
            <SideBar />
          </Col>
        )}

        {dataSlice ? (
          <Col xs={12} lg={12} xxl={12} style={{ paddingLeft: "12px" }}>
            <Header />
            {children}
          </Col>
        ) : (
          <Col lg={9} xxl={10} className="paddingLeft">
            <Header />
            {children}
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default AdminTemplate;
