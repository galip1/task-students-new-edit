import React, { useState, useEffect } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./admin-students.scss";
import DataTable from "react-data-table-component";
import { toast } from "../../helpers/swal";
import { getStudents } from "../../api/student-service";

const columns = [
  { name: "", selector: (row) => `${row.image}` },
  { name: "Name", selector: (row) => `${row.firstName}, ${row.lastName}` },
  { name: "Email", selector: (row) => row.email },
  { name: "Phone", selector: (row) => row.phone },
  { name: "Website", selector: (row) => row.website },
  { name: "Company Name", selector: (row) => row.company.name },
];

const AdminStudents = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({
    q: "",
    role: [],
  });
  const navigate = useNavigate();

  const loadData = async (page) => {
    setLoading(true);
    try {
      const resp = await getStudents(filters.q, filters.role[0], page, perPage);
      const { users, totalElements } = resp.data.users;
      setUsers(resp.data.users);
      console.log(resp.data.users);
      setTotalRows(totalElements);
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
      const resp = await getStudents(
        filters.q,
        filters.role[0],
        page - 1,
        newPerPage
      );
      const { content } = resp.data;
      setUsers(content);
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
  const handleRowClicked = (row) => {
    navigate(`/admin/users/${row.id}`);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(0);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [filters]);

  const handleFilterChange = (e) => {
    const name = e.target.name;
    const value = name === "q" ? e.target.value : [e.target.value];
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Container className="admin-users">
      <Row className="my-5">
        <Col md={5}>
          <h4>Students List</h4>
        </Col>
        <Col md={3} className="">
          <InputGroup className="searchbox">
            <Form.Control
              type="search"
              placeholder="Type something"
              name="q"
              value={filters.q}
              onChange={handleFilterChange}
            />
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col md={4}>
          <button>ADD NEW STUDENT</button>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable
            title=""
            columns={columns}
            data={users}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onChangePage={handleChangePage}
            onRowClicked={handleRowClicked}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminStudents;
