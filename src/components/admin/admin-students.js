import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./admin-students.scss";
import DataTable from "react-data-table-component";
import { toast } from "../../helpers/swal";
import {
  deleteStudent,
  getStudents,
  updateStudent,
} from "../../api/student-service";
import { FaSearch, FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

const AdminStudents = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);

  const loadData = async (page) => {
    setLoading(true);
    try {
      const resp = await getStudents(page, perPage, filterValue);
      const { totalElements } = resp.data.users;
      setStudents(resp.data.users);
      setTotalRows(totalElements);
      setIsEditing(false);
    } catch (err) {
      const message = err.response ? err.response.data.message : err;
      toast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (row) => {
    setEditedStudent(row);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedStudent(null);
  };

  const handleSaveClick = async (id) => {
    try {
      await updateStudent(editedStudent, id);
      toast("Student was saved", "success");
      setIsEditing(false);
      setEditedStudent(null);
    } catch (err) {
      toast(err.response.data.message, "error");
    }
  };

  const handleDeleteClick = async (id) => {
    setDeleting(true);
    try {
      await deleteStudent(id);
      toast("Student was deleted", "success");
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleChangeRowsPerPage = async (newPerPage, page) => {
    setLoading(true);
    try {
      const resp = await getStudents(page - 1, newPerPage, filterValue);
      setStudents(resp.data.users);
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

    const filtered = students.filter(
      (user) => user.firstName.toLowerCase().includes(value.toLowerCase())
      // user.lastName.toLowerCase().includes(value.toLowerCase()) ||
      // user.email.toLowerCase().includes(value.toLowerCase()) ||
      // user.phone.toLowerCase().includes(value.toLowerCase()) ||
      // user.website.toLowerCase().includes(value.toLowerCase()) ||
      // user.company.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };
  const conditionalCell =
    (handleSaveClick, handleCancelClick, handleEditClick, handleDeleteClick) =>
    (row) =>
      (
        <div className="action-icon">
          {editedStudent && editedStudent.id === row.id ? (
            <>
              <FaSave onClick={() => handleSaveClick(row.id)} />
              <GiCancel onClick={handleCancelClick} />
            </>
          ) : (
            <>
              <FaEdit onClick={() => handleEditClick(row)} />
              <FaTrash onClick={() => handleDeleteClick(row.id)} />
            </>
          )}
        </div>
      );

  const columns = [
    {
      name: "",
      selector: (row) => <img src={row.image} width="75px" alt="student" />,
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
      name: "Actions",
      cell: conditionalCell(
        handleSaveClick,
        handleCancelClick,
        handleEditClick,
        handleDeleteClick
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(0);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filterValue]);

  // const dataToShow = filteredUsers.length > 0 ? filteredUsers : students;
  const dataToShow = editedStudent
    ? [editedStudent]
    : filteredUsers.length > 0
    ? filteredUsers
    : students;

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
            data={dataToShow} // Use filtered users
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
