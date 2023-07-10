import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./admin-students.scss";
import DataTable from "react-data-table-component";
import { toast } from "../../helpers/swal";
import { getStudents } from "../../api/student-service";
import { FaSearch, FaEdit, FaTrash, FaSave } from "react-icons/fa";

const AdminStudents = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const ActionsCell = ({ row }) => {
    const isEditing = editingUser === row;

    const handleEditClick = () => {
      if (isEditing) {
        setEditingUser(null);
      } else {
        setEditingUser(row);
      }
    };

    const handleDeleteClick = () => {
      if (isEditing) {
        setEditingUser(null);
      } else {
      }
    };
    return (
      <>
        {isEditing ? (
          <>
            <FaSave className="action-icon" onClick={handleEditClick} />
            <FaTrash className="action-icon" onClick={handleDeleteClick} />
          </>
        ) : (
          <>
            <FaEdit className="action-icon" onClick={handleEditClick} />
            <FaTrash className="action-icon" onClick={handleDeleteClick} />
          </>
        )}
      </>
    );
  };

  const columns = [
    {
      name: "",
      selector: (row) => <img src={row.image} width="75px" alt="student"></img>,
    },
    {
      name: "Name",
      selector: (row) => `${row.firstName}, ${row.lastName}`,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Website",
      selector: (row) => row.website,
    },
    {
      name: "Company Name",
      selector: (row) => row.company.name,
    },
    {
      name: "",
      cell: ActionsCell,
    },
  ];

  const loadData = async (page, filterValue) => {
    setLoading(true);
    try {
      const resp = await getStudents(page, perPage, filterValue);
      const { totalElements, content } = resp.data.users;
      /// setUsers(resp.data.users);
      setTotalRows(totalElements);
      setFilteredUsers(resp.data.users); // Set filtered users
      setEditingUser(null); // Reset editing state
    } catch (err) {
      const message = err.response ? err.response.data.message : err;
      toast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRowsPerPage = async (newPerPage, page) => {
    setLoading(true);
    try {
      const resp = await getStudents(page - 1, newPerPage, filterValue);
      // setUsers(resp.data.users);
      setPerPage(newPerPage);
    } catch (err) {
      const message = err.response ? err.response.data.message : err;
      toast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (page) => {
    loadData(page - 1);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);

    const filtered = users.filter(
      (user) => user.firstName.toLowerCase().includes(value.toLowerCase())
      // user.lastName.toLowerCase().includes(value.toLowerCase()) ||
      // user.email.toLowerCase().includes(value.toLowerCase()) ||
      // user.phone.toLowerCase().includes(value.toLowerCase()) ||
      // user.website.toLowerCase().includes(value.toLowerCase()) ||
      // user.company.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(0);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filterValue]);

  return (
    <Container className="admin-students">
      <Row className="my-5">
        <Col md={3} className="m-auto">
          <h4>Students List</h4>
        </Col>
        <Col md={5} className="m-auto">
          <InputGroup className="searchbox">
            <Form.Control
              type="search"
              placeholder="Search"
              value={filterValue}
              onChange={handleFilterChange}
            />
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col md={4}>
          <Link to="/admin/students/new-student">
            <Button>ADD NEW STUDENT</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable
            title=""
            columns={columns}
            data={filteredUsers} // Use filtered users
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onChangePage={handleChangePage}
            customFilter={handleFilterChange} // Apply the filter function
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminStudents;
