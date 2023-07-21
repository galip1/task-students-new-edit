import React from "react";
import "./header.scss";
import { TbCircleCaretLeft } from "react-icons/tb";
import { GoBell } from "react-icons/go";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="header mt-4">
      <span onClick={() => navigate("/")}>
        <TbCircleCaretLeft />
      </span>
      <span>
        <GoBell />
      </span>
    </Container>
  );
};

export default Header;
