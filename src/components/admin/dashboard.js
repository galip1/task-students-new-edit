import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import { PiStudentLight } from "react-icons/pi";
import { BsBookmark } from "react-icons/bs";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineDollar,
  AiOutlineSetting,
} from "react-icons/ai";
import "./dashboard.scss";
import { getUsers } from "../../api/user-service";
const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const loadData = async () => {
    try {
      const resp = await getUsers();
      setUsers(resp.data.total);
    } catch (err) {}
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container className="dashboard-card mt-5">
      <Row className="g-4">
        <Col sm={6} md={4}>
          <Link to="/admin/students">
            <Card>
              <div>
                <PiStudentLight />
                <p>Students</p>
              </div>
              <span>25</span>
            </Card>
          </Link>
        </Col>

        <Col sm={6} md={4}>
          <Link to="/admin/cource">
            <Card>
              <div>
                <BsBookmark />
                <p>Cource</p>
              </div>

              <span>19</span>
            </Card>
          </Link>
        </Col>

        <Col sm={6} md={4}>
          <Link to="/admin/payment">
            <Card>
              <div>
                <AiOutlineDollar />
                <p>Payment </p>
              </div>

              <span>18 $ </span>
            </Card>
          </Link>
        </Col>
        <Col sm={6} md={4}>
          <Link to="/admin/user">
            <Card>
              <div>
                <AiOutlineUser />
                <p>User </p>
              </div>

              <span>{users}</span>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
