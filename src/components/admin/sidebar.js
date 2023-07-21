import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import logo from "../../assets/img/Avatar.png";
import {
  AiOutlineHome,
  AiOutlineDollar,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { PiStudentLight } from "react-icons/pi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { question } from "../../helpers/swal";

const SideBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    question("Logout", "Are you sure to logout?").then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userName");
        navigate("/");
      }
    });
  };

  return (
    <Navbar bg="secondary" expand="lg" className="admin-navbar" variant="dark">
      <Container>
        <Navbar.Brand>
          <div>
            <span>|</span>
            <h3>MANAGE COURCES</h3>
          </div>
          <img src={logo} alt="AdminPanelLogo" />
          <h3>John</h3>
          <h5>Admin</h5>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin" active={pathname === "/admin"}>
              <AiOutlineHome /> Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/course"
              active={pathname === "/admin/course"}
            >
              <BsBookmark /> Course
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/students"
              active={pathname === "/admin/students"}
            >
              <PiStudentLight /> Students
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/payment"
              active={pathname === "/admin/payment"}
            >
              <AiOutlineDollar /> Payment
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/report"
              active={pathname === "/admin/report"}
            >
              <HiOutlineDocumentReport /> Report
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/settings"
              active={pathname === "/admin/settings"}
            >
              <AiOutlineSetting /> Settings
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              Logout <FiLogOut />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default SideBar;
